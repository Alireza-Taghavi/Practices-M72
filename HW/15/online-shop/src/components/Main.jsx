import Header from "./Header/Header";
import Aside from "./Aside/Aside";
import {Box} from "@mui/material";
import Footer from "./Footer/Footer";
import ItemsList from "./ItemsList/ItemsList";

export default function Main() {
    return (<Box sx={{
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
                width:"100%",
                flexDirection: {xs: "column", lg: "row"},
                justifyContent: "space-between",
                alignItems:{xs: "center", lg: "start"}
            }}>
                <ItemsList/>
                <Aside/>
            </Box>
        </Box>
        <Footer/>
    </Box>)

}