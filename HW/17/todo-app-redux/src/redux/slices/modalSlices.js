import {createSlice} from "@reduxjs/toolkit";

const modalSlices = createSlice({
    name: "modalStates",
    initialState: {
        isEditing: false,
        isViewing: false
    },
    reducers: {
        setView: (state, action) =>{
            state.isEditing = action.payload;
            state.isViewing = action.payload;
        },
        setEdit: (state, action)=>{
            state.isEditing = action.payload;
        },
    }
})
export const {setView, setEdit} = modalSlices.actions
export default modalSlices.reducer