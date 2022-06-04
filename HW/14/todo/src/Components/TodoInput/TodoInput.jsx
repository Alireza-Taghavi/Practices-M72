import * as React from 'react';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {IconButton} from "@mui/material";

export default function TodoInput(props) {

    const SubmitButton = () => {
        return (
            <IconButton type="submit" color="primary" aria-label="add a todo" style={{height: "4rem", width: "4rem"}}
                        onClick={props.submit}>
                <AddCircleIcon fontSize="large"/>
            </IconButton>
        );
    }
    return (
        <Box component="form" onSubmit={props.submit} autoComplete="off" sx={{width: "100%",}} >
            <TextField
                id="TodoInput"
                label={props.label}
                color={'primary'}
                InputProps={{endAdornment: <SubmitButton/>}}
                style={{width: "100%", paddingRight: "0"}}
                className={"TodoInput"}
            />
        </Box>
    );
}