import React, {useContext, useEffect} from "react";
import Context from "../context/Context";
import {useNavigate} from "react-router-dom";

export default function Questions() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [answers, setAnswers] = React.useState([]);
    const [correctAnswers, setCorrectAnswers] = React.useState(0);

    const {quiz, setQuiz} = useContext(Context);

    const navigate = useNavigate();
    useEffect(() => {
            if (quiz.length > 1) {
                setCurrentQuestionIndex(0);
                setAnswers([]);
            } else (
                navigate("/", {})
            )
        }
        , [quiz]);

    useEffect(() => {
            if ((currentQuestionIndex +1 ) === quiz.length) {
                navigate("/", {});
            console.log(correctAnswers);
            }
        }
        , [currentQuestionIndex, quiz, navigate]);
    useEffect(() => {
            const newAnswers = [];
            newAnswers.push(
                {
                    text: quiz[currentQuestionIndex].correct_answer,
                    isCorrect: true
                });
            (quiz[currentQuestionIndex].incorrect_answers.map(incorrectAnswer => {
                newAnswers.push({
                    text: incorrectAnswer,
                    isCorrect: false
                })
            }));
            newAnswers.sort(() => Math.random() - 0.5);
            setAnswers(newAnswers);
        }
        , [quiz, currentQuestionIndex]);

    function addCorrectAnswer() {
        setCorrectAnswers(correctAnswers + 1);
    }

    function handleAnswer(answer) {
        if (answer.isCorrect) {
            addCorrectAnswer();
        }
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    return (
        <div className="container flex flex-col justify-center items-start gap-4">
            {console.log(quiz)}
            {console.log(currentQuestionIndex)}
            {console.log(quiz[currentQuestionIndex])}
            <h1 className="text-secondary-100">Questions</h1>
            <p>{currentQuestionIndex + 1 }</p>
            <h3>{quiz[currentQuestionIndex].category}</h3>
            <h3>{quiz[currentQuestionIndex].question}</h3>
            <div className="flex flex-row gap-4">
                {console.log(answers)}
                {answers.map(answer => {
                    return (
                        <div  className="flex justify-center items-center">
                            <button className="text-black-100 text-l" onClick={() => {
                                handleAnswer(answer)
                            }
                            }>{answer.text}</button>
                        </div>
                    )
                })}
            </div>
        </div>
            );
            }