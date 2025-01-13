import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { CloseBtn } from './styles/common/Button';
import { useTodoContext } from './hook/ToDoContext';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999; /* make sure to make it upper layer*/
`;

const Window = styled.div`
  max-width: 90%;
  width: 900px;
  height: 90%;
  background-color: #fcfcfc;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function TodoWindow({ todoObj }) {
  console.log(todoObj);
  const { todosByBox, showWindow, setShowWindow } = useTodoContext();
  const { boxId, todoIdx } = todoObj;

  const closeWindow = () => {
    setShowWindow(!showWindow);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeWindow();
    }
  };

  // when turn on window, trace event
  useEffect(() => {
    if (showWindow) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    // clean event
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showWindow]);

  return (
    <Overlay>
      <Window onKeyDown={closeWindow}>
        {todosByBox[boxId][todoIdx].title}
        <CloseBtn onClick={closeWindow}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseBtn>
      </Window>
    </Overlay>
  );
}
