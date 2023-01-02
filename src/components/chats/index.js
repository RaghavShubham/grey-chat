import React, { useContext, useEffect, useState } from "react";
import "./chats.css";
import ChatEntry from "../chatEntry";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext, ChatContext } from "../../shared/context";

const Chats = () => {
  const [chats, setChats] = useState({});
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unSub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unSub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };
  console.log(chats);
  return (
    <div className="chats">
      {chats &&
        Object?.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <ChatEntry
              key={chat[0]}
              displayName={
                chat[1]?.userInfo?.displayName || chat[1]?.userinfo?.displayName
              }
              dp={chat[1]?.userInfo?.photoURL || chat[1]?.userinfo?.photoURL}
              date={chat[1]?.date}
              unreadCount={3}
              lastMessage={chat[1]?.lastMessage}
              onClick={() =>
                handleSelect(chat[1]?.userInfo || chat[1]?.userinfo)
              }
            />
          ))}
    </div>
  );
};

export default Chats;
