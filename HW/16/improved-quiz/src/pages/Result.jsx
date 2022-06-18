import React, {useEffect} from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';
import PieChart from "../components/PieChart";
import {useLocation, useNavigate} from "react-router-dom";


export default function Result() {
    const navigate = useNavigate();

    const [correctAnswers, setCorrectAnswers] = React.useState(0);
    const [totalQuestions, setTotalQuestions] = React.useState(0);
    const [percentage, setPercentage] = React.useState(0);

    const location = useLocation()
    const {correctAnswer, quizLength} = location.state;
    useEffect(() => {
        setCorrectAnswers(correctAnswer);
        setTotalQuestions(quizLength);
        setPercentage(Math.round((correctAnswer / quizLength) * 100));
    }, []);


    const [data, setData] = React.useState({
        labels: ['Correct', 'Incorrect'],
        datasets: [
            {
                label: "Statistics",
                data: [correctAnswer, quizLength - correctAnswer],
                backgroundColor: [
                    '#9f1239',
                    '#fda4af'
                ],
                hoverBackgroundColor: [
                    '#881337',
                    '#dc9099'
                ]

            }]

    });

    return (
        <div
            className="flex flex-col justify-center gap-4 bg-secondary-50 text-white-100 rounded w-9-12 sm:w-9/12 md:w-96 drop-shadow-md py-8 px-6">

            <h1 className="text-center font-extrabold text-2xl">Result</h1>
            <h1 className="text-center font-semibold text-xl">{percentage}%</h1>
            <PieChart chartData={data}/>
            <button onClick={
                () => {
                    navigate("/", {});
                    setCorrectAnswers(0);
                }
            }
                    className="w-full mt-5 h-10 px-6 font-semibold bg-primary-700 hover:bg-primary-800 active:bg-primary-600 rounded border border-slate-200 text-white "
            >Retry
            </button>
        </div>
    );
}