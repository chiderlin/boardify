import React, { createContext, useState, useContext } from 'react';

const BoxContext = createContext();
export function BoxProvider({ children }) {
  const [boxes, setBoxes] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showInputBox, setShowInputBox] = useState(false);

  return (
    <BoxContext.Provider
      value={{
        boxes,
        setBoxes,
        inputValue,
        setInputValue,
        showInputBox,
        setShowInputBox,
      }}
    >
      {children}
    </BoxContext.Provider>
  );
}

export const useBoxContext = () => useContext(BoxContext);
