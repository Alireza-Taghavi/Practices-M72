import Home from "./pages/Home";
import {Routes, Route} from 'react-router-dom';
import Questions from "./pages/Questions";
import Context from "./context/Context";
import {useEffect, useState} from "react";
import Result from "./pages/Result";

function App() {
    const [quiz, setQuiz] = useState([]);
    useEffect(() => {
        console.log(quiz)
    },[quiz])

    return (
        <div className="min-h-full flex items-center bg-secondary-900 justify-center py-12 px-4 sm:px-2 lg:px-8">
            <Context.Provider value={{quiz, setQuiz}}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/Questions" element={<Questions/>}/>
                    <Route path="/Result" element={<Result/>}/>
                </Routes>
            </Context.Provider>
        </div>

    );
}

export default App;
