import * as React from 'react';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./TodoInput.css";
export default function TodoInput() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            todo: data.get('TodoInput'),
        });
    };
    return(
<>
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display:"flex" , flexDirection:"row", height:"4rem", width:"100%",}}>
        <TextField
            required
            id="TodoInput"
            label="Add Todo"
            name="TodoInput"
            autoFocus
            sx={{height:"100%", width:"75%",}}
        />
        <Button
            type="submit"
            variant="contained"
            sx={{height:"100%", width:"25%"}}
        >
            Sign In
        </Button>
    </Box>
</>
    );
}