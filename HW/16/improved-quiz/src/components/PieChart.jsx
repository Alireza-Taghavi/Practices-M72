import React from "react";
import {Doughnut} from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto"

export default function PieChart(props) {
    console.log(props.chartData)
    return(
        <Doughnut data={props.chartData} />

    )
}