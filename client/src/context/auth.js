import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../axios";

const AuthContext = createContext("");

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: {
      name: "Kevin",
      email: "null@mail.ru",
      password: "123",
    },
    token: "",
  });

  axios.defaults.headers.common["Authorization"] = "Bearer " + auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsed = JSON.parse(data);
      setAuth({ ...auth, user: parsed.user, token: parsed.token });
    }
  }, []);

  return (
    <AuthContext.Provider
      // @ts-ignore
      value={[auth, setAuth]}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
