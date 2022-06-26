import {createSlice} from "@reduxjs/toolkit";

const todoSlices = createSlice({
    name: "todos",
    initialState: {
        todos: [],
        targetTodo: null
    },
    reducers: {
        changeTodos: (state, action) =>{
        state.todos = [...state.todos, action.payload]
        },
        editTodo: (state, action)=>{
            state.targetTodo = state.todos.findIndex(item => (item.id === action.payload));
        },
        updateTodo: (state, action) =>{
            state.todos[state.targetTodo].name = action.payload;
        }

    }
})
export const {changeTodos, editTodo, updateTodo} = todoSlices.actions
export default todoSlices.reducer