import {Box, TextField, Toolbar, Typography} from "@mui/material";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import styled from "@emotion/styled";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import React from "react"
import MyTodoDrawer from "../MyTodoDrawer/MyTodoDrawer"
export default function MyTodoHeader() {
    const CssTextField = styled(TextField)({
        '& label.Mui-focused': {
            color: 'white',
        },
        '& label': {
            color: '#c6c6c6',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                border: `2px solid #aaa`,
            },
            '&:hover fieldset': {
                borderColor: '#c6c6c6',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#fff',
            },
        },
    });
    const buttonClasses = {
            fontSize: '2rem',
            cursor:"pointer",
            color: '#c6c6c6',
            '&:hover': {
                color: '#fff',
            }

    }

    return (
        <Toolbar sx={{
            display: "flex",
            flexDirection: "row",
            color: "#fff",
            px: "1.6rem",
            py: "1rem",
            alignItems: "center",
            backgroundColor: "secondary.main",
            fullWidth: "true",
            justifyContent: "space-between"
        }}>
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <FormatListBulletedIcon fontSize="large"/>
                <Typography sx={{fontWeight: "700", fontSize: "1.7rem"}}>WHAT 2 DO?</Typography>
            </Box>
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", gap:"2.5rem"}}>
                <CssTextField size="small" label="🔍 Search" id="search-input" sx={{input: {color: 'white'}}}/>

                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", gap:"0.8rem"}}>
                    <AddRoundedIcon sx={buttonClasses}/>
                    <MyTodoDrawer />
                </Box>
            </Box>
        </Toolbar>
    )
}