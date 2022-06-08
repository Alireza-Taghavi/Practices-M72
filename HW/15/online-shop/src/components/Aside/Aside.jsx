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
                background:"#203040",
            }}
        >
            <Box sx={{ overflow: 'auto' }}>
                <Typography>
                    Aside
                </Typography>
            </Box>
        </Box>
    )
}