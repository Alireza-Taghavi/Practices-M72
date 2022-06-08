import {Box} from "@mui/material";

export default function ItemsList() {
    return (
<Box sx={{display:"flex", flexWrap:"wrap", flex:"1", justifyContent:"center", gap:"5rem", padding:"1rem 10rem"}}>
    <Box padding={1} sx={{background:"black"}}>
        <img src="https://via.placeholder.com/150" alt=""/>
    </Box>
    <Box padding={1} sx={{background:"black"}}>
        <img src="https://via.placeholder.com/150" alt=""/>
    </Box>
    <Box padding={1} sx={{background:"black"}}>
        <img src="https://via.placeholder.com/150" alt=""/>
    </Box>
    <Box padding={1} sx={{background:"black"}}>
        <img src="https://via.placeholder.com/150" alt=""/>
    </Box>
    <Box padding={1} sx={{background:"black"}}>
        <img src="https://via.placeholder.com/150" alt=""/>
    </Box>
    <Box padding={1} sx={{background:"black"}}>
        <img src="https://via.placeholder.com/150" alt=""/>
    </Box>
</Box>
            )};