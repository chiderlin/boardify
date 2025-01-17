import React, { useState } from 'react';
import styled from 'styled-components';
import 'styled-components';
import { useBoxContext } from './hook/BoxContext';
import { TodoProvider, useTodoContext } from './hook/ToDoContext';
import InputToDo from './InputToDo';
import TodoWindow from './ToDoWindow';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

/*transform: ${(props) =>
  props.isDragging ? 'rotate(10deg)' : 'rotate(0deg);'};
  opacity: ${(props) => (props.isDragging ? '0.7' : '1')};
  cursor: ${(props) => (props.isDragging ? 'default' : 'pointer')};
*/

const Box = styled.div`
  min-width: 300px;
  background-color: #e0e0e0;
  border-radius: 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  display: flex; // let AddATask at the bottom of the box
  flex-direction: column; // let AddATask at the bottom of the box
  justify-content: flex-start; // let AddATask at the bottom of the box
  align-items: start;
  height: auto;
  margin: 10px;
`;

const TodoTask = styled.div`
  width: 260px;
  min-height: 30px;
  height: auto;
  background-color: white;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  display: flex;
  padding-left: 10px;
  justify-content: flex-start;
  align-items: center;
  margin: 10px;
  flex-grow: 0;
  word-break: break-word; // next line if text too long
  overflow-wrap: break-word; // next line if text too long
  padding: 10px;
  &:hover {
    outline: 1px solid #0072e3;
    cursor: pointer;
  }
`;

const AddATaskBtn = styled.div`
  width: 80%;
  height: 30px;
  background-color: #e0e0e0;
  font-weight: bold;
  color: #4f4f4f;
  display: flex; // let text center
  align-items: center;
  justify-content: flex-start;
  padding: 5px;
  padding-left: 20px;
  border-radius: 10px;
  margin-left: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    background-color: #bebebe;
  }
`;

const BoxName = styled.h3`
  color: black;
`;

const BoxNameBlock = styled.div`
  width: 90%;
  height: 50px;
  padding-left: 15px;
  border-radius: 5px;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-grow: 0;
`;

function BoxList() {
  const { boxes, activeBoxId, setActiveBoxId } = useBoxContext();
  const {
    todosByBox,
    showTodoInputBox,
    setShowTodoInputBox,
    showWindow,
    setShowWindow,
    selectTodoIdx,
    setSelectTodoIdx,
    setTodosByBox,
  } = useTodoContext();

  const handleAddTasks = (boxId) => {
    setActiveBoxId(boxId);
    setShowTodoInputBox(!showTodoInputBox);
  };

  const handleShowWindow = ({ boxId, todoIdx }) => {
    setSelectTodoIdx({ boxId, todoIdx });
    setShowWindow(!showWindow);
  };

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

  const onDragEnd = (result) => {
    console.log(result);
    const { source, destination } = result;
    if (!destination) return;

    const sourceBoxId = source.droppableId;
    const destinationBoxId = destination.droppableId;

    if (
      sourceBoxId === destinationBoxId &&
      source.index === destination.index
    ) {
      return;
    }

    const updatedTodos = { ...todosByBox };

    const [movedTodo] = updatedTodos[sourceBoxId].splice(source.index, 1);
    updatedTodos[destinationBoxId].splice(destination.index, 0, movedTodo);

    setTodosByBox(updatedTodos);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {boxes.map((box, index) => (
        <Droppable droppableId={box.id.toString()} key={box.id}>
          {(provided) => (
            <Box
              // onMouseDown={(e) => onMouseDown(e, box.id)}
              key={box.id}
              x={box.x}
              y={box.y}
              style={{
                position: 'absolute',
                left: `${(box.id - 1) * 310}px`,
              }}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <BoxNameBlock>
                <BoxName>{box.name}</BoxName>
              </BoxNameBlock>
              {/*    
                架構:
                const todosByBox = {
                  box1: [{ id: 1, title: '任務 1' }, { id: 2, title: '任務 2' }],
                  box2: [{ id: 3, title: '任務 3' }],
                };
            */}

              {todosByBox[box.id]?.map((todo, idx) => (
                <Draggable
                  key={todo.id}
                  draggableId={todo.id.toString()}
                  index={idx}
                >
                  {(provided, snapshot) => (
                    <TodoTask
                      onClick={() =>
                        handleShowWindow({ boxId: box.id, todoIdx: idx })
                      }
                      key={idx}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      isDragging={snapshot.isDragging}
                    >
                      {todo.title}
                    </TodoTask>
                  )}
                </Draggable>
              ))}
              {showWindow && <TodoWindow todoObj={selectTodoIdx}></TodoWindow>}
              {showTodoInputBox && activeBoxId == box.id ? (
                <InputToDo boxId={box.id} />
              ) : (
                <AddATaskBtn onClick={() => handleAddTasks(box.id)}>
                  + Add a Task
                </AddATaskBtn>
              )}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      ))}
    </DragDropContext>
  );
}

export default function BoxListWrap() {
  return (
    <TodoProvider>
      <BoxList />
    </TodoProvider>
  );
}
