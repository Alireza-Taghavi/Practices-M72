import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const drawerWidth = 360;

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

export default function PersistentDrawerRight() {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [priority, setPriority] = React.useState('all');
    const handlePriority = (event) => {
        setPriority(event.target.value);
    };

    const [status, setStatus] = React.useState('all');
    const handleStatus = (event) => {
        setStatus(event.target.value);
    };

    const [time, setTime] = React.useState('all');
    const handleTime = (event) => {
        setTime(event.target.value);
    };
    return (<Box sx={{width: "32px"}}>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerOpen}
                sx={{
                    fontSize: '2rem',
                    cursor: "pointer",
                    color: '#c6c6c6',
                    '&:hover': {
                        color: '#fff',
                    }, ...(open && {display: 'none'})
                }}
            >
                <FilterAltIcon/>
            </IconButton>

            <Drawer
                sx={{
                    borderLeft: "none",
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        borderLeft: "none",
                    },
                }}
                variant="persistent"
                anchor="right"
                open={open}

            >
                <DrawerHeader sx={{
                    height: "73px",
                    display: "flex",
                    flexDirection: "row-reverse",
                    pr: "24px",
                    backgroundColor: "secondary.main",
                }}>
                    <IconButton onClick={handleDrawerClose} sx={{
                        width: "32px",
                        height: "32px",
                        fontSize: '2rem',
                        cursor: "pointer",
                        color: '#c6c6c6',
                        '&:hover': {
                            color: '#fff',
                        }
                    }}>
                        <CloseRoundedIcon/>
                    </IconButton>
                </DrawerHeader>
                <Box sx={{
                    width: "100%",
                    py: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "start",
                    gap:4
                }}>
                    <FormControl sx={{width: "70%"}}>
                        <InputLabel id="priority-select-label">Age</InputLabel>
                        <Select
                            labelId="priority-select-label"
                            id="priority-select"
                            label="Priority"
                            value={priority}
                            onChange={handlePriority}
                        >
                            <MenuItem value={"all"}>All</MenuItem>
                            <MenuItem value={"low"}>Low</MenuItem>
                            <MenuItem value={"medium"}>Medium</MenuItem>
                            <MenuItem value={"high"}>High</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{width: "70%"}}>
                        <InputLabel id="status-select-label">Status</InputLabel>
                        <Select
                            labelId="status-select-label"
                            id="status-select"
                            label="Status"
                            onChange={handleStatus}
                            value={status}
                        >
                            <MenuItem value={"all"}>All</MenuItem>
                            <MenuItem value={"todo"}>Todo</MenuItem>
                            <MenuItem value={"doing"}>Doing</MenuItem>
                            <MenuItem value={"done"}>Done</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{width: "70%"}}>
                        <InputLabel id="time-select-label">Deadline</InputLabel>
                        <Select
                            labelId="time-select-label"
                            id="time-select"
                            label="Deadline"
                            onChange={handleTime}
                            value={time}
                        >
                            <MenuItem value={"all"}>All</MenuItem>
                            <MenuItem value={"overdue"}>Overdue</MenuItem>
                            <MenuItem value={"today"}>Today</MenuItem>
                            <MenuItem value={"future"}>Future</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Drawer>
    </Box>
    );
}
