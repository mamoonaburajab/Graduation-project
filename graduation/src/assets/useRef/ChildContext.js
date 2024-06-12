import React, { createContext, useContext, useState } from 'react';

const ChildContext = createContext();

export const useChild = () => useContext(ChildContext);

export const ChildProvider = ({ children }) => {
  const [ID, setID] = useState(null); // State for storing the child ID

  return (
    <ChildContext.Provider value={{ ID, setID }}>
      {children}
    </ChildContext.Provider>
  );
};
