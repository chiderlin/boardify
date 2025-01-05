import logo from './logo.svg';
import './App.css';
import TodoTask from './TodoTask';
import 'styled-components';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const Box = styled.div`
  min-width: 300px;
  background-color: black;
  height: 10%;
  margin: 10px;
  border-radius: 20px;
  place-items: center;
  display: flex; // let AddATask at the bottom of the box
  flex-direction: column; // let AddATask at the bottom of the box
  justify-content: flex-start; // let AddATask at the bottom of the box
  cursor: ${(props) => (props.isDragging ? 'default' : 'pointer')};
  transform: ${(props) =>
    props.isDragging ? 'rotate(10deg)' : 'rotate(0deg);'};
  opacity: ${(props) => (props.isDragging ? '0.7' : '1')};
`;

const AddATask = styled.div`
  min-width: 300px;
  height: 40%;
  background-color: black;
  color: white;
  display: grid; // let text center
  place-items: center; // let text center
  border-radius: 20px;
  margin-top: auto;
  &:hover {
    background-color: #7b7b7b;
  }
`;

const AddBoxBtn = styled.div`
  width: 300px;
  min-width: 300px;
  border-radius: 10px;
  background-color: #bebebe;
  opacity: 0.8;
  font-weight: bold;
  &:hover {
    pacity: 0.5;
  }
`;

function App(props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [draggingBoxId, setDraggingBoxId] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [boxes, setBoxes] = useState([]); // track all created boxes

  // TODO: 移動box
  //TODO: add box
  const onMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseDown = (e, bid) => {
    console.log('bid: ', bid);
    setIsDragging(true);
    console.log('e.clientX:', e.clientX);
    console.log('e.clientY', e.clientY);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    setDraggingBoxId(bid);
  };

  const btnRef = useRef(null);
  const handleCreateBox = () => {
    // 取得目前box的座標
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      console.log('btn x: ', rect.x);
      console.log('btn y: ', rect.y);
      const newBox = {
        id: boxes.length + 1,
        x: rect.x,
        y: rect.y,
      };
      setBoxes([...boxes, newBox]);
    }
  };

  return (
    /**
     * className="App"原本App.css default裡就設定好了
     */
    <>
      <div className="header">header</div>
      <div className="body" onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
        {/* <Box
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
        </Box> */}
        {boxes.map((box) => (
          <Box
            isDragging={isDragging && draggingBoxId === box.id}
            onMouseDown={(e) => onMouseDown(e, box.id)}
            key={box.id}
            x={box.x}
            y={box.y}
          >
            <AddATask>+ Add a Task</AddATask>
          </Box>
        ))}
        {/* FIXME：套用兩個class其他方法？ */}
        <AddBoxBtn className="todo" ref={btnRef} onClick={handleCreateBox}>
          + Add another list
        </AddBoxBtn>
      </div>
    </>
  );
}

// const BoxContainer = styled.div`
//   position: relative;
//   width: 100%;
//   height: 500px;
//   border: 1px solid #ccc;
// `;

// const Box = styled.div`
//   position: absolute;
//   width: 100px;
//   height: 100px;
//   background-color: ${(props) => (props.isDragging ? 'lightblue' : 'black')};
//   color: white;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 10px;
//   cursor: ${(props) => (props.isDragging ? 'grabbing' : 'grab')};
//   user-select: none;
// `;

// function App() {
//   const [boxes, setBoxes] = useState([
//     { id: 1, x: 50, y: 50 },
//     { id: 2, x: 200, y: 50 },
//     { id: 3, x: 350, y: 50 },
//   ]);

//   const [draggingBoxId, setDraggingBoxId] = useState(null);
//   const [offset, setOffset] = useState({ x: 0, y: 0 });

//   const handleMouseMove = (e) => {
//     if (draggingBoxId === null) return;
//     setBoxes((prevBoxes) => {
//       return prevBoxes.map((box) =>
//         box.id === draggingBoxId
//           ? { ...box, x: e.clientX - offset.x, y: e.clientY - offset.y }
//           : box
//       );
//     });
//   };

//   const handleMouseUp = () => {
//     if (draggingBoxId === null) return;

//     setBoxes((prevBoxes) => {
//       const currentBox = prevBoxes.find((b) => b.id === draggingBoxId);
//       const otherBoxes = prevBoxes.filter((b) => b.id !== draggingBoxId);

//       // 檢查是否與其他box重疊
//       const overlappingBox = otherBoxes.find(
//         (box) =>
//           Math.abs(box.x - currentBox.x) < 100 &&
//           Math.abs(box.y - currentBox.y) < 100
//       );

//       if (overlappingBox) {
//         return prevBoxes.map((box) => {
//           if (box.id === draggingBoxId) {
//             return { ...box, x: overlappingBox.x, y: overlappingBox.y };
//           } else if (box.id === overlappingBox.id) {
//             return { ...box, x: currentBox.x, y: currentBox.y };
//           }
//           return box;
//         });
//       }

//       return prevBoxes;
//     });

//     setDraggingBoxId(null);
//   };

//   const handleMouseDown = (e, boxId) => {
//     const box = boxes.find((b) => b.id === boxId);
//     setDraggingBoxId(boxId);
//     setOffset({ x: e.clientX - box.x, y: e.clientY - box.y });
//   };

//   return (
//     <BoxContainer onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
//       {boxes.map((box) => (
//         <Box
//           key={box.id}
//           style={{ left: box.x, top: box.y }}
//           isDragging={draggingBoxId === box.id}
//           onMouseDown={(e) => handleMouseDown(e, box.id)}
//         >
//           Box {box.id}
//         </Box>
//       ))}
//     </BoxContainer>
//   );
// }

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
