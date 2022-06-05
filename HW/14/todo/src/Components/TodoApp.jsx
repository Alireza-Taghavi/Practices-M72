import * as React from 'react';
import TodoHeader from './TodoHeader/TodoHeader';
import TodoInput from "./TodoInput/TodoInput";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import uuid from "react-uuid";
import TodoList from "./TodoList/TodoList";

export default function TodoApp() {
    //local storage getter - dependency is a function, so it only calls the local storage once
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            return JSON.parse(savedTodos);
        } else {
            return [];
        }
    });
    //local storage setter
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);


    const addTodo = todo => {
        if (!todo || /^\s*$/.test(todo)) {
            return;
        }

        const newTodos = [todo, ...todos];

        setTodos(newTodos);
    };

    const removeTodo = id => {
        const removedArr = [...todos].filter(todo => todo.id !== id);

        setTodos(removedArr);
    };
    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    };


    const [edit, setEdit] = useState({
        id: null,
        value: "",
    });
    const updateTodo = (todoId, newValue) => {
        if (!!newValue.task) {
            // console.log(newValue)
            // const index = todos.findIndex(item=>item.id === todoId);
            // console.log(index);
            // const copyTodos = [...todos];
            // console.log(copyTodos);
            // copyTodos[index] = newValue;
            // setTodos(copyTodos)
            setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
            setEdit({
                id: null,
                value: "",
            });
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const input = event.target.previousSibling;
        console.log(input.value);
        if (!edit.id){
            addTodo({
                task: input.value,
                isComplete: false,
                id: uuid(input.value),
                bg: randomBG()

            });
        }
        else {
            updateTodo(edit.id, {
                id: edit.id,
                isComplete: false,
                task: input.value,
                bg: randomBG()
            });
        }
        input.value = "";
    };
    // const submitUpdate = (value) => {
    //     updateTodo(edit.id, value);
    //     setEdit({
    //         id: null,
    //         value: "",
    //     });
    // };
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

            <TodoInput submit={handleSubmit} label={edit.id ? `edit "${edit.value}"` : "Add something"} isEditing={!!edit.id}/>

            <TodoList
                todos={todos}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                setEdit={setEdit}
            />

        </Box>
    );
}