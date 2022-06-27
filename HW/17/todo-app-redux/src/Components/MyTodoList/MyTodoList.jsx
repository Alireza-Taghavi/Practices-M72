import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import {visuallyHidden} from '@mui/utils';
import {Tooltip, Typography} from "@mui/material";
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import {useDispatch, useSelector} from "react-redux";
import {setTodo, deleteTodo} from "../../redux/slices/todoSlices";
import {setEdit, setView} from "../../redux/slices/modalSlices";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Task',
    },
    {
        id: 'priority',
        numeric: false,
        disablePadding: false,
        label: 'Priority',
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'Status',
    },
    {
        id: 'deadline',
        numeric: false,
        disablePadding: false,
        label: 'Deadline',
    },
];

function EnhancedTableHead(props) {
    const {order, orderBy, onRequestSort} =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>

                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={"center"}
                        padding={'normal'}
                        sortDirection={order}
                        sx={{
                            width: "20%", backgroundColor: "secondary.main", color: "white", '& .MuiSvgIcon-root': {
                                fontSize: "1.4rem", stroke: "white", fill: "white"
                            }, '& .Mui-active': {color: "white !important"}, '&:hover': {
                                color: "gray.main !important"
                            }
                        }}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            sx={{fontWeight: "bolder", fontSize: "1.1rem", position: "relative", left: "16px",}}
                        >
                            <Typography> {headCell.label}</Typography>
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={{...visuallyHidden}}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell key="actions" align={"center"}
                           padding={'normal'}
                           sx={{
                               width: "25%", backgroundColor: "secondary.main", color: "white", '& .MuiSvgIcon-root': {
                                   fontSize: "1.4rem", stroke: "white", fill: "white"
                               }, '& .Mui-active': {color: "white"}
                           }}
                >
                    <Typography>Actions</Typography>
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function setColor(value) {
    switch (value) {
        case "high":
            return "#D32F2F"
        case "mid":
            return "#ed6c02"
        case "low":
            return "gray.main"
        default:
            return "paper"
    }
}

const tableCellStyle = (value) => {
    return ({
        backgroundColor: setColor(value),
        width: "3rem",
        height: "1.5rem",
        borderRadius: 1,
        color: "white",
    })
}
export default function MyTodoList() {
    const {todos} = useSelector((store) => store.todos)
    const {search, priorityFilter, statusFilter, timeFilter} = useSelector((store) => store.filterSlices)
    const dispatch = useDispatch();
    const [rows, setRows] = React.useState([]);
    React.useEffect(() => {
        let newTodos = [...todos].filter(todo => (todo.name).includes(search))
        if(priorityFilter !== "all"){
            newTodos = [...newTodos].filter(todo => (todo.priority) === (priorityFilter))
        }
        if(statusFilter !== "all"){
            newTodos = [...newTodos].filter(todo => (todo.status) === (statusFilter))
        }
        const currentTime = Date.now()
        if(timeFilter === "overdue"){
                newTodos = [...newTodos].filter(todo => (todo.id) > currentTime)
        }else if(timeFilter === "future"){
            newTodos = [...newTodos].filter(todo => ((todo.id) < (currentTime + 43200000)) && ((todo.id) > (currentTime - 43200000)))
        }else{
            newTodos = [...newTodos].filter(todo => (todo.id) < currentTime)
        }

        setRows([...newTodos])
    }, [todos, search, priorityFilter, statusFilter, timeFilter])


    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [selected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleEdit = (event, id) => {
        dispatch(setEdit(true))
        dispatch(setTodo(id))
    }
    const handleView = (event, id) => {
        dispatch(setView(true))
        dispatch(setTodo(id))
    }
    const handleDelete = (event, id) => {
        // let target = event.target
        // while(target.tagName !== "svg"){
        //     target = target.parentElement;
        // }
        // target.style.display = "none"
        // setTimeout(changeDelete(target), 0)
        dispatch(deleteTodo(id))
    }
    // const changeDelete = (target) => {
    //     setTimeout(()=>{target.child.style.display = "flex"}, 5000)
    // }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%', mb: 2, borderRadius: "60px 60px 10px 10px"}}>
                <TableContainer>
                    <Table
                        sx={{minWidth: 750}}
                        aria-labelledby="tableTitle"
                        size='medium'
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            onSelectAllClick={() => {
                            }}/>
                        <TableBody>
                            {rows.sort(getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.name}
                                        >

                                            <TableCell
                                                component="th"
                                                scope="row"
                                                padding="normal"
                                                align={"left"}
                                                sx={{fontWeight: "bold", textTransform: "capitalize"}}
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell sx={{
                                                fontWeight: "bold",
                                                textTransform: "capitalize"
                                            }} align="center"><Box sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                width: "100%",
                                                height: "100%"
                                            }}> <Typography
                                                sx={tableCellStyle(row.priority)}>{row.priority}</Typography></Box></TableCell>
                                            <TableCell sx={{fontWeight: "bold", textTransform: "capitalize"}}
                                                       align="center">{row.status}</TableCell>
                                            <TableCell sx={{fontWeight: "bold"}}
                                                       align="center">{row.deadline.replaceAll("-", "/")}</TableCell>
                                            <TableCell align="left">
                                                <Box sx={{
                                                    display: "flex",
                                                    flexGrow: "1",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    pl: "10%"
                                                }}>
                                                    <Tooltip placement="top" title="View" arrow>
                                                        <IconButton onClick={(event) => handleView(event, row.id)}>
                                                            <RemoveRedEyeRoundedIcon/>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip placement="top" title="Edit" arrow>
                                                        <IconButton color="warning"
                                                                    onClick={(event) => handleEdit(event, row.id)}
                                                        >
                                                            <EditRoundedIcon/>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip placement="top" title="Delete" arrow>
                                                        <IconButton color="error"
                                                                    onClick={(event) => handleDelete(event, row.id)}
                                                        >
                                                            <DeleteRoundedIcon/>
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
