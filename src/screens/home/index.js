import React from "react";
import ChatComponent from "../../components/chatComponent";
import Chats from "../../components/chats";
import Header from "../../components/listHeader";
import Search from "../../components/search";
import "./home.css";

export const Home = () => {
  return (
    <div className="fullBody flexCenter">
      <div className="innerHome flex">
        <div className="leftHome flex">
          <Header />
          <Search />
          <Chats />
        </div>
        <div className="centerHome">
          <ChatComponent />
        </div>
      </div>
    </div>
  );
};

export default Home;
