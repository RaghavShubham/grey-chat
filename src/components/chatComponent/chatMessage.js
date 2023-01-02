import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../shared/context";

const ChatMessage = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  function pad(n) {
    return n < 10 ? "0" + n : n;
  }

  let newDate = new Date(message?.date.toDate().getTime());
  let Hours = newDate.getHours();
  let Minutes = newDate.getMinutes();
  const HourComplete = pad(Hours) + ":" + pad(Minutes);
  let formattedTime = HourComplete;

  return message?.img ? (
    <div
      ref={ref}
      className={
        message.senderId === currentUser.uid
          ? "textBox imageBox flex owner"
          : "textBox imageBox flex"
      }
    >
      <img src={message.img} alt="sentImg" className="sentImage" />
      <span className="messageText">{message?.text}</span>
      <span className="messageTime">{formattedTime}</span>
    </div>
  ) : (
    <div
      ref={ref}
      className={
        message.senderId === currentUser.uid
          ? "textBox flex owner"
          : "textBox flex"
      }
    >
      <span className="messageText">{message?.text}</span>
      <span className="messageTime">{formattedTime}</span>
    </div>
  );
};

export default ChatMessage;
