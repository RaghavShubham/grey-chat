import React from "react";
import ChatBody from "./chatBody";
import "./chatComponent.css";
import ChatHeader from "./chatHeader";
import SendBody from "./sendBody";

const ChatComponent = () => {
  return (
    <div className="chatComponent flex">
      <ChatHeader />
      <ChatBody />
      <SendBody />
    </div>
  );
};

export default ChatComponent;
