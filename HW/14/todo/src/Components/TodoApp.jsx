import * as React from 'react';
import TodoHeader from './TodoHeader/TodoHeader';
import TodoInput from "./TodoInput/TodoInput";
import Box from "@mui/material/Box";
import {useState} from "react";

export default function TodoApp() {
    const [todos, setTodos] = useState([]);
    const addTodo = todo => {
        if (!todo || /^\s*$/.test(todo)) {
            return;
        }

        const newTodos = [todo, ...todos];

        setTodos(newTodos);
        console.log((todos));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const input = event.target.previousSibling;
        console.log(input.value);
        addTodo(input.value);

        input.value = "";
    };
    return (
        <Box style={{display: "flex", justifyContent: "center", marginTop: "5rem",}}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                width: "30%",
                border: 4,
                borderColor: 'primary.main',
                justifyContent: "start",
                alignItems: "center",
                p: "3rem",
                borderRadius: "1rem",
                gap: "2rem"
            }}>
                <TodoHeader/>
                <TodoInput submit={handleSubmit} label={"add something"}/>
            </Box>
        </Box>
    );
}