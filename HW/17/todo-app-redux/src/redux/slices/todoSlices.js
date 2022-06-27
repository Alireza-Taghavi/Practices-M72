import {createSlice} from "@reduxjs/toolkit";

const todoSlices = createSlice({
    name: "todos",
    initialState: {
        todos: []
    },
    reducers: {
        addTodo: (state, action) =>{
        state.todos.push(action.payload)
        },
        // editTodo: (state, action)=>{
        //     state.targetTodo = state.todos.findIndex(item => (item.id === action.payload));
        // },
        // updateTodo: (state, action) =>{
        //     state.todos[state.targetTodo].name = action.payload;
        // }

    }
})
export const {addTodo} = todoSlices.actions
export default todoSlices.reducer