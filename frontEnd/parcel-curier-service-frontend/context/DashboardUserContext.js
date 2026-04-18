"use client";
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ user, children }) => {
  const [isCreateParcelOpen, setIsCreateParcelOpen] = useState(false);

  const toggleCreateParcelModal = () => {
    setIsCreateParcelOpen((prev) => !prev);
  };

  return (
    <UserContext.Provider
      value={{ user, isCreateParcelOpen, toggleCreateParcelModal }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
