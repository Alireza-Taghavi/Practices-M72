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
            if ((currentQuestionIndex) === quiz.length) {
                navigate("/Result", {});
            }
        }
        , [currentQuestionIndex]);
    useEffect(() => {
            const newAnswers = [];
            newAnswers.push(
                {
                    text: quiz[currentQuestionIndex]?.correct_answer,
                    isCorrect: true
                });
            (quiz[currentQuestionIndex]?.incorrect_answers.map(incorrectAnswer => {
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
        const index = currentQuestionIndex;


        if (answer.isCorrect) {
            addCorrectAnswer();
        }
        if (index < quiz.length - 1) {
            setCurrentQuestionIndex(index + 1);
        }
        else {
         navigate("/Result", {state: {correctAnswer: correctAnswers, quizLength: quiz.length}});

        }
    }
        const [selectedQuestion, setSelectedQuestion] = React.useState({});
        useEffect(() => {
                const newSelectedQuestion = quiz[currentQuestionIndex];
                newSelectedQuestion.question = newSelectedQuestion?.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'");
                setSelectedQuestion(newSelectedQuestion);

            }
            , [quiz, currentQuestionIndex, setSelectedQuestion]);

        return (
            <div
                className="container  bg-secondary-50 flex flex-col justify-center gap-6 rounded items-start py-10 px-8 sm:w-9/12 md:w-96">
                <h3 className="font-semibold"><b>Genre: </b><br/>{selectedQuestion?.category}</h3>
                <h3 className="font-semibold">
                    <b>Question: {currentQuestionIndex + 1}</b><br/>{selectedQuestion?.question}</h3>
                <div className=" gap-2 w-full grid grid-cols-2">
                    {answers?.map(answer => {

                        return (
                            <div
                                className="flex justify-center text-center p-4 items-center bg-primary-600 hover:bg-primary-700 active:bg-secondary-700 text-white rounded font-semi-bold cursor-pointer"
                                onClick={() => {
                                    handleAnswer(answer)
                                }
                                }
                            ><p>{answer.text.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }