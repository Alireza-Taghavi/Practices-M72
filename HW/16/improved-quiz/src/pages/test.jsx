import React from "react"
import axios from "axios";

export default function Test() {
    const numberOfQuestions = 15;
    const typesOfQuestions = [{id:12}, {id:13}, {id:14}, {id:17}];

    const divide = numberOfQuestions / typesOfQuestions.length;
    let remaining = numberOfQuestions % typesOfQuestions.length;
    let newArr = [];
    newArr = typesOfQuestions.map(async category => {
        await axios.get(`https://opentdb.com/api.php?amount=${(divide + remaining)}&type=multiple&category=${category.id}`)
            .then(res => {
                return (newArr.push(res.data.results));
            })
        remaining = 0;
    })
    console.log(newArr);
}