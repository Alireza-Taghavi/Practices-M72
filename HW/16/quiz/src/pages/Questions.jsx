import * as React from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


export default function Questions() {

    const navigate = useNavigate();
    const navigateOutput = () => {
        navigate("/Output/", {});

    }
    return (
        <div>
            <h1 className="text-secondary-100">Questions</h1>
            <button className="text-secondary-100" onClick={navigateOutput}>go output</button>
        </div>)
}