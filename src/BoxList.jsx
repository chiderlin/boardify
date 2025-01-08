import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import 'styled-components';

/*transform: ${(props) =>
  props.isDragging ? 'rotate(10deg)' : 'rotate(0deg);'};
  opacity: ${(props) => (props.isDragging ? '0.7' : '1')};
  cursor: ${(props) => (props.isDragging ? 'default' : 'pointer')};
*/

//place-items: center;
const Box = styled.div`
  min-width: 300px;
  background-color: black;
  border-radius: 20px;
  display: flex; // let AddATask at the bottom of the box
  flex-direction: column; // let AddATask at the bottom of the box
  justify-content: flex-start; // let AddATask at the bottom of the box
  align-items: center;
  height: auto;
`;

const TodoTask = styled.div`
  width: 90%;
  height: 50px;
  background-color: #d0d0d0;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  flex-grow: 0;

  &:hover {
    outline: 1px solid white;
    cursor: pointer;
  }
`;

const AddATaskBtn = styled.div`
  min-width: 300px;
  height: 50px;
  background-color: black;
  color: white;
  display: grid; // let text center
  place-items: center; // let text center
  border-radius: 10px;
  margin-top: auto;
  cursor: pointer;
  &:hover {
    background-color: #7b7b7b;
  }
`;

function BoxList({ boxes }) {
  const [todosByBox, setTodosByBox] = useState({}); // object to track todos by box

  // TODO: 點擊先input task name, 確認btn才create task card + show task name (enter也可以)
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

    setTodosByBox((prevTodos) => {
      const updatedTodos = prevTodos[boxId]
        ? [...prevTodos[boxId], newTodo]
        : [newTodo];
      return {
        ...prevTodos,
        [boxId]: updatedTodos,
      };
    });
  };

  // TODO: 移動box
  // const onMouseDown = (e, bid) => {
  //   console.log('bid: ', bid);
  //   setIsDragging(true);
  //   console.log('e.clientX:', e.clientX);
  //   console.log('e.clientY', e.clientY);
  //   setOffset({
  //     x: e.clientX - position.x,
  //     y: e.clientY - position.y,
  //   });
  //   setDraggingBoxId(bid);
  // };

  return boxes.map((box) => (
    <Box
      // onMouseDown={(e) => onMouseDown(e, box.id)}
      key={box.id}
      x={box.x}
      y={box.y}
      style={{
        position: 'absolute',
        left: `${(box.id - 1) * 310}px`,
      }}
    >
      {/* <TodoByBox boxesObj={}> */}
      {todosByBox[box.id]?.map((todo) => (
        <TodoTask key={todo.id}>{todo.content}</TodoTask>
      ))}
      <AddATaskBtn onClick={() => handleAddTasks(box.id)}>
        + Add a Task
      </AddATaskBtn>
    </Box>
  ));
}

export default BoxList;
