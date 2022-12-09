import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <div className="fullBody flexCenter">
      <div style={{ height: "35%" }} className="authContainer flex">
        <span className="authHeader">
          Welcome back to <br></br>
          <span className="authLogo">Grey Chat</span>
        </span>
        <span className="authSubHeader">
          Let's get back to where you left off
        </span>
        <form onSubmit={handleSubmit} className="authForm flex">
          <input type="email" />
          <input type="password" />
          <button
            className="authButton"
            style={{ marginTop: "20px" }}
            type="submit"
          >
            Sign In
          </button>
        </form>
        {error && <span className="error">{error}</span>}
        <span className="authFooter">
          New to the Grey Chat? <Link to={"/register"}>Create Account</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
