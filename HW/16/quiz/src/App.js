import Main from "./components/Main";
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Test from "./components/Test";
import Context from "./context/Context";
import FormikTest from "./components/FormikTest";
import Landing from "./pages/Landing";
import Questions from "./pages/Questions";
import Output from "./pages/Output";

function App() {
    const [state, setState] = React.useState(
        ""
    );


    return (
        <Context.Provider value={{state, setState}}>
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/Questions" element={<Questions/>}/>
                <Route path="/Output" element={<Output/>}/>
            </Routes>
        </Context.Provider>
        // <FormikTest/>
    );
}

export default App;
