import './App.css';
import Main from "./components/Main";
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Test from "./components/Test";
import Context from "./context/Context";
import FormikTest from "./components/FormikTest";

function App() {
const [state, setState] = React.useState(
    ""
);


    return (
        // <Context.Provider value={{state, setState}}>
        //     <Routes>
        //         <Route path="/" element={<Main/>}/>
        //         <Route path="/Test/:id" element={<Test/>}/>
        //     </Routes>
        // </Context.Provider>
        <FormikTest/>
    );
}

export default App;
