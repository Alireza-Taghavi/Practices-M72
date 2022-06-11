import {
    Box, Button,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText, TextField,
    Typography
} from "@mui/material";
import * as React from "react";

export default function Aside({orders, removeOrders, clearOrders, total, totalPrice}) {
    const [show, setShow] = React.useState(false);
    const handleShow = () => setShow(!show);
    return (
        <Box sx={{
            zIndex: "1",
            flexShrink: 0,
            width: "350px",
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
        }}>
            <Box sx={{
                borderBottom: "1px solid silver",
                height: "60px",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                justifySelf: "center"
            }}>
                <Typography sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    {(total() === 0) ? "Cart is Empty" : `You have ${total()} in the Cart`}
                </Typography>
            </Box>
            <Box sx={{
                display: "flex", flexDirection: "column", gap: "1rem", paddingTop: "1rem"

            }}>
                {orders.map(item => {
                    return (
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "flex-start"
                        }}>
                            <Box width={"60px"} height={"60px"}>
                                <img style={{width: "100%", height: "100%"}} alt={item.name} src={item.url}/>
                            </Box>
                            <Box sx={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                                <Typography>{item.description}</Typography>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    width: "100%",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                                    <Typography> ${item.price} * {item.amount} </Typography>
                                    <Button sx={{bgcolor: "#eee", border: "1px black solid", p: "1", color: "black"}}
                                            onClick={() => removeOrders(item)}>Remove</Button>
                                </Box>
                            </Box>
                        </Box>)
                })}

            </Box>
            {(total() === 0) ? null : <Box sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "1rem 0"
            }}>
                <Typography>Total: ${totalPrice().toFixed(2)}</Typography>
                <Button onClick={()=>handleShow()} sx={{
                    padding: "12px 18px",
                    backgroundColor: "#f0c041",
                    color: "#000",
                    outline: "none",
                    border: "none",
                    "&:hover": {
                        cursor: "pointer",
                    }
                }}

                >
                    Proceed
                </Button>
            </Box>}
            {!show ? null : <Box sx={{display:"flex" , flexDirection: "column", gap: "0.5rem"}}>
                <TextField id="outlined-basic" type={"email"} label="Email" variant="outlined"/>
                <TextField id="outlined-basic" label="Name" variant="outlined"/>
                <TextField id="outlined-basic" label="Address" variant="outlined"/>
                <Button sx={{
                    padding: "12px 18px",
                    backgroundColor: "#f0c041",
                    color: "#000",
                    outline: "none",
                    border: "none",
                    "&:hover": {
                        cursor: "pointer",
                    }
                }} onClick={() => {
                    alert("Will be sent")
                }}>Checkout</Button>
            </Box>}

        </Box>
    )
}