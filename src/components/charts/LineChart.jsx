import React from 'react'
import {Line} from "react-chartjs-2"
import {Chart as ChartJS} from "chart.js/auto";

export default function LineChart({data}) {
  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false, // Set this to false to make the chart responsive
    responsive: true, // This enables responsiveness
  };
  return (
    <div className="" >
      <Line data={data} options={options}/>
    </div>
  )
}