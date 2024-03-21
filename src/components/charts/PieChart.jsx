import React from 'react'
import {Pie} from "react-chartjs-2"
import {Chart as ChartJS} from "chart.js/auto";
export default function PieChart({data}) {
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
    <div className="">
      <Pie data={data} options={options}/>
    </div>
  )
}
