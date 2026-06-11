import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const WeatherChart = ({ temperatures, labels }) => {
  // ── Show only every 3rd entry = 8 points (every 9 hours) ──────
  const step = 3;
  const slicedTemps  = temperatures.filter((_, i) => i % step === 0).slice(0, 8);
  const slicedLabels = labels.filter((_, i) => i % step === 0).slice(0, 8);

  const data = {
    labels: slicedLabels,
    datasets: [
      {
        label: "Temp (°C)",
        data: slicedTemps,
        fill: true,
        tension: 0.4,
        borderColor: "rgba(255, 255, 255, 0.9)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(255, 255, 255, 1)",
        pointBorderColor: "rgba(255,255,255,0.3)",
        pointRadius: 5,
        pointHoverRadius: 7,
        backgroundColor: "rgba(255, 255, 255, 0.12)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.8,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "rgba(255,255,255,0.85)",
          font: { size: 12 },
          boxWidth: 12,
          padding: 16,
        },
      },
      tooltip: {
        backgroundColor: "rgba(10, 20, 50, 0.85)",
        titleColor: "#fff",
        bodyColor: "rgba(255,255,255,0.8)",
        borderColor: "rgba(255,255,255,0.15)",
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: (ctx) => ` ${ctx.parsed.y.toFixed(1)}°C`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "rgba(255,255,255,0.75)",
          font: { size: 11 },
          maxRotation: 0,        // keep labels horizontal
          minRotation: 0,
          autoSkip: false,       // we already sliced, show all
        },
        grid: {
          color: "rgba(255,255,255,0.08)",
          drawBorder: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "rgba(255,255,255,0.75)",
          font: { size: 11 },
          padding: 8,
          callback: (val) => `${val}°`,
        },
        grid: {
          color: "rgba(255,255,255,0.08)",
          drawBorder: false,
        },
        border: {
          display: false,
        },
      },
    },
  };

  if (!temperatures || temperatures.length === 0) {
    return (
      <p style={{ color: "rgba(255,255,255,0.5)", textAlign: "center" }}>
        No forecast data
      </p>
    );
  }

  return (
    <div style={{
      width: "100%",
      background: "rgba(0,0,0,0.15)",
      borderRadius: "16px",
      padding: "16px",
      marginTop: "8px",
      boxSizing: "border-box",
    }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default WeatherChart;