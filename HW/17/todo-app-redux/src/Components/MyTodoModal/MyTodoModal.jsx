import React, {useEffect} from "react";
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
    Slider, SliderThumb, Alert
} from "@mui/material";
import styled from "@emotion/styled";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import IconButton from "@mui/material/IconButton";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {useDispatch, useSelector} from "react-redux";
import {addTodo, editTodo} from "../../redux/slices/todoSlices";
import {setView} from "../../redux/slices/modalSlices"
import Snackbar from '@mui/material/Snackbar';



const AirbnbSlider = styled(Slider)(() => ({
    height: '6.7rem !important',
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

const strToNum = (x) => {
    if (x === "high") {
        return 90;
    } else if (x === "mid") {
        return 50;
    } else {
        return 20;
    }
}

export default function MyTodoModal() {
    const {todos, targetedTodo} = useSelector((store) => store.todos)
    const [todo, setTodo] = React.useState({});

    const {isEditing, isViewing} = useSelector((store) => store.modalStates)
    React.useEffect(() => {
        setOpen(isEditing)
    }, [isEditing])


    React.useEffect(() => {
        setTodo(todos[targetedTodo]);
        if (isEditing) {
            setTaskNameValue(todo.name);
            setSliderValue(strToNum(todo.priority));
            setCommentValue(todo.commentValue);
            setStatusValue(todo.status);
            setDateValue(todo.deadline);
        }
    }, [targetedTodo, todos, isEditing])

    const dispatch = useDispatch();


    const [open, setOpen] = React.useState(false);
    const OpenModal = () => {
        setOpen(true);
    };
    const closeModal = () => {
        setOpen(false);
        reset();
    };


    const [sliderValue, setSliderValue] = React.useState(10);
    const handleSliderValue = (event, newValue) => {
        setSliderValue(newValue);
    }

    function emojiSlider(props) {
        const {children, ...other} = props;
        let emoji;
        let animation;
        if (sliderValue > 80) {
            emoji = "🏃🏻‍♂️";
            animation = "shake";
        } else if (sliderValue > 35) {
            emoji = "";
            animation = "clock";
        } else {
            emoji = "";
            animation = "tired";
        }
        return (
            <SliderThumb {...other}>
                {children}
                <Typography className={animation}>{emoji}</Typography>
            </SliderThumb>
        );

    }

    const [sliderColor, setSliderColor] = React.useState("currentColor");
    useEffect(() => {
        let color;
        if (sliderValue > 80) {
            color = "red.main";
        } else if (sliderValue > 45) {
            color = "secondary.main";
        } else {
            color = "secondary.light";
        }
        setSliderColor(color);
    }, [sliderValue]);

    const [taskNameValue, setTaskNameValue] = React.useState("");

    function handleTaskName(event) {
        const input = event.target.value;
        setTaskNameValue(input.charAt(0).toUpperCase() + input.slice(1))

    }

    const [statusValue, setStatusValue] = React.useState("todo");

    function handleStatusValue(event) {
        setStatusValue(event.target.value)
    }

    const [dateValue, setDateValue] = React.useState(null);

    const [commentValue, setCommentValue] = React.useState("");

    function handleComment(event) {
        setCommentValue(event.target.value)
    }

    const [openError, setError] = React.useState(false);
    const [errMsg, setErrMsg] = React.useState("error");

    const reset = () => {
        dispatch(setView(false))
        setSliderValue(10);
        setCommentValue("");
        setDateValue(null);
        setTaskNameValue("");
        setStatusValue("todo");
    }
    React.useEffect(()=>{
        setError(false);
    }, [taskNameValue])

    function handleSubmit() {

        if(taskNameValue.length < 3 ){
            setErrMsg("Task name should be at least 3 letters")
            setError(true);
            return;
        }else if(taskNameValue.length > 15){
            setErrMsg("Maximum Task name is 15 letters")
            setError(true);
            return;
        }
        if(dateValue.toISOString().slice(0, 10).length !== 10){
            setErrMsg("Enter Valid Date")
            setError(true);
            return;
        }

        let priority;
        if (sliderValue > 80) {
            priority = "high";
        } else if (sliderValue > 45) {
            priority = "mid";
        } else {
            priority = "low";
        }

        if (!isEditing) {
            dispatch(addTodo({
                name: taskNameValue, priority, status: statusValue, deadline: dateValue.toISOString().slice(0, 10), commentValue, id: Date.now()
            }))
        } else {
            dispatch(editTodo({
                name: taskNameValue, priority, status: statusValue, deadline: dateValue.toISOString().slice(0, 10), commentValue, id: todo.id
            }))
        }
        closeModal()

    }
    return (
        <>
            <IconButton onClick={OpenModal} sx={{
                width: "32px",
                height: "32px",
                cursor: "pointer",
                color: '#c6c6c6',
                '&:hover': {
                    color: '#fff',
                }
            }}>
                <AddRoundedIcon sx={{
                    fontSize: '2rem',
                }}/>
            </IconButton>

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
                                }}><Typography
                                    variant="h5">{isEditing ? (isViewing ? "View Task" : "Edit Task") : "New Task"}</Typography></Box>
                                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                    <Box sx={{display: "flex", flexDirection: "column", gap: "1.5rem"}}>
                                        <TextField  disabled={isViewing} id="new-task-name-input" label="Task Name"
                                                   variant="outlined" value={taskNameValue} onChange={handleTaskName}/>
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
                                                    aria-labelledby="status-radio-buttons-group-label"
                                                    value={statusValue}
                                                    onChange={handleStatusValue}
                                                    name="radio-buttons-group">
                                                    <FormControlLabel value="todo" control={<Radio/>}
                                                                      label="👊🏻 Todo"/>
                                                    <FormControlLabel value="doing" control={<Radio/>}
                                                                      label="✍🏻 Doing"/>
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
                                                    value={sliderValue}
                                                    onChange={handleSliderValue}
                                                    orientation="vertical"
                                                    disabled={isViewing}
                                                    sx={{
                                                        '& .MuiSlider-track': {
                                                            backgroundColor: sliderColor
                                                        },
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{width: "40%", display: "flex", flexDirection: "column", gap: "1.5rem"}}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                disabled={isViewing}
                                                label="Deadline"
                                                value={dateValue}
                                                inputFormat="yyyy/MM/dd"
                                                onChange={(newValue) => {
                                                    setDateValue(newValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                        <Box>
                                            <TextField
                                                disabled={isViewing}
                                                id="standard-multiline-static"
                                                label="Optional Comment"
                                                multiline
                                                rows={6}
                                                variant="outlined"
                                                value={commentValue}
                                                onChange={handleComment}
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
                                        {isViewing ? null : <Button onClick={closeModal}>Close</Button>}
                                        <Button
                                            onClick={isEditing ? (isViewing ? closeModal : handleSubmit) : handleSubmit}
                                            variant="contained">{isEditing ? (isViewing ? "Ok" : "Update") : "Add"}</Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
            </Modal>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal:"right" }} open={openError} autoHideDuration={6000}>
                <Alert severity="error"  sx={{ width: '100%' }}>
                    {errMsg}
                </Alert>
            </Snackbar>
        </>
    );
}