import React from "react";
import {Box, Typography} from "@mui/material";

export default function Item(props) {
    const item = props.item;
    return (


        <Box sx={{
            height: "470px",
            width: "300px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "30px 10px",
            animation: "fadeIn .5s ease-in",
            gap:"1rem",
            "&:hover": {
                cursor: "pointer",
                "& .name": {
                    color: "orange"
                }
            }
        }}>
            <Box sx={{width: "100%"}}>
                <img alt={""} style={{width: "100%", height: "100%"}}
                     src={item.url}/>
            </Box>
            <Typography className={"name"}>{item.description}</Typography>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "90%"
            }}>
                <Typography>${item.price}</Typography>
                <button key={item.id} style={{
                    padding: "12px 18px",
                    backgroundColor: "#f0c041",
                    color: "#000",
                    outline: "none",
                    border: "none",
                    cursor: "pointer"
                }}>Add to Card
                </button>
            </Box>
        </Box>
    )
}