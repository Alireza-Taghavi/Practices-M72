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

export default function Aside(){
    return(
        <Box
            anchor="right"
            sx={{zIndex:"-1",
                height:"auto",
                padding:"10px",
                flexShrink: 0,
            }}
        >
            <Box sx={{ width:"350px", borderBottom:"1px solid silver" }}>
                <Typography>
                    Cart is Empty
                </Typography>
            </Box>
        </Box>
    )
}