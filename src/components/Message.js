import { useRef, useState, useEffect } from "react";

function Message({ message, prev }) {
  const [dateLine, setDateLine] = useState(false);
  const msgRef = useRef();
  const timeRef = useRef();
  const contentRef = useRef();
  const showAuthorRef = useRef();
  const authorRef = useRef();

  // on render, CSS classes are added to component elements to identify sender and reciever, as well as render
  // date's between messages as well as timestamps
  useEffect(() => {
    setTimeout(() => {
      msgRef.current.classList.add("Message-fadein");
    }, 0);

    console.log("msg time:", message.timestamp);

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
        authorRef.current.classList.add("author-hide");
        timeRef.current.classList.add("timestamp-hide");
      } else {
        msgRef.current.classList.add("pad-top");
      }
    } else {
      msgRef.current.classList.add("pad-top");
    }
  }, []);

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

      <div className="message-content" ref={contentRef}>
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
        <p>{message.content}</p>
      </div>
    </div>
  );
}

export default Message;
