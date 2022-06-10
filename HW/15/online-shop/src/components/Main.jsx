import Header from "./Header/Header";
import Aside from "./Aside/Aside";
import {Box, Typography} from "@mui/material";
import Footer from "./Footer/Footer";
import ItemsList from "./ItemsList/ItemsList";

export default function Main() {
    return (<Box sx={{display: "flex", flexDirection: "column",height:"100%", justifyContent:"space-between", alignItems:"center"}}>
        <Box sx={{display: "flex", flexDirection: "column"}}>
        <Header/>
        <Box sx={{
            gap:"1rem",
            display: "flex",
            marginTop: "64px",
            overflow: "auto",
            flexDirection: {xs:"column", md: "column", lg: "row"},
            justifyContent: "space-between"
        }}>
            <ItemsList/>
            <Aside/>
        </Box>
        </Box>
        <Footer/>
    </Box>)

}