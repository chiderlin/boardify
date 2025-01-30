import React, { Children } from 'react';
import styled from 'styled-components';
import 'styled-components';
import { useBoxContext } from './hook/BoxContext';
import { TodoProvider, useTodoContext } from './hook/ToDoContext';
import InputToDo from './InputToDo';
import TodoWindow from './ToDoWindow';
import { DndContext, closestCenter } from '@dnd-kit/core';

import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';

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
// width: 90%;
const BoxNameBlock = styled.div`
  width: 260px;
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

function SortableBox({ id, children, style, disableDrag }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled: disableDrag });
  const sortableStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    ...style,
  };

  return (
    <div ref={setNodeRef} style={sortableStyle} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

function BoxList() {
  const { boxes, setBoxes, activeBoxId, setActiveBoxId } = useBoxContext();
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
    // setShowTodoInputBox(!showTodoInputBox);
    setShowTodoInputBox((prev) => ({
      ...prev,
      [boxId]: !prev[boxId],
    }));
  };

  const handleShowWindow = ({ boxId, todoIdx }) => {
    setSelectTodoIdx({ boxId, todoIdx });
    setShowWindow(!showWindow);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    // console.log('boxes: ', boxes);
    // console.log('over: ', over);
    // console.log('active: ', active);
    if (!over || active.id == over.id) return;

    // check if it's a box being dragged
    if (boxes.some((box) => box.id === active.id)) {
      const activeIndex = boxes.findIndex((box) => box.id === active.id);
      const overIndex = boxes.findIndex((box) => box.id === over.id);

      // Reorder the boxes
      const updateBoxes = arrayMove(boxes, activeIndex, overIndex);
      setBoxes(updateBoxes);
      return;
    }

    // check if it's a task being dragged
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
    } else if (activeBoxId && overBoxId) {
      // Move task from one box to another
      const activeTaskIndex = todosByBox[activeBoxId].findIndex(
        (todo) => todo.id === active.id
      );
      const [movedTask] = todosByBox[activeBoxId].splice(activeTaskIndex, 1);
      const updateTodos = {
        ...todosByBox,
        [activeBoxId]: [...todosByBox[activeBoxId]],
        [overBoxId]: [...todosByBox[overBoxId], movedTask],
      };
      setTodosByBox(updateTodos);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={boxes[0] ? boxes : []}>
        {boxes.map((box) => (
          <SortableBox
            key={box.id}
            id={box.id}
            style={{ left: `${(box.id - 1) * 310}px` }} // cannot use position absolute here, to avoid couldn't move
            disableDrag={showTodoInputBox && activeBoxId === box.id}
          >
            <Box>
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
                <InputToDo
                  boxId={box.id}
                  onPointerDown={(e) => e.stopPropagation()}
                />
              ) : (
                <AddATaskBtn
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => handleAddTasks(box.id)}
                >
                  + Add a Task
                </AddATaskBtn>
              )}
              {/* {showTodoInputBox[box.id] ? (
                <InputToDo
                  boxId={box.id}
                  // onPointerDown={(e) => e.stopPropagation()}
                />
              ) : (
                <AddATaskBtn
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => handleAddTasks(box.id)}
                >
                  + Add a Task
                </AddATaskBtn>
              )} */}
            </Box>
          </SortableBox>
        ))}
      </SortableContext>
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
