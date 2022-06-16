import React, {useContext, useEffect} from "react";
import Context from "../context/Context";

export default function Questions() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [answers, setAnswers] = React.useState([]);
    const [correctAnswer, setCorrectAnswer] = React.useState(0);
    const [currentAnswer, setCurrentAnswer] = React.useState(null);

    const {quiz, setQuiz} = useContext(Context);

    useEffect(() => {
        if (quiz.length > 0) {
            setCurrentQuestionIndex(0);
            setAnswers([]);
            setCorrectAnswer(0);
            setCurrentAnswer(null);
        }
    }
    , [quiz]);



    return (
        <div className="container flex flex-col justify-center items-start gap-4">
            {console.log(quiz)}
            <h3>{quiz[currentQuestionIndex].category}</h3>
            <h3>{quiz[currentQuestionIndex].question}</h3>

        </div>
    );
}