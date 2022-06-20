import React from 'react';
import {Box} from "@mui/material";
import MyTodoHeader from "../Components/MyTodoHeader/MyTodoHeader";

export default function MainPage() {
    return (
            <Box sx={{
                display: "flex",
                width: "100%",
                height: "100%",
                flexDirection: "column",
                backgroundColor: "primary.main"
            }}>
                <MyTodoHeader/>

            </Box>
    )
}