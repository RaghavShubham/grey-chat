import { onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  useReducer,
} from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();
export const ChatContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user, "HUEHUEHUEHUEHUEHUEHUEHUEHUEHUE");
    });
    return () => {
      unsub();
    };
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const ChatContextProvider = ({ children }) => {
  const INITIAL_STATE = { chatId: "null", user: {} };

  const { currentUser } = useContext(AuthContext);

  const chatReducer = (state, action) => {
    console.log(action.payload);
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
