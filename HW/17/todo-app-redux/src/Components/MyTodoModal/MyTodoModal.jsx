import React from "react";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Modal,
    RadioGroup,
    TextField,
    Radio,
    Typography,
    Slider, SliderThumb
} from "@mui/material";
import styled from "@emotion/styled";
import DateInput from "../DateInput/DateInput"

const AirbnbSlider = styled(Slider)(({theme}) => ({
    height: '6.7rem !important',
    // padding: '13px 0',
    '& .MuiSlider-thumb': {
        height: 27,
        width: 27,
        backgroundColor: '#fff',
        border: '1px solid currentColor',
        '& .airbnb-bar': {
            height: 9,
            width: 1,
            backgroundColor: 'currentColor',
            marginLeft: 1,
            marginRight: 1,
        },
    },
    '& .MuiSlider-track': {
        height: 3,
    },
    '& .MuiSlider-rail': {
        height: "6.7rem"
    },
}));

function emojiSlider(props) {
    const {children, ...other} = props;
    return (
        <SliderThumb {...other}>
            {children}
            <Typography>😴</Typography>
        </SliderThumb>
    );

}

const modalBox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 3

}
const modalInsider = {display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center"};

export default function MyTodoModal() {
    const [open, setOpen] = React.useState(false);
    const OpenModal = () => {
        setOpen(true);
    };
    const closeModal = () => {
        setOpen(false);
        reset();
    };

    const reset = () => {
        setViewing(false);
        setEditing(false);
    }

    const [isEditing, setEditing] = React.useState(false);

    const [isViewing, setViewing] = React.useState(false);

    return (
        <>
            <Button sx={{color: "white"}} onClick={OpenModal}>Open</Button>
            <Modal
                open={open}
                onClose={closeModal}
                sx={{width: "100%", height: "100%"}}
            >
                <Box sx={{...modalBox, width: "200"}}>
                    <Box sx={modalInsider}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1.5rem"
                        }}>
                            <Box sx={{
                                borderBottom: "1px solid rgba(0, 0, 0, 0.4)",
                                width: "100%",
                                pb: "0.6rem",
                            }}><Typography variant="h5">{isEditing ? (isViewing ? "View Task" : "Edit Task") : "New Task"}</Typography></Box>
                            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                <Box sx={{display: "flex", flexDirection: "column", gap: "1.5rem"}}>
                                    <TextField disabled={isViewing} id="new-task-name-input" label="Task Name" variant="outlined"/>
                                    <Box sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "start",
                                        justifyContent: "space-between",
                                        gap: "2rem"
                                    }}>

                                        <FormControl disabled={isViewing}>
                                            <FormLabel sx={{mb: 2}}
                                                       id="demo-radio-buttons-group-label">Status</FormLabel>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue="todo"
                                                name="radio-buttons-group">
                                                <FormControlLabel value="todo" control={<Radio/>} label="👊🏻 Todo"/>
                                                <FormControlLabel value="doing" control={<Radio/>} label="✍🏻 Doing"/>
                                                <FormControlLabel value="done" control={<Radio/>} label="😎 Done"/>
                                            </RadioGroup>
                                        </FormControl>
                                        <Box sx={{
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            gap: 3
                                        }}>
                                            <Typography sx={{color: "rgba(0, 0, 0, 0.6)"}}>Priority</Typography>
                                            <AirbnbSlider
                                                components={{Thumb: emojiSlider}}
                                                min={0}
                                                max={100}
                                                defaultValue={10}
                                                orientation="vertical"
                                                disabled={isViewing}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{width: "40%", display: "flex", flexDirection: "column", gap: "1.5rem"}}>
                                    <DateInput disabled={isViewing} />
                                    <Box>
                                        <TextField
                                            disabled={isViewing}
                                            id="standard-multiline-static"
                                            label="Optional Comment"
                                            multiline
                                            rows={6}
                                            variant="outlined"
                                        />
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{
                                borderTop: "1px solid rgba(0, 0, 0, 0.4)", width: "100%",
                                pt: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center"
                            }}>
                                <Typography sx={{opacity: "0.3"}}>*You are not going to do it anyway</Typography>
                                <Box sx={{display: "flex", gap: 1}}>
                                    {isViewing ? null : <Button onClick={closeModal}>Cancel</Button>}
                                    <Button variant="contained">{isEditing ? (isViewing ? "Ok" : "Update") : "Add"}</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>

            </Modal>
        </>
    );
}