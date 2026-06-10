import React from 'react'
import {Line} from 'react-chartjs-2'
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeatherChart = ({ temperatures, labels }) => {
  const data = temperatures || [20, 22, 18, 25, 24, 19, 21];
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data,
        borderColor: 'rgb(75, 182, 192)',
        backgroundColor: 'rgba(222, 231, 231, 0.2)',
      }
    ]
  };

  return (
   <div style={{ width: "100%", height: "250px" }}>
  <Line
    data={chartData}
    options={{
      responsive: true,
      maintainAspectRatio: false,
    }}
  />
</div>
  )
}

export default WeatherChart