import { useState, useEffect, createContext } from "react";
import { auth } from "../services/authServices";

export const UserContext = createContext({
  info: { user: null, isLoading: true },
});

const UserProvider = (props) => {
  const [info, setInfo] = useState({ user: null, isLoading: true });
  useEffect(() => {
    auth.onAuthStateChanged(async (person) => {
      if (person) {
        const { displayName, email } = person;
        console.log("user is logged in");
        setInfo({
          user: { displayName, email },
          isLoading: false,
        });
      } else {
        setInfo({
          user: null,
          isLoading: false,
        });
      }
    });
  }, []);
  return (
    <UserContext.Provider value={info}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;
