import React, { useContext } from "react";
import { AuthContext } from "../../shared/context";
import "./listHeader.css";

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="leftHeader flex">
      <img src={currentUser.photoURL} alt="profilePicture" className="leftPP" />
      <span className="displayName">{currentUser.displayName}</span>
    </div>
  );
};

export default Header;
