import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header() {
    return (
        <AppBar position="fixed" sx={{background:"#203040", zIndex: 99 }}>
            <Toolbar sx={{paddingLeft:"10px !important"}}>
                <Typography variant="h7" color="inherit" fontSize={17}>
                    React Shopping Cart
                </Typography>
            </Toolbar>
        </AppBar>
    )
}