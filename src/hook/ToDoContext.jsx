import React, { createContext, useContext, useState } from 'react';

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todosByBox, setTodosByBox] = useState({}); // object to track todos by box
  const [inputTodoValue, setInputTodoValue] = useState('');
  const [showTodoInputBox, setShowTodoInputBox] = useState(false);
  const [showWindow, setShowWindow] = useState(false);
  return (
    <TodoContext.Provider
      value={{
        todosByBox,
        setTodosByBox,
        inputTodoValue,
        setInputTodoValue,
        showTodoInputBox,
        setShowTodoInputBox,
        showWindow,
        setShowWindow,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export const useTodoContext = () => useContext(TodoContext);
