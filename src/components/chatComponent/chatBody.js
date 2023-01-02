import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useState, useEffect } from "react";
import { db } from "../../firebase";
import { ChatContext } from "../../shared/context";
import ChatMessage from "./chatMessage";

const ChatBody = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unSub();
    };
  }, [data?.chatId]);

  console.log(messages);

  return (
    <div className="chatBody flex">
      {messages?.map((message) => (
        <ChatMessage message={message} key={message.id} />
      ))}
    </div>
  );
};

export default ChatBody;
