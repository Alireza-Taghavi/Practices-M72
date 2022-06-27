import {configureStore} from "@reduxjs/toolkit";
import todoSlices from "./slices/todoSlices";
import modalSlices from "./slices/modalSlices";
import filterSlices from "./slices/filterSlices";
export default configureStore({
    reducer: {
        todos: todoSlices,
        modalStates: modalSlices,
        filterSlices
    }
})
