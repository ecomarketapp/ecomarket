"use client";
import React, { createContext, useState } from "react";

const MenuContext = createContext(undefined);

const MenuProvider = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggle = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <MenuContext.Provider value={{ toggle, showMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export { MenuContext, MenuProvider };
