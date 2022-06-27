import {createSlice} from "@reduxjs/toolkit";

const todoSlices = createSlice({
    name: "todos",
    initialState: {
        todos: [{name: "test", priority:"high", status:"todo", deadline:"2022-12-12", id:Date.now()}],
        targetedTodo: 0
    },
    reducers: {
        addTodo: (state, action) =>{
        state.todos.push(action.payload)
        },
        setTodo: (state, action)=>{
            state.targetedTodo = state.todos.findIndex(item => (item.id === action.payload));
        },
        editTodo: (state, action) =>{
            state.todos[state.targetedTodo] = action.payload;
        },
        deleteTodo: (state, action) =>{
            state.todos.splice(state.targetedTodo , 1)
        }
    }
})
export const {addTodo, setTodo, editTodo, deleteTodo} = todoSlices.actions
export default todoSlices.reducer