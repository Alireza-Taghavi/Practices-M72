import React, {useState} from "react";
import TodoForm from "./TodoForm";
import {RiCloseCircleLine} from "react-icons/ri";
import {TiEdit} from "react-icons/ti";

const Todo = ({todos, completeTodo, removeTodo, updateTodo}) => {
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
    if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate}/>;
    }

    return todos.map((todo, index) => (

        <div
            className={todo.isComplete ? "todo-row complete" : "todo-row"}
            key={index}
            style={{background: `linear-gradient(80deg,${todo.bg[0]} 0%,${todo.bg[1]} 100%)`}}
        >
            <p key={todo.id} onClick={() => completeTodo(todo.id)}>
                {todo.text}
            </p>
            <div className="icons">

                <TiEdit
                    onClick={() => setEdit({id: todo.id, value: todo.text})}
                    className="edit-icon"
                />
                <RiCloseCircleLine
                    onClick={() => removeTodo(todo.id)}
                    className="delete-icon"
                />
            </div>
        </div>

    ));
};

export default Todo;
