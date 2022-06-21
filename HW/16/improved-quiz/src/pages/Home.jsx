import React, {useContext} from "react";
import axios from "axios";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {useNavigate} from "react-router-dom";
import Context from "../context/Context";

const animatedComponents = makeAnimated();
export default function Home() {
    //navigate to questions page
    const navigate = useNavigate();
    const navigateToQuestions = () => {
        navigate("/Questions");
    }


    const [numberOfQuestions, setNumberOfQuestions] = React.useState(10);
    const [category, setCategory] = React.useState([]);
    const difficulty = [{label: "Any Type"}, {label: "Easy"}, {label: "Medium"}, {label: "Hard"}];

    const [categoryValue, setCategoryValue] = React.useState([]);
    const [difficultyValue, setDifficultyValue] = React.useState(difficulty[0].label);

    const handleNumberOfQuestions = (e) => {
        setNumberOfQuestions(e.target.value);

    }
    React.useEffect(() => {
            axios.get("https://opentdb.com/api_category.php")
                .then(res => {
                    const categories = res.data.trivia_categories;
                    categories.forEach(category => {
                        category.value = category.name;
                        category.label = category.name;
                        delete category.name;
                    })
                    setCategory(categories);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        , []);
    const handleCategory = (e) => {
        setCategoryValue(e);
    }
    const handleDifficulty = (e) => {
        setDifficultyValue(e.label);
    }
    const handleSubmit = () => {
        console.log({numberOfQuestions, categoryValue, difficultyValue});
        if (numberOfQuestions < 2 || numberOfQuestions > 50) {
            alert("Please enter a number between 2 and 50");
            return;
        } else if (numberOfQuestions < categoryValue.length) {
            alert("Please enter a number less than or equal to the number of categories");
            return;
        }
        let URL = `https://opentdb.com/api.php?amount=${numberOfQuestions}&type=multiple`;
         if (!!categoryValue.id) {
            URL += `&category=${categoryValue.id}`;
        } else if (categoryValue.length > 1) {
            const nmb = numberOfQuestions;
            const len = categoryValue.length;
            multipleCatgs({nmb, len});
            return;
        }
        if (difficultyValue !== 'Any Type') {
            URL += `&difficulty=${difficultyValue.toLocaleLowerCase()}`;
        }
        fetchQuestions(URL)

    }
    const fetchQuestions = async (URL) => {
        axios.get(URL)
            .then(res => {
                setQuiz(res.data.results);
                navigateToQuestions();

            }).catch(err => {
            console.log(err);
        })
    }
    const multipleCatgs = async ({nmb, len}) => {
        const divide = parseInt(nmb / len);
        let remaining = parseInt(nmb % len);
        let newArr = [];
        let diff = "";
        if (difficultyValue !== "Any Type") {
            diff = `&difficulty=${difficultyValue.toLocaleLowerCase()}`;
        }
        categoryValue.forEach(category => {
            const test = remaining;
            remaining = 0;
            axios.get(`https://opentdb.com/api.php?amount=${(divide) + test}&type=multiple&category=${category.id}` + diff)
    .then(res => {
        newArr = [...newArr, ...res.data.results];
        setQuiz([...newArr]);
        if (newArr.length === numberOfQuestions ){
            navigateToQuestions();
        }
    })
        })
    }

    //shuffle array function
    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex !== 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    const {quiz, setQuiz} = useContext(Context);


    const inputClasses = "flex text-black items-end gap-4 w-full w-full p-1 border border-gray-300 rounded h-10 px-2 focus:outline-none focus:border-blue-500 focus:border-2 focus:shadow-outline-blue";
    const labelClasses = " text-black-100 font-semibold text-l antialiased hover:subpixel-antialiased";
    return (

        <div
            className="flex flex-col gap-4 bg-secondary-50 text-white-100 rounded w-9-12 sm:w-9/12 md:w-96 drop-shadow-md py-8 px-6">
            <h1 className="flex justify-center  items-start font-medium text-slate-900 text-2xl mb-5">
                Setup Quiz
            </h1>
            {console.log(quiz)}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                    <label htmlFor="number-input" className={labelClasses}>Number of Questions</label>
                    <input type="number" min={2} max={50} value={numberOfQuestions} id="number-input"
                           onChange={handleNumberOfQuestions} className={inputClasses} placeholder={10}/>
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="category-input" className={labelClasses}>Category</label>
                    <Select closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            isClearable
                            options={category}
                            onChange={handleCategory}
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="difficulty-input" className={labelClasses}>Difficulty</label>
                    <Select closeMenuOnSelect={true}
                            defaultValue={difficulty[0]}
                            options={difficulty}
                            onChange={handleDifficulty}
                    />
                </div>
            </div>
            <button onClick={handleSubmit}
                    className="w-full mt-5 h-10 px-6 font-semibold bg-primary-700 hover:bg-primary-800 active:bg-primary-600 rounded border border-slate-200 text-white ">Start
                Quiz
            </button>
        </div>
    );
}