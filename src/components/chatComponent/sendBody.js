import { uuidv4 } from "@firebase/util";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useState } from "react";
import { db, storage } from "../../firebase";
import { AuthContext, ChatContext } from "../../shared/context";
import AddFile from "../../shared/images/addFile.png";
import Send from "../../shared/images/send.png";

const SendBody = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async (e) => {
    e.preventDefault();
    if (text === "" && img === null) return;
    if (img) {
      const storageRef = ref(storage, uuidv4());

      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuidv4(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
        });
      });
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: { text },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: { text },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <div className="sendBody flex">
      <input
        type="text"
        className="sendTextBox"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={(e) => setImg(e.target.files[0])}
      />
      <label htmlFor="fileInput" className="fileIcon flex">
        <img src={AddFile} alt="addFile" />
      </label>
      <button
        className="sendButton fileIcon flex"
        onClick={(e) => handleSend(e)}
      >
        <img src={Send} alt="addFile" />
      </button>
    </div>
  );
};

export default SendBody;
