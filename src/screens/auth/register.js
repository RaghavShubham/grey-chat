import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase.js";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import defaultImage from "../../shared/images/default.jpg";
import "./auth.css";

const Register = () => {
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  console.log(image);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const profilePicture = e.target[3].files[0];

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, profilePicture).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateProfile(response.user, {
            displayName,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, "users", response.user.uid), {
            uid: response.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, "userChats", response.user.uid), {});

          navigate("/");
        });
      });
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="fullBody flexCenter">
      <div className="authContainer flex">
        <span className="authHeader">
          Welcome to
          <br /> <span className="authLogo">Grey Chat</span>
        </span>
        <span className="authSubHeader">
          Let's start by creating your account
        </span>
        <form onSubmit={handleSubmit} className="authForm flex">
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input
            type="file"
            id="fileInput"
            onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
          />
          <label htmlFor="fileInput" className="fileInput">
            <img
              src={image ? image : defaultImage}
              alt="profilePicture"
              className="profilePicture"
            />
          </label>
          <button className="authButton" type="submit">
            Sign Up
          </button>
        </form>
        {error && <span className="error">{error}</span>}
        <span className="authFooter">
          Already a part of Grey Chat? <Link to={"/login"}>Login</Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
