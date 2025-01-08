import logo from './logo.svg';
import './App.css';
import InputBox from './CreateInputBox';
import BoxList from './BoxList';
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
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  left: 0;
  &:hover {
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
      <AddBoxBtn
        style={{
          left: `${boxes.length * 310}px`,
        }}
        className="todo"
        onClick={handleAddBoxClick}
      >
        + Add another list
      </AddBoxBtn>
      <BoxList />
      {showInputBox && <InputBox />}
    </>
  );
}

function App() {
  // const [position, setPosition] = useState({ x: 0, y: 0 });
  // const [isDragging, setIsDragging] = useState(false);
  // const [draggingBoxId, setDraggingBoxId] = useState(null);
  // const [offset, setOffset] = useState({ x: 0, y: 0 });
  // const [boxes, setBoxes] = useState([]); // track all created boxes

  // const onMouseMove = (e) => {
  //   if (isDragging) {
  //     setPosition({
  //       x: e.clientX - offset.x,
  //       y: e.clientY - offset.y,
  //     });
  //   }
  // };

  // const onMouseUp = () => {
  //   setIsDragging(false);
  // };

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

//client & offset review
/*
图示说明
假设有一个 Box 初始位置为 (100, 100)，鼠标点击在 Box 内部的 (120, 120) 处：

clientX = 120
box.x = 100
offset.x = clientX - box.x = 20
当拖拽过程中，鼠标移动到 clientX = 200：

新的 box.x = clientX - offset.x = 200 - 20 = 180
这样，Box 的左上角跟随鼠标拖拽，保持鼠标点击点与 Box 相对位置不变。
*/

// ------------

/* <Box
          isDragging={isDragging && draggingBoxId === '1'}
          onMouseDown={(e) => onMouseDown(e, '1')}
        >
          <div className="box-title"></div>
          <div className="box-todo">
            <div className="todo">todo</div>
            <div className="todo">todo</div>
            <div className="todo">todo</div>
            <div className="todo">todo</div>
          </div>

          <div className="box-bottom">tttt</div>
        </Box>
        <Box
          isDragging={isDragging && draggingBoxId === '2'}
          onMouseDown={(e) => onMouseDown(e, '2')}
        >
          <div className="box-title"></div>
          <div className="box-todo">
            <div className="todo">todo</div>
            <div className="todo">todo</div>
            <div className="todo">todo</div>
            <div className="todo">todo</div>
          </div>

          <div className="box-bottom"></div>
        </Box>
        <Box
          isDragging={isDragging && draggingBoxId === '3'}
          onMouseDown={(e) => onMouseDown(e, '3')}
        >
          <div className="box-title"></div>
          <div className="box-todo">
            <div className="todo">todo</div>
            <div className="todo">todo</div>
            <div className="todo">todo</div>
            <div className="todo">todo</div>
            <div className="todo">todo</div>
            <div className="todo">todo</div>
            <div className="todo">todo</div>
            <div className="todo">todo</div>
            <div className="todo">todo</div>
            <div className="todo">todo</div>
          </div>

          <div className="box-bottom"></div>
        </Box> */
