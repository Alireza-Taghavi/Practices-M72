import React from 'react';
import {Box, Typography} from "@mui/material";
import MyTodoHeader from "../Components/MyTodoHeader/MyTodoHeader";
import {useDispatch, useSelector} from "react-redux";
import {addTodo} from "../redux/slices/todoSlices";
import MyTodoList from "../Components/MyTodoList/MyTodoList";

export default function MainPage() {
    const {todos} = useSelector((store) => store.todos)
    const dispatch = useDispatch();

    return (
        <Box sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: "column",
            backgroundColor: "primary.main"
        }}>
            <MyTodoHeader/>
            {/*<Button onClick={() => {*/}
            {/*    dispatch(changeTodos({name: "test", id: Date.now()}))*/}
            {/*}}>Add to Todos</Button>*/}
            {/*{todos.map(todo => (*/}
            {/*    <>*/}
            {/*        <p key={todo.id}>*/}
            {/*            {todo.name}*/}
            {/*        </p>*/}
            {/*        <Button onClick={() => {*/}
            {/*        dispatch(editTodo(todo.id));*/}
            {/*        }}>edit</Button></>*/}
            {/*))}*/}
            {/*<Button sx={{backgroundColor:"white"}} onClick={()=>{*/}
            {/*   dispatch(updateTodo("aaaaaaaaaaa"))*/}
            {/*}}>update</Button>*/}
            <Box sx={{width: "90%", display:"flex", alignSelf:"center", py:"4rem"}}>
                <MyTodoList/>
            </Box>
        </Box>
    )
}