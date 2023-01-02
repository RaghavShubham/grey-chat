import React from "react";
import "./chatEntry.css";

const ChatEntry = ({
  displayName,
  dp,
  lastMessage,
  date,
  unreadCount,
  onClick,
}) => {
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }

  let newDate = new Date(date?.toDate().getTime());
  let Hours = newDate.getHours();
  let Minutes = newDate.getMinutes();
  const HourComplete = pad(Hours) + ":" + pad(Minutes);
  let formattedTime = HourComplete;

  return (
    <div
      className="chatEntry flex"
      onClick={onClick ? onClick : console.log("Chat selected")}
    >
      <img
        src={dp}
        alt={`${displayName}-profile-pic`}
        className="chatEntryDP"
      />
      <div className="nameMessageContainer flex">
        <div className="flex nameTime">
          <span className="chatEntryName">{displayName}</span>
          <span>{formattedTime}</span>
        </div>
        <div className="flex lastUnread">
          <span className="lastMsg">{lastMessage?.text}</span>
          {/* {unreadCount ? (
            <div className="unreadContainer flex">
              <span>{unreadCount}</span>
            </div>
          ) : (
            <></>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ChatEntry;
