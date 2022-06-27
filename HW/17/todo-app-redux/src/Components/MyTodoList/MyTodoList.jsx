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
import {Typography} from "@mui/material";
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

function createData(name, priority, status, deadline) {
    return {
        name,
        priority,
        status,
        deadline,
    };
}

let rows = [
    createData('do stuff', "high", "doing", "2022-12-09"),
    createData('Donut', "low", "doing", "2022-12-09"),
    createData('Eclair', "mid", "todo", "2022-12-09"),
    createData('Frozen yoghurt', "high", "doing", "2022-02-09"),
    createData('Gingerbread', "low", "todo", "2022-12-09"),
    createData('Honeycomb', "low", "done", "2022-01-09"),
    createData('Ice cream sandwich', "low", "todo", "2022-12-09"),
    createData('Jelly Bean', "mid", "done", "2022-12-09"),
];

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
    const dispatch = useDispatch();


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

    const handleClick = (event, name) => {
        console.log(name)

    };

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
                         onSelectAllClick={()=>{}}/>
                        <TableBody>
                            {console.log(rows.sort(getComparator(order, orderBy)))}
                            {console.log(todos.sort(getComparator(order, orderBy)))}

                            {rows.sort(getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.name)}
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
                                                    justifyContent: "center"
                                                }}>
                                                    <IconButton>
                                                        <RemoveRedEyeRoundedIcon/>
                                                    </IconButton>
                                                    <IconButton color="warning">
                                                        <EditRoundedIcon/>
                                                    </IconButton>
                                                    <IconButton color="error">
                                                        <DeleteRoundedIcon/>
                                                    </IconButton>
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
