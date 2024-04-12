import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import DefaultIcon from "../assets/images/default.png";
import Linkify from "linkify-react";

function Message({ message, prev }) {
  const [dateLine, setDateLine] = useState(false);
  const msgRef = useRef();
  const timeRef = useRef();
  const contentRef = useRef();
  const avatarRef = useRef();
  const authorRef = useRef();
  const videoRef = useRef();
  const videoInView = useInView(videoRef);

  // on render, CSS classes are added to component elements to identify sender and reciever, as well as render
  // date's between messages as well as timestamps
  useEffect(() => {
    setTimeout(() => {
      msgRef.current.classList.add("Message-fadein");
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
        authorRef.current.classList.add("hide");
        timeRef.current.classList.add("hide");
        avatarRef.current.classList.add("hide");
      } else {
        msgRef.current.classList.add("pad-top");
      }
    } else {
      msgRef.current.classList.add("pad-top");
    }
  }, []);

  // framer motion's useInView method used to pause the embedded video while not in the viewport, hopefully to save on resources
  useEffect(() => {
    !videoInView ? videoRef.current.pause() : videoRef.current.play();
  }, [videoInView]);

  return (
    <div className="Message" ref={msgRef}>
      {dateLine && (
        <div className="date-line">
          <b>
            <i>{new Date(message.timestamp).toDateString()}</i>
          </b>
          <hr></hr>
        </div>
      )}

      <div className="message-container" ref={contentRef}>
        <div className="message-avatar">
          <img src={message.avatar} alt={DefaultIcon} ref={avatarRef} />
        </div>
        <div className="message-content">
          <div className="message-header">
            <p className="message-author" ref={authorRef}>
              <b>{message.author}</b>
            </p>
            <p className="message-timestamp" ref={timeRef}>
              <i>
                {new Date(message.timestamp).toLocaleTimeString("en", {
                  timeStyle: "short",
                })}
              </i>
            </p>
          </div>
          {/* Use Linkify to create a links to any URLs contained within the message content.  Remove content if there is an embedded Tenor GIF */}
          <Linkify as="p" options={{ className: "content-link" }}>
            {message.embeds.length === 0 ? message.content : ""}
          </Linkify>
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
        </div>
      </div>
    </div>
  );
}

export default Message;
