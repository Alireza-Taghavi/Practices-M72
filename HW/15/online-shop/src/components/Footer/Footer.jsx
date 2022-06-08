import {BottomNavigation, Typography} from '@mui/material';

export default function Footer() {
    return (
        <BottomNavigation sx={{width:"100%", zIndex:1 , background:"#203040", display:"flex", justifyContent:"center", alignItems:"center", color:"white"}}>
            <Typography>
                All right is reserved
            </Typography>
        </BottomNavigation>
    )
}