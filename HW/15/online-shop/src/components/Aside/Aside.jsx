import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";

export default function Aside() {
    return (
            <Box sx={{
                zIndex: "-1",
                flexShrink: 0,
                width: "350px",
                borderBottom: "1px solid silver",
                height: "60px",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                justifySelf:"center"
            }}>
                <Typography sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    Cart is Empty
                </Typography>
            </Box>
    )
}