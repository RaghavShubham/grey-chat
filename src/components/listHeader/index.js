import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../../firebase";
import { AuthContext } from "../../shared/context";
import "./listHeader.css";
import SignOut from "../../shared/images/signOut.png";

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="leftHeader flex">
      <div className="flex headerL">
        <img
          src={currentUser.photoURL}
          alt="profilePicture"
          className="leftPP"
        />
        <span className="displayName">{currentUser.displayName}</span>
      </div>
      <div onClick={() => signOut(auth)}>
        <img className="headerR" src={SignOut} alt="signOut" />
      </div>
    </div>
  );
};

export default Header;
