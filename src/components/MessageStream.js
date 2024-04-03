import React, { useEffect, useRef, useState } from "react";
import socket from "../API/socket";
import { motion } from "framer-motion";
import Message from "./Message";

function MessageStream({ currChannel }) {
  const [messages, setMessages] = useState([]); //array that will contain message components to be rendered
  const [render, setRender] = useState(false); // state variable used to render in the channel info and message stream
  const [channel, setChannel] = useState(); // state used to asssit with rendering effects
  const [time, setTime] = useState();

  // useRef employed here as we want to ensure our socket listeners have access to the current state of currChannel
  const channelRef = useRef();
  channelRef.current = currChannel;

  useEffect(() => {
    socket.on("new message", (message, author) => {
      console.log("1", message);
      const newMsg = {
        author: author.username,
        content: message.content,
        timestamp: message.createdTimestamp,
        channelId: message.channelId,
        id: message.id,
      };
      console.log("2", newMsg);
      // add the recieved message to the messages state array
      setMessages((prev) => [...prev, newMsg]);
    });
    return () => {
      socket.off("new message");
    };
  }, []);

  // Reset rendered messages when a new channel is selected.  Channel is rendered in with framer-motion effects on channel change.  Also
  // emits socket Room changing events to move the socket into the new channel Room and out of the previous
  useEffect(() => {
    setRender(false);
    setMessages([]);
    socket.emit("leave channel");
    if (currChannel) socket.emit("join channel", currChannel.id);
    setTimeout(() => {
      setRender(true);
      setChannel(currChannel);
      setTime(new Date().getTime());
    }, 100);
  }, [currChannel]);

  return (
    <section className="MessageStream">
      {!channel && <div>Select a channel to begin stream!</div>}
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
            <i>Stream started --- {time}</i>
            {messages.map((message, i, messages) => (
              <React.Fragment key={message.id}>
                <Message message={message} prev={messages[i - 1]} />
              </React.Fragment>
              // <section key={message.id}>
              //   <div>{message.author} says...</div>
              //   <div>{message.content}</div>
              // </section>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
export default MessageStream;
