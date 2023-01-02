import React, { useContext } from "react";
import Call from "../../shared/images/call.png";
import Video from "../../shared/images/video.png";
import Info from "../../shared/images/info.png";
import { ChatContext } from "../../shared/context";

const ChatHeader = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="chatHeader flex">
      <div className="leftHead flex">
        <img src={data.user.photoURL} alt="activeChatDP" className="activeDP" />
        <div className="leftHeadName flex">
          <span>{data.user?.displayName}</span>
          <span>Active Now</span>
        </div>
      </div>
      <div className="rightHead flex">
        <img src={Call} color="#655d65" alt="call" />
        <img src={Video} alt="videoCall" />
        <img src={Info} alt="info" />
      </div>
    </div>
  );
};

export default ChatHeader;
