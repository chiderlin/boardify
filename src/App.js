import logo from './logo.svg';
import './App.css';
import InputBox from './CreateInputBox';
import BoxListWrap from './BoxList';
import { BoxProvider, useBoxContext } from './hook/BoxContext';
import 'styled-components';
import React from 'react';
import styled from 'styled-components';

const AddBoxBtn = styled.div`
  margin-top: 10px;
  width: 300px;
  min-width: 300px;
  border-radius: 10px;
  background-color: #bebebe;
  opacity: 0.8;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
  cursor: pointer;
  position: absolute;
  left: 0;
  &:hover {
    background-color: #adadad;
    opacity: 0.5;
  }
`;

function BoxComponent() {
  const { boxes, setBoxes, showInputBox, setShowInputBox } = useBoxContext();

  const handleAddBoxClick = () => {
    setShowInputBox(!showInputBox);
  };

  return (
    <>
      {/* FIXME：套用兩個class其他方法？ */}
      {!showInputBox && (
        <AddBoxBtn
          style={{
            left: `${boxes.length * 310}px`,
          }}
          className="todo"
          onClick={handleAddBoxClick}
        >
          + Add another list
        </AddBoxBtn>
      )}
      <BoxListWrap />
      {showInputBox && <InputBox />}
    </>
  );
}

function App() {
  return (
    <>
      <div className="header">header</div>
      <div className="body">
        <BoxProvider>
          <BoxComponent />
        </BoxProvider>
      </div>
    </>
  );
}

export default App;
