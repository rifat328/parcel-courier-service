"use client";
import { createContext, useContext } from "react";

const UserContext = createContext();
export const UserProvider = ({ user, children }) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
