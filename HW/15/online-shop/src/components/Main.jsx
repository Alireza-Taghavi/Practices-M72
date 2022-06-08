import Header from "./Header/Header";
import Aside from "./Aside/Aside";
import {Box, Typography} from "@mui/material";
import Footer from "./Footer/Footer";
import ItemsList from "./ItemsList/ItemsList";

export default function Main() {
    return (<Box sx={{display:"flex", flexDirection:"column"}}>
            <Header/>
            <Box sx={{width: "100%", display: "flex", marginTop: "64px", overflow:"auto", flexDirection:{xs:"column", sm:"row"}, justifyContent:"space-between"}}>
                <ItemsList/>
                <Aside/>
            </Box>
            <Footer/>
        </Box>)

}