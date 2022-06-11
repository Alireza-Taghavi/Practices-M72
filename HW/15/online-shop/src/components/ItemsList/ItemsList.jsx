import {Box, FormControl, MenuItem, Select, Typography} from "@mui/material";
import React from "react";
import Item from "./Items/Item";
import data from "../../data.json"

export default function ItemsList({handleOpen, handleModal, addOrders}) {
    const [order, setOrder] = React.useState('lowest');
    const handleChangeOrder = (event) => {
        setOrder(event.target.value);
    };
    const [filter, setFilter] = React.useState('ALL');
    const handleChangeFilter = (event) => {
        setFilter(event.target.value);
    };
    let sizes = [];
    // get all the sizes from data
    data.forEach(item => {
        item.size.forEach(size => {
            if (!sizes.includes(size)) sizes.push(size)
        })
    });
    // sort the sizes
    sizes.sort((a, b) => a.charCodeAt(a.length - 1) - b.charCodeAt(b.length - 1));
    // put All first
    sizes = sizes.filter(item => item !== "ALL");
    sizes.unshift("ALL");

    const filteredData = data.filter(item => {
        if (filter === 'ALL') return true;
        return item.size.includes(filter)
    }).sort((a, b) => {
        if (order === 'lowest') return a.price - b.price;
        return b.price - a.price;
    })
    return (
        <Box sx={{display: "flex", flexDirection: "column", maxWidth: "980px", alignItems: "center"}}>
            <Box sx={{
                display: "flex", flexDirection: "row", justifyContent: "space-between", bgcolor: 'background.paper',
                height: "60px",
                borderBottom: "1px solid silver",
                width: "95%",
                alignItems: "center"

            }}>
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                    <Typography>{filteredData.length} Products</Typography>
                </Box>
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", gap: "0.5rem"}}>
                    <Typography>Order</Typography>
                    <FormControl>
                        <Select
                            sx={{width: "90px", height: "30px"}}
                            value={order}
                            onChange={handleChangeOrder}
                            displayEmpty
                            inputProps={{'aria-label': 'Without label'}}
                        >
                            <MenuItem value={"lowest"}>Lowest</MenuItem>
                            <MenuItem value={"highest"}>Highest</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", gap: "0.5rem"}}>
                    <Typography>Filter</Typography>
                    <FormControl>
                        <Select
                            sx={{width: "90px", height: "30px"}}
                            value={filter}
                            onChange={handleChangeFilter}
                            displayEmpty
                            inputProps={{'aria-label': 'Without label'}}
                        >
                            {
                                sizes.map((size, index) => {
                                    return <MenuItem value={size} key={index}>{size}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Box>
            </Box>
            <Box sx={{
                display: "flex",
                flexWrap: "wrap",
                flex: "1",
                justifyContent: "center",
            }}>
                {
                    filteredData.map((item, index) => {
                    return <Item handleOpen={handleOpen} handleModal={handleModal} key={index} item={item} addOrders={addOrders}/>
                })
                }
            </Box>
        </Box>
    )
};