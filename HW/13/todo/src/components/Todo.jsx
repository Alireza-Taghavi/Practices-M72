import React, {useState} from "react";
import TodoForm from "./TodoForm";
import {RiCloseCircleLine} from "react-icons/ri";
import {TiEdit} from "react-icons/ti";

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };
  const rngNumber = () => {
    return Math.floor(Math.random() * (220))
  }
  const rngSmallerNumber = () => {
    return Math.floor(Math.random() * (35 - 10)) + 10
  }
  const randomBG = () => {
    const r = rngNumber()
    const g = rngNumber()
    const b = rngNumber()
    const rgba = `rgba(${r},${g},${b},0.8)`
    const rgba2 = `rgba(${r+rngSmallerNumber()},${g+rngSmallerNumber()},${b+rngSmallerNumber()},0.8)`
    return [rgba, rgba2]
}

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? "todo-row complete" : "todo-row"}
      key={index}
      style={{background: `linear-gradient(90deg,${randomBG()[0]} 0%,${randomBG()[1]} 100%)`}}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className="delete-icon"
        />
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className="edit-icon"
        />
      </div>
    </div>
  ));
};

export default Todo;
