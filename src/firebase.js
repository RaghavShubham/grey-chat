import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDs1OGR9f2cBFkPzW98Ln14mepHZ9YYgiw",
  authDomain: "grey-chat-43908.firebaseapp.com",
  projectId: "grey-chat-43908",
  storageBucket: "grey-chat-43908.appspot.com",
  messagingSenderId: "751250182156",
  appId: "1:751250182156:web:9bf5709d984229a96cde29",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
