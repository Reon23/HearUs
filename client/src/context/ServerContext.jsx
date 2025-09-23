import React, { createContext, useState } from "react";

import axios from "axios";

export const ServerContext = createContext();

export const ServerProvider = ({ children }) => {
  const [account, setAccount] = useState(null);

  // Register User
  const register = (user) => {
    console.log(user);
    axios
      .post("http://localhost:3000/api/signup", user)
      .then((res) => {
        console.log(res.data);
        setAccount(res.data);
      })
      .catch((err) => console.error(err));
  };

  const login = (user) => {
    console.log(user);
    axios
      .post("http://localhost:3000/api/login", user)
      .then((res) => {
        console.log(res.data);
        setAccount(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <ServerContext.Provider value={{ register, login, account }}>
      {children}
    </ServerContext.Provider>
  );
};
