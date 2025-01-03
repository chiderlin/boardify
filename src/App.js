import logo from './logo.svg';
import './App.css';
import 'styled-components';
import React, { useState } from 'react';
import styled from 'styled-components';

const Box = styled.div`
  min-width: 300px;
  background-color: black;
  min-width: 300px;
  height: 60%;
  margin: 10px;
  border-radius: 20px;
  place-items: center;
  cursor: ${(props) => (props.isDragging ? 'default' : 'pointer')};
  transform: ${(props) =>
    props.isDragging ? 'rotate(10deg)' : 'rotate(0deg);'};
  opacity: ${(props) => (props.isDragging ? '0.7' : '1')};
`;

function App(props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [draggingBoxId, setDraggingBoxId] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

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
  };

  return (
    /**
     * className="App"原本App.css default裡就設定好了
     */
    <>
      <div className="header">header</div>
      <div className="body" onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
        <Box
          isDragging={isDragging}
          bid="1"
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
        <Box bid="2" onMouseDown={(e) => onMouseDown(e, '2')}>
          <div className="box-title"></div>
          <div className="box-todo">
            <div className="todo">todo</div>
            <div className="todo">todo</div>
            <div className="todo">todo</div>
            <div className="todo">todo</div>
          </div>

          <div className="box-bottom"></div>
        </Box>
        <Box bid="3" onMouseDown={(e) => onMouseDown(e, '3')}>
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
        </Box>
        <div className="todo addboxbtn">+ Add another list</div>
      </div>
    </>
  );
}

export default App;
