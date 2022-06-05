import * as React from 'react';
import TodoHeader from './TodoHeader/TodoHeader';
import TodoInput from "./TodoInput/TodoInput";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import uuid from "react-uuid";

export default function TodoApp() {
    //Get todos from local storage - dependency is a function, so it only calls the local storage once
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            return JSON.parse(savedTodos);
        } else {
            return [];
        }
    });
    //Store todos in local storage
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);


    const addTodo = todo => {
        if (!todo || /^\s*$/.test(todo)) {
            return;
        }

        const newTodos = [todo, ...todos];

        setTodos(newTodos);
        console.log((todos));
    };

    //Random background generator
    const rngNumber = () => {
        return Math.floor(Math.random() * (255))
    }
    const rngSmallerNumber = () => {
        return Math.floor(Math.random() * (100))
    }
    const randomBG = () => {
        let r = rngNumber()
        let g = rngNumber()
        let b = rngNumber()
        while ((r + g + b) > 510) {
            r = rngNumber()
            g = rngNumber()
            b = rngNumber()
        }
        const rgba = `rgba(${r},${g},${b},0.8)`
        const rgba2 = `rgba(${r + rngSmallerNumber()},${g + rngSmallerNumber()},${b + rngSmallerNumber()},0.8)`
        return [rgba, rgba2]
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const input = event.target.previousSibling;
        console.log(input.value);
        addTodo({
           task: input.value,
            isComplete: false,
            id: uuid(),
            bg: randomBG()

        });

        input.value = "";
    };
    return (
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
    );
}