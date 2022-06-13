import * as React from "react";
import {useLocation, useParams} from "react-router-dom";

export default function Test() {
    const location = useLocation();
    const category = location.state.category;
    const params = useParams();
    console.log(params);
    return (
        <div>
            <h1>test</h1>
        </div>)
}