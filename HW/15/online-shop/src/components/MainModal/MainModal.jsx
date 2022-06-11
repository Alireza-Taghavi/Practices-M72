import * as React from 'react';
import {Box, Button, Modal, Typography} from "@mui/material";
import BuyButton from "../BuyButton/BuyButton";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: "white",
    width: "90%",
    height: "90%",
    overflow: "hidden",
    border: "1px solid grey",
    animation: "fadeIn .5s ease-in"
};
const style2 = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center"
}
export default function MainModal({open, handleClose, item, addOrders}) {
    return (
        <Modal open={open}
               onClose={handleClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
               sx={{backgroundColor: "hsla(0,0%,100%,.534)"}}>
            <Box sx={style}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    height: "100%",
                    width: "100%",
                }}>
                    <Box sx={{width: "50%", height: "100%"}}>
                        <img style={{width: "100%", height: "100%"}} alt={item.description} src={item.url}/>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        padding: "2rem",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        width: "50%",
                        p: "2rem",
                        gap: "1rem",

                    }}>
                        <Box sx={style2}>
                            <Typography>{item.description}</Typography>
                            <Button sx={{
                                background: "#c7c7c7",
                                border: "1px solid black",
                                color: "black",
                                py: "0.3rem",
                                borderRadius: "0.3rem"
                            }} onClick={handleClose}>X</Button>
                        </Box>
                        <Typography>
                            This is for all the latest trends, no matter who you are, where you’re from and what you’re
                            up to. Exclusive to ASOS, our universal brand is here for you, and comes in all our fit
                            ranges: ASOS Curve, Tall, Petite and Maternity. Created by us, styled by you.
                        </Typography>
                        <Box sx={style2}>
                            <Typography>Price : ${item.price}</Typography>
                            <BuyButton addOrders={addOrders} handleClose={handleClose} item={item}/>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}