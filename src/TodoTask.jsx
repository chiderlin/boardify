import styled from 'styled-components';
import React, { useState, useRef } from 'react';

const Todo = styled.div`
  width: 90%;
  height: 50px;
  background-color: #d0d0d0;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;

  &:hover {
    outline: 1px solid white;
    cursor: pointer;
  }
`;

function TodoTask() {
  const [todo, setTodo] = useState([]);

  return (
    <Todo>
      {/* TODO如果新的box, 這邊是空的，如果該box有紀錄的todo,才增加 */}
    </Todo>
  );
}

export default TodoTask;
