import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import DefaultIcon from "../assets/images/default.png";
import Linkify from "linkify-react";

function Message({ message, prev }) {
  // State variables used conditionally to render different aspects of the Message component, depending on previous Message component in MessageStream
  const [dateLine, setDateLine] = useState(false);
  const [render, setRender] = useState(false);
  const [topPadding, setTopPadding] = useState(false);
  const [displayAuthor, setDisplayAuthor] = useState(true);
  const [displayTime, setDisplayTime] = useState(true);
  const [displayAvatar, setDisplayAvatar] = useState(true);

  const videoRef = useRef();
  const videoInView = useInView(videoRef);

  // on render, CSS classes are modified via state variables to simulate look and feel of Discord's chat UI
  useEffect(() => {
    // on component render, set render state to true.  Adds a fade-in effect when message component is rendered
    setTimeout(() => {
      setRender(true);
    }, 0);

    // if the current message is sent in a later date than the previous message, render in the date the message is sent - the date line
    if (
      prev &&
      new Date(message.timestamp).getDate() !==
        new Date(prev.timestamp).getDate()
    ) {
      setDateLine(true);
    } else if (!prev) setDateLine(true);
    else setDateLine(false);

    // if the difference between current message and previous message is less than 2 minutes, do not render timestamp as well as determine
    // whether or not to render the authors name
    if (
      prev &&
      new Date(message.timestamp).getTime() -
        new Date(prev.timestamp).getTime() <=
        120000
    ) {
      if (message.author === prev.author) {
        setDisplayAuthor(false);
        setDisplayTime(false);
        setDisplayAvatar(false);
      } else {
        setTopPadding(true);
      }
    } else {
      setTopPadding(true);
    }
  }, []);

  // framer motion's useInView method used to pause the embedded video while not in the viewport, hopefully to save on resources
  useEffect(() => {
    if (videoRef.current)
      !videoInView ? videoRef.current.pause() : videoRef.current.play();
  }, [videoInView]);

  return (
    <div
      className={`Message ${render ? "Message-fadein" : ""} ${
        topPadding ? "pad-top" : ""
      }`}
    >
      {dateLine && (
        <div className="date-line">
          <b>
            <i>{new Date(message.timestamp).toDateString()}</i>
          </b>
          <hr></hr>
        </div>
      )}

      <div className="message-container">
        <div className="message-avatar">
          <img
            src={message.avatar}
            alt={DefaultIcon}
            className={`${displayAvatar ? "" : "hide"}`}
          />
        </div>
        <div className="message-content">
          <div className="message-header">
            <p className={`message-author ${displayAuthor ? "" : "hide"}`}>
              <b>{message.author}</b>
            </p>
            <p className={`message-timestamp ${displayTime ? "" : "hide"}`}>
              <i>
                {new Date(message.timestamp).toLocaleTimeString("en", {
                  timeStyle: "short",
                })}
              </i>
            </p>
          </div>
          {/* Use Linkify to create a links to any URLs contained within the message content.  Remove content if there is an embedded Tenor GIF */}
          <div className="content-container">
            <Linkify as="p" options={{ className: "content-link" }}>
              {message.embeds.length === 0 ? message.content : ""}
            </Linkify>
            {message.edit && <i>(edit)</i>}
          </div>
          {/* Render any Tenor GIFs contained within the recieved message object*/}
          {message.embeds.length > 0 &&
            message.embeds.map((embed, i) => {
              return (
                <div
                  key={i}
                  className="embed-video"
                  style={{ maxWidth: embed.width, maxHeight: embed.height }}
                >
                  <video
                    src={embed.url}
                    alt="imbeded attachment"
                    loop
                    ref={videoRef}
                  />
                </div>
              );
            })}
          {/* Render any attachments contained within the recieved message object */}
          {message.attachments.length > 0 &&
            message.attachments.map((attachment, i) => {
              return (
                <div
                  className="attachment"
                  key={i}
                  style={{
                    maxWidth: attachment.width,
                    maxHeight: attachment.height,
                  }}
                >
                  <img src={attachment.url} alt="" />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Message;
