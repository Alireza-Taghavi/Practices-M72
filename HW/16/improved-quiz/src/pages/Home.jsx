import React from "react";
import axios from "axios";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();
export default function Home() {
    const [numberOfQuestions, setNumberOfQuestions] = React.useState(10);
    const [category, setCategory] = React.useState([]);
    const difficulty = [{label: "Any Type"}, {label: "Easy"}, {label: "Medium"}, {label: "Hard"}];

    const [categoryValue, setCategoryValue] = React.useState([]);
    const [difficultyValue, setDifficultyValue] = React.useState(difficulty[0].label);

    const [questions, setQuestions] = React.useState([]);

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
    const handleSubmit = (e) => {
        console.log({numberOfQuestions, categoryValue, difficultyValue});
        if (numberOfQuestions < 2 || numberOfQuestions > 50) {
            alert("Please enter a number between 2 and 50");
            return;
        } else if (numberOfQuestions < categoryValue.length) {
            alert("Please enter a number less than or equal to the number of categories");
            return;
        }
        let URL = `https://opentdb.com/api.php?amount=${numberOfQuestions}&type=multiple`;
        if (categoryValue.length === 1) {
            URL += `&category=${categoryValue[0].id}`;
        } else if (categoryValue.length > 1) {
            const nmb = numberOfQuestions;
            const len = categoryValue.length;
            multipleCatgs({nmb, len});
            return;
        }
        if (difficultyValue !== "Any Type") {
            URL += `&difficulty=${difficultyValue.toLocaleLowerCase()}`;
        }
        fetchQuestions(URL)

    }
    const fetchQuestions = async (URL) => {
        axios.get(URL)
            .then(res => {
                setQuestions(res.data.results);
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
        categoryValue.map(async category => {
            const test = remaining;
            remaining = 0;
            await axios.get(`https://opentdb.com/api.php?amount=${(divide) + test}&type=multiple&category=${category.id}` + diff)
                .then(res => {
                    res.data.results.forEach(question => {
                        newArr.push(question);
                    })
                }).catch(err => {
                    console.log(err);
                })
        })

        const shuffled = await shuffle(newArr);
        await setQuestions(shuffled);
    }

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

    const inputClasses = "flex text-black items-end gap-4 w-full w-full p-1 border border-gray-300 rounded-lg mb-2 h-10 ";
    const labelClasses = "font-bold text-black-100 text-l";
    return (
        <div className="min-h-full flex items-center bg-white-50 justify-center py-12 px-4 sm:px-2 lg:px-8">
            <div
                className="flex flex-col gap-5 bg-purple-100 text-white-100 rounded w-9-12 sm:w-9/12 md:w-96 drop-shadow-md py-8 px-6">
                <h1 className="flex justify-center items-start font-bold  text-white-100 text-2xl mb-5">
                    Setup Quiz
                </h1>

                <div className="flex flex-col gap-3">
                    <label htmlFor="number-input" className={labelClasses}>Number of Questions</label>
                    <input type="number" min={2} max={50} value={numberOfQuestions} id="number-input"
                           onChange={handleNumberOfQuestions} className={inputClasses} placeholder={10}/>
                    <label htmlFor="category-input" className={labelClasses}>Category</label>
                    <Select closeMenuOnSelect={false}
                            components={animatedComponents}
                            defaultValue={[]}
                            isMulti
                            options={category}
                            onChange={handleCategory}
                    />
                    <label htmlFor="difficulty-input" className={labelClasses}>Difficulty</label>
                    <Select closeMenuOnSelect={true}
                            defaultValue={difficulty[0]}
                            options={difficulty}
                            onChange={handleDifficulty}
                    />
                </div>
                <button onClick={handleSubmit}
                        className="w-full bg-green-500 text-black p-2 mt-2 hover:bg-beige-100">Start
                    Quiz
                </button>
            </div>
        </div>)
}