import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import "./search.css";
import ChatEntry from "../chatEntry";
import { AuthContext, ChatContext } from "../../shared/context";

const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const userRef = collection(db, "users");

  const handleSearch = async () => {
    const q = query(userRef, where("displayName", "==", userName));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUser(doc.data());
    });
  };

  const handleEnter = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    const res = await getDoc(doc(db, "chats", combinedId));

    if (!res.exists()) {
      //Create entry in chats collection
      await setDoc(doc(db, "chats", combinedId), { messages: [] });

      //Create chat in userChats
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", user.uid), {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });

      dispatch({
        type: "CHANGE_USER",
        payload: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
      });
    }
    setUser(null);
    setUserName("");
  };

  return (
    <div className="searchBarContainer">
      <input
        type="text"
        placeholder="Search users..."
        onKeyDown={handleEnter}
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      {user && (
        <ChatEntry
          displayName={user.displayName}
          dp={user.photoURL}
          onClick={handleSelect}
        />
      )}
    </div>
  );
};

export default Search;
