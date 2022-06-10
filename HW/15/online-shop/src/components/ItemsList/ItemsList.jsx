import {Box, Typography} from "@mui/material";

export default function ItemsList() {
    return (

        <Box sx={{display: "flex", flexDirection: "column", width:"980px", alignItems:"center"}}>
            <Box sx={{
                display: "flex", flexDirection: "row", justifyContent: "space-between", bgcolor: 'background.paper',
                height: "60px",
                borderBottom: "1px solid silver",
                width:"95%",
                alignItems: "center"

            }}>
                <Typography>6 Products</Typography>
            </Box>
            <Box sx={{
                display: "flex",
                flexWrap: "wrap",
                flex: "1",
                justifyContent: "center",
                gap: "5rem",
                padding: "1rem 10rem"
            }}>

            </Box>
        </Box>

    )
};