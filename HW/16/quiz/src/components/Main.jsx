import * as React from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
export default function Main() {

    const navigate = useNavigate();

    const [category, setCategory] = React.useState([]);
    async function getCategory() {
        const response = await axios.get("https://opentdb.com/api_category.php");
        setCategory(response.data.trivia_categories);
    }

    React.useEffect(() => {
        getCategory();
    }, [])

    console.log(useParams());
    const goTest = () => {
        navigate("/test/1", {state: {category}});

    }

    return (
        <div>
            <h1>Main</h1>
            <button onClick={goTest}>go test</button>
        </div>
    );
}