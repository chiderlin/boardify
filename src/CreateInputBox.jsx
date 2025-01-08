import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import React, { createContext, useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import 'styled-components';
import BoxList from './BoxList';

const BoxNaming = styled.div`
  margin-top: 10px;
  width: 300px;
  min-width: 300px;
  height: 100px;
  border-radius: 10px;
  background-color: #bebebe;
  opacity: 0.8;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  padding: 5px;
  gap: 10px;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: '10px';
`;

const CloseBtn = styled.div`
  width: 40px;
  height: 40px;
  color: #3c3c3c;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #e0e0e0;
    border-radius: 5px;
    opacity: 0.5;
  }
  cursor: pointer;
`;

const AddListContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* 控制 Add List 和 X 按钮的间距 */
`;

const ConfirmBtn = styled.div`
  background-color: #0072e3;
  color: white;
  width: 100px;
  mid-width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #005ab5;
  }
`;

const BoxContext = createContext();

function BoxProvider({ children }) {
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

function CreateInputBox() {
  const {
    boxes,
    setBoxes,
    inputValue,
    setInputValue,
    showInputBox,
    setShowInputBox,
  } = useContext(BoxContext);

  const handleAddTasks = (boxId) => {
    const newTodo = {
      id: new Date().getTime(),
      content: `New Task for Box ${boxId}`,
    };
    /*
    架構:
    const todosByBox = {
      box1: [{ id: 1, name: '任務 1' }, { id: 2, name: '任務 2' }],
      box2: [{ id: 3, name: '任務 3' }],
    };
    */

    // setTodosByBox((prevTodos) => {
    //   const updatedTodos = prevTodos[boxId]
    //     ? [...prevTodos[boxId], newTodo]
    //     : [newTodo];
    //   return {
    //     ...prevTodos,
    //     [boxId]: updatedTodos,
    //   };
    // });
  };

  return (
    <BoxNaming>
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter list name..."
      />
      <AddListWithClose />
      <BoxList boxes={boxes}></BoxList>
    </BoxNaming>
  );
}

function AddListWithClose() {
  const {
    boxes,
    setBoxes,
    inputValue,
    setInputValue,
    showInputBox,
    setShowInputBox,
  } = useContext(BoxContext);

  const btnRef = useRef(null);
  const handleCreateBox = (e) => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const globalX = rect.x + window.scrollX;

      const newBox = {
        id: boxes.length + 1,
        x: globalX,
        y: rect.y,
      };
      setBoxes([...boxes, newBox]);
      setInputValue(''); // clear the input field
      setShowInputBox(!showInputBox);
    }
  };
  return (
    <AddListContainer>
      <ConfirmBtn ref={btnRef} onClick={handleCreateBox}>
        Add List
      </ConfirmBtn>
      <CloseBtn onClick={() => setShowInputBox(false)}>
        <FontAwesomeIcon icon={faTimes} />
      </CloseBtn>
    </AddListContainer>
  );
}

export default function InputBox() {
  return (
    <BoxProvider>
      <CreateInputBox />
    </BoxProvider>
  );
}
