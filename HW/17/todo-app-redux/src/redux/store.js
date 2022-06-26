import {configureStore} from "@reduxjs/toolkit";
import todoSlices from "./slices/todoSlices";
export default configureStore({
    reducer: {
        todos: todoSlices,
        
    }
})
