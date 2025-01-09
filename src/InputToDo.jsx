import React, { useRef } from 'react';
import { useTodoContext } from './hook/ToDoContext';
import styled from 'styled-components';
import 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { CloseBtn, ConfirmBtn, AddListContainer } from './styles/common/Button';

const AddCardContainer = styled(AddListContainer)`
  color: #3c3c3c;
  margin: 10px;
`;

//FIXME: optimized.. placeholder不能靠上對齊
const InputTodo = styled.input`
  width: 85%;
  padding: 10px;
  height: 35px;
  border-radius: 4px;
  margin-left: 10px;
  &:placeholder {
    line-height: 1;
    padding-top: 0;
    padding-bottom: 0;
  }
`;

function AddCardWithClose({ boxId }) {
  const {
    setTodosByBox,
    inputTodoValue,
    setInputTodoValue,
    showTodoInputBox,
    setShowTodoInputBox,
  } = useTodoContext();
  const btnRef = useRef();
  const handleCreateTodo = () => {
    if (btnRef.current) {
      const newTodo = {
        id: new Date().getTime(),
        content: inputTodoValue,
      };
      setTodosByBox((prevTodos) => {
        const updatedTodos = prevTodos[boxId]
          ? [...prevTodos[boxId], newTodo]
          : [newTodo];
        return { ...prevTodos, [boxId]: updatedTodos };
      });
      setInputTodoValue('');
      setShowTodoInputBox(!showTodoInputBox);
    }
  };
  return (
    <AddCardContainer>
      <ConfirmBtn ref={btnRef} onClick={handleCreateTodo}>
        Add Card
      </ConfirmBtn>
      <CloseBtn onClick={() => setShowTodoInputBox(false)}>
        <FontAwesomeIcon icon={faTimes} />
      </CloseBtn>
    </AddCardContainer>
  );
}

export default function InputToDo({ boxId }) {
  const {
    todoByBox,
    setTodosByBox,
    inputTodoValue,
    setInputTodoValue,
    showTodoInputBox,
    setShowTodoInputBox,
  } = useTodoContext();
  const inputRef = useRef(null);
  const handleKeyPress = (e) => {
    if (inputRef.current && e.key === 'Enter') {
      const newTodo = {
        id: new Date().getTime(),
        content: inputTodoValue,
      };
      setTodosByBox((prevTodos) => {
        const updatedTodos = prevTodos[boxId]
          ? [...prevTodos[boxId], newTodo]
          : [newTodo];
        return { ...prevTodos, [boxId]: updatedTodos };
      });
      setInputTodoValue('');
      setShowTodoInputBox(!showTodoInputBox);
    }
  };

  return (
    <>
      <InputTodo
        type="text"
        value={inputTodoValue}
        onChange={(e) => setInputTodoValue(e.target.value)}
        ref={inputRef}
        onKeyDown={handleKeyPress}
        placeholder="Enter a title or paste a link"
      />
      <AddCardWithClose boxId={boxId} />
    </>
  );
}
