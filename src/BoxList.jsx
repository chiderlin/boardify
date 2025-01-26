import React, { useState } from 'react';
import styled from 'styled-components';
import 'styled-components';
import { useBoxContext } from './hook/BoxContext';
import { TodoProvider, useTodoContext } from './hook/ToDoContext';
import InputToDo from './InputToDo';
import TodoWindow from './ToDoWindow';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';

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

function SortableTask({ id, title, onClick }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <TodoTask
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
    >
      {title}
    </TodoTask>
  );
}

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

  // const onDragEnd = (result) => {
  //   const { source, destination } = result;
  //   if (!destination) return;

  //   const sourceBoxId = source.droppableId;
  //   const destinationBoxId = destination.droppableId;

  //   if (
  //     sourceBoxId === destinationBoxId &&
  //     source.index === destination.index
  //   ) {
  //     return;
  //   }

  //   const updatedTodos = { ...todosByBox };

  //   const [movedTodo] = updatedTodos[sourceBoxId].splice(source.index, 1);
  //   updatedTodos[destinationBoxId].splice(destination.index, 0, movedTodo);

  //   setTodosByBox(updatedTodos);
  // };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
    {
      coordinateGetter: sortableKeyboardCoordinates,
    }
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id == over.id) return;

    const activeBoxId = Object.keys(todosByBox).find((boxId) =>
      todosByBox[boxId].some((todo) => todo.id === active.id)
    );

    const overBoxId = Object.keys(todosByBox).find((boxId) =>
      todosByBox[boxId].some((todo) => todo.id === over.id)
    );

    if (activeBoxId === overBoxId) {
      const updatedTodos = {
        ...todosByBox,
        [activeBoxId]: arrayMove(
          todosByBox[activeBoxId],
          todosByBox[activeBoxId].findIndex((todo) => todo.id === active.id),
          todosByBox[activeBoxId].findIndex((todo) => todo.id === over.id)
        ),
      };
      setTodosByBox(updatedTodos);
    }
  };

  return (
    <DndContext
      // sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      {boxes.map((box) => (
        <Box
          key={box.id}
          style={{
            position: 'absolute',
            left: `${(box.id - 1) * 310}px`,
          }}
        >
          <BoxNameBlock>
            <BoxName>{box.name}</BoxName>
          </BoxNameBlock>
          <SortableContext
            items={todosByBox[box.id]?.map((todo) => todo.id) || []}
          >
            {todosByBox[box.id]?.map((todo, idx) => (
              <SortableTask
                key={todo.id}
                id={todo.id}
                title={todo.title}
                onClick={() =>
                  handleShowWindow({ boxId: box.id, todoIdx: idx })
                }
              />
            ))}
          </SortableContext>
          {showWindow && <TodoWindow todoObj={selectTodoIdx}></TodoWindow>}
          {showTodoInputBox && activeBoxId == box.id ? (
            <InputToDo boxId={box.id} />
          ) : (
            <AddATaskBtn onClick={() => handleAddTasks(box.id)}>
              + Add a Task
            </AddATaskBtn>
          )}
        </Box>
      ))}
    </DndContext>
  );
}

export default function BoxListWrap() {
  return (
    <TodoProvider>
      <BoxList />
    </TodoProvider>
  );
}
