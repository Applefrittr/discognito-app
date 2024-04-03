import { useEffect, useRef, useState } from "react";
import socket from "../API/socket";

function MessageStream(props) {
  const [messages, setMessages] = useState([]);
  // useRef employed here as we want to ensure our socket listeners have access to the current state of currChannel
  const channelRef = useRef();
  channelRef.current = props.currChannel;

  useEffect(() => {
    socket.on("new message", (message, author) => {
      const newMsg = {
        author: author.username,
        content: message.content,
        timestamp: message.createdTimeStamp,
        channelId: message.channelId,
        id: message.id,
      };

      // add the recieved message to the messages state array
      setMessages((prev) => [...prev, newMsg]);
    });
    return () => {
      socket.off("new message");
    };
  }, []);

  // Reset rendered messages when a new channel is selected
  useEffect(() => {
    setMessages([]);
    socket.emit("leave channel");
    if (props.currChannel) socket.emit("join channel", props.currChannel.id);
    console.log("props.currChannel useEffect fired");
    console.log(props.currChannel);
  }, [props.currChannel]);

  return (
    <section className="MessageStream">
      {!props.currChannel && <div>Select a channel to begin stream!</div>}

      {props.currChannel && (
        <section className="channel-container">
          <div className="channel-info">
            <i>
              {props.currChannel.guildName}
              {">"}#{props.currChannel.name}
            </i>
            <p>{props.currChannel.topic}</p>
          </div>
          <div className="messages">
            <i>Stream started</i>
            {messages.map((message) => (
              <section key={message.id}>
                <div>{message.author} says...</div>
                <div>{message.content}</div>
              </section>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
export default MessageStream;
