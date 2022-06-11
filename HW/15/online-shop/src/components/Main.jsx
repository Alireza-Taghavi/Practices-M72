import * as React from 'react';
import Header from "./Header/Header";
import Aside from "./Aside/Aside";
import {Box} from "@mui/material";
import Footer from "./Footer/Footer";
import ItemsList from "./ItemsList/ItemsList";
import MainModal from "./MainModal/MainModal";

export default function Main() {
    const [modal, setModal] = React.useState({});
    const handleModal = (item) => {
        setModal(item);
    }
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [orders, setOrders] = React.useState([]);
    const handleOrders = (newItems) => {
        const filteredItems = newItems.filter(item => item.amount > 0);
        setOrders(filteredItems);
        console.log(filteredItems);
    }
    const addOrders = (item) => {
        const oldOrders = [...orders];
        if ((oldOrders.findIndex(order => order.description === item.description)) === -1) {
            oldOrders.push({
                description: item.description,
                price: item.price,
                amount: 1,
                url: item.url
            })
        } else {
            oldOrders.forEach(order => {
                    if (order.description === item.description) {
                        order.amount += 1;
                    }
                }
            )

        }
        handleOrders(oldOrders);
    }
    const removeOrders = (item) => {
        const oldOrders = [...orders];
        oldOrders.forEach(order => {
                if (order.description === item.description) {
                    order.amount -= 1;
                }
            }
        )
        handleOrders(oldOrders);
    }
    const clearOrders = (description) => {
        const oldOrders = [...orders];
        oldOrders.forEach(order => {
            if (order.description === description) {
                order.amount = 0;
            }
        });
        handleOrders(oldOrders);
    }
    const total = () => {
        let total = 0;
        orders.forEach(order => {
            total += 1;
        })
        return total;
    }
    const totalPrice = () => {
        let total = 0;
        orders.forEach(order => {
            total += order.price * order.amount;
        })
        return total;
    }
    return (
        <>
            <MainModal handleClose={handleClose} open={open} item={modal} addOrders={addOrders}/>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "space-between",
                alignItems: "center"
            }}>

                <Box sx={{display: "flex", flexDirection: "column"}}>
                    <Header/>

                    <Box sx={{
                        gap: "1rem",
                        display: "flex",
                        marginTop: "64px",
                        overflow: "auto",
                        width: "100%",
                        flexDirection: {xs: "column", lg: "row"},
                        justifyContent: "space-between",
                        alignItems: {xs: "center", lg: "start"}
                    }}>
                        <ItemsList handleOpen={handleOpen} handleModal={handleModal} addOrders={addOrders}/>
                        <Aside orders={orders} addOrders={addOrders} removeOrders={removeOrders}
                               clearOrders={clearOrders} total={total} totalPrice={totalPrice}/>
                    </Box>
                </Box>
                <Footer/>
            </Box>
        </>)
}