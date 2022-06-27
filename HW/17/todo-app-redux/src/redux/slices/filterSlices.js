import {createSlice} from "@reduxjs/toolkit";

const filterSlices = createSlice({
    name: "filterSlices",
    initialState: {
        search: "",
        priorityFilter: "all",
        statusFilter: "all",
        timeFilter:"all"
    },
    reducers: {
        setSearch: (state, action) =>{
            state.search = action.payload;
        },
        setPriorityFilter: (state, action) =>{
            state.priorityFilter = action.payload;
        },
        setStatusFilter: (state, action) =>{
            state.statusFilter = action.payload;
        },
        setTimeFilter: (state, action) =>{
            state.timeFilter = action.payload;
        },

    }
})
export const {setStatusFilter, setSearch, setPriorityFilter, setTimeFilter} = filterSlices.actions
export default filterSlices.reducer