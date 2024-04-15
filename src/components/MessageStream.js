import React, { useEffect, useRef, useState } from "react";
import socket from "../API/socket";
import { motion } from "framer-motion";
import Message from "./Message";

function MessageStream({ currChannel }) {
  const [messages, setMessages] = useState([]); //array that will contain message components to be rendered
  const [render, setRender] = useState(false); // state variable used to render in the channel info and message stream
  const [channel, setChannel] = useState(); // state used to asssit with rendering effects
  const [time, setTime] = useState();
  const imgRef = useRef();
  const renderTimeoutRef1 = useRef(); // creating refs to timeout variables
  const renderTimeoutRef2 = useRef();
  const bottomRef = useRef(); // targets bottom element in the messages container, used for auto scrolling when new messages are posted

  // useRef employed here as we want to ensure our socket listeners have access to the current state of currChannel
  const channelRef = useRef();
  channelRef.current = currChannel;

  useEffect(() => {
    // listens for new message emitted by API, updates the messages state to render new message
    socket.on("new message", (message, author, avatar, embeds) => {
      const newMsg = {
        author: author.username,
        content: message.content,
        timestamp: message.createdTimestamp,
        channelId: message.channelId,
        id: message.id,
        avatar: avatar,
        embeds: [...embeds],
      };
      // add the recieved message to the messages state array
      setMessages((prev) => [...prev, newMsg]);
    });

    // listens for a message deletion from API, will filter out the deleted message from messages state
    socket.on("delete message", (id) => {
      setMessages((prev) => prev.filter((msg) => id !== msg.id));
    });
    return () => {
      socket.off("new message");
      socket.off("delete message");
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({
        block: "nearest",
        inline: "center",
        behavior: "smooth",
        alignToTop: false,
      });
    }, 100);
  }, [messages]);

  // Reset rendered messages when a new channel is selected.  Channel is rendered in with framer-motion effects on channel change.  Also
  // emits socket Room changing events to move the socket into the new channel Room and out of the previous
  useEffect(() => {
    if (currChannel) {
      clearTimeout(renderTimeoutRef1.current); // reset the timeouts for a smooth render (in the event that new channel selected before render animation finishes)
      clearTimeout(renderTimeoutRef2.current);
      imgRef.current.classList.add("img-show");
      setRender(false);
      setMessages([]);
      socket.emit("leave channel");
      if (currChannel) socket.emit("join channel", currChannel.id);
      renderTimeoutRef1.current = setTimeout(() => {
        setRender(true);
        setChannel(currChannel);
        setTime(new Date().toLocaleString());
        renderTimeoutRef2.current = setTimeout(() => {
          imgRef.current.classList.remove("img-show");
        }, 1000);
      }, 1000);
    }
  }, [currChannel]);

  return (
    <section className="MessageStream">
      {!currChannel && (
        <div className="placeholder">
          <i>{"<---"} Select a channel to begin a stream!</i>
        </div>
      )}
      <div className="MessageStream-bgImg" ref={imgRef}></div>
      {render && channel && (
        <motion.div
          className="channel-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="channel-info">
            <i>
              <b>{channel.guildName}</b>
              {" > "}# {channel.name}
            </i>
            <p className="topic">
              <i>{channel.topic}</i>
            </p>
          </div>
          <div className="messages">
            <i>
              Stream started --- <b>{time}</b>
            </i>
            {messages.map((message, i, messages) => (
              <React.Fragment key={message.id}>
                <Message message={message} prev={messages[i - 1]} />
              </React.Fragment>
            ))}
            <div className="messages-bottom" ref={bottomRef}></div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
export default MessageStream;
