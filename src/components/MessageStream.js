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

      // If the incoming msg channel Id matches the current channel ID set in the App component, render the new message. ***useRef IMPORTANT HERE!!!!
      if (channelRef.current && channelRef.current.id === newMsg.channelId)
        setMessages((prev) => [...prev, newMsg]);
    });
    return () => {
      socket.off("new message");
    };
  }, []);

  // Reset rendered messages when a new channel is selected
  useEffect(() => {
    setMessages([]);
  }, [props.currChannel]);

  return (
    <section className="MessageStream">
      {props.currChannel && (
        <div>
          <i>
            {props.currChannel.guildName}
            {">"}#{props.currChannel.name}
          </i>
          <p>{props.currChannel.topic}</p>
        </div>
      )}

      {messages.map((message) => (
        <section key={message.id}>
          <div>{message.author} says...</div>
          <div>{message.content}</div>
        </section>
      ))}
    </section>
  );
}
export default MessageStream;
