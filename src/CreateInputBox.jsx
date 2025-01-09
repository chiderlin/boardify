import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import React, { useRef } from 'react';
import styled from 'styled-components';
import 'styled-components';
import { useBoxContext } from './hook/BoxContext';
import { CloseBtn, ConfirmBtn, AddListContainer } from './styles/common/Button';

const BoxNaming = styled.div`
  width: 290px;
  min-width: 290px;
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
  position: absolute;
  margin: 10px;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: '10px';
`;

function AddListWithClose() {
  const {
    boxes,
    setBoxes,
    inputValue,
    setInputValue,
    showInputBox,
    setShowInputBox,
  } = useBoxContext();

  const btnRef = useRef(null);
  const handleCreateBox = () => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const globalX = rect.x + window.scrollX;

      const newBox = {
        id: boxes.length + 1,
        x: globalX,
        y: rect.y,
        name: inputValue,
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

export default function CreateInputBox() {
  const {
    boxes,
    setBoxes,
    inputValue,
    setInputValue,
    showInputBox,
    setShowInputBox,
  } = useBoxContext();

  const inputRef = useRef(null);
  const handleKeyPress = (e) => {
    if (inputRef.current && e.key === 'Enter') {
      const rect = inputRef.current.getBoundingClientRect();
      const globalX = rect.x + window.scrollX;

      const newBox = {
        id: boxes.length + 1,
        x: globalX,
        y: rect.y,
        name: inputValue,
      };
      setBoxes([...boxes, newBox]);
      setInputValue(''); // clear the input field
      setShowInputBox(!showInputBox);
    }
  };

  return (
    <BoxNaming
      style={{
        left: `${boxes.length * 310}px`,
      }}
    >
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        ref={inputRef}
        onKeyDown={handleKeyPress}
        placeholder="Enter list name..."
      />
      <AddListWithClose />
    </BoxNaming>
  );
}
