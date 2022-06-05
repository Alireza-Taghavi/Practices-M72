import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TodoList({todos, completeTodo, removeTodo, setEdit}) {

    return(
<>
    {(todos.map((todo, index) => (
        <div
            className={todo.isComplete ? "todo-row complete" : "todo-row"}
            key={index}
            style={{background: `linear-gradient(80deg,${todo.bg[0]} 0%,${todo.bg[1]} 100%)`}}
        >
            <p key={todo.id}
               onClick={() => completeTodo(todo.id)}
            >
                {todo.task}
            </p>
            <div className="icons">

                <EditIcon
                    onClick={() => setEdit({id: todo.id, value: todo.task})}
                    className="edit-icon"
                />
                <DeleteIcon
                    onClick={() => removeTodo(todo.id)}
                    className="delete-icon"
                />
            </div>
        </div>

    )))}
</>
    );
}