import React, { createContext, useContext, useState } from 'react';

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todosByBox, setTodosByBox] = useState({}); // object to track todos by box
  const [inputTodoValue, setInputTodoValue] = useState('');
  const [showTodoInputBox, setShowTodoInputBox] = useState(false);

  return (
    <TodoContext.Provider
      value={{
        todosByBox,
        setTodosByBox,
        inputTodoValue,
        setInputTodoValue,
        showTodoInputBox,
        setShowTodoInputBox,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export const useTodoContext = () => useContext(TodoContext);
