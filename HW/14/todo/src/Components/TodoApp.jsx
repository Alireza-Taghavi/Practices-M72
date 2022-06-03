import * as React from 'react';
import TodoHeader from './TodoHeader/TodoHeader';
import TodoInput from "./TodoInput/TodoInput";
import Box from "@mui/material/Box";

export default function TodoApp() {
    const TodoAppStyle = {
        display: "flex",
        flexDirection: "column",
        width: "30%",
        border:"6px solid black",
        justifyContent: "start",
        alignItems: "center",
        padding: "3rem",
        borderRadius: "1rem",
        gap:"2rem"
    }
    return (
        <Box style={{ display:"flex", justifyContent:"center", marginTop:"5rem",}}>
            <Box style={TodoAppStyle}>
                <TodoHeader/>
                <TodoInput/>
            </Box>
        </Box>
    );
}