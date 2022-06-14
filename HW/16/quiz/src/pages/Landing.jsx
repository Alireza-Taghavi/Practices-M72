import * as React from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {
    Button
} from "@material-tailwind/react";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();
export default function Landing() {
    const navigate = useNavigate();
    const goQuestions = () => {
        navigate("/Questions/", {state: {category}});

    }

    const [category, setCategory] = React.useState([]);

    async function getCategory() {
        const response = await axios.get("https://opentdb.com/api_category.php");
        setCategory(response.data.trivia_categories);
    }
    React.useEffect(() => {
        getCategory();

    }, []);

    const inputClasses = "flex items-end gap-4 w-full w-full p-1 border border-gray-300 rounded-lg mb-2 h-10 ";
    const labelClasses = "font-bold text-white-100 text-l";
    return (
        <div className="min-h-full flex items-center bg-white-50 justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div
                className="flex flex-col gap-5 bg-purple-100 text-white-100 rounded w-9-12 sm:w-9/12 md:w-96 drop-shadow-md py-8 px-6">
                <h1 className="flex justify-center items-start font-bold  text-white-100 text-2xl mb-5">
                    Setup Quiz
                </h1>

                <div className="flex flex-col gap-3">
                    <label htmlFor="number-input" className={labelClasses}>Number of Questions</label>
                    <input id="number-input" className={inputClasses} placeholder={10}/>
                    <label htmlFor="category-input" className={labelClasses}>Category</label>
                    <Select closeMenuOnSelect={false}
                            components={animatedComponents}
                            defaultValue={[]}
                            isMulti
                            options={category}/>
                    <label htmlFor="difficulty-input" className={labelClasses}>Difficulty</label>
                    <input id="difficulty-input" className={inputClasses}/>
                </div>
                <Button onClick={goQuestions} className="w-full bg-beige-50 text-black p-2 mt-2 hover:bg-beige-100">Start
                    Quiz</Button>
            </div>
        </div>
    );
}
