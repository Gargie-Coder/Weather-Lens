import React, { useState } from "react";
import WeatherChart from "./WeatherChart";
import "../FlipCard.css";

const WeatherFlipCard = ({
  city,
  temperature,
  condition,
  suggestion,
  forecasttemp,
  forecaselabels,
  humidity,
  windSpeed,
  pressure,
  icon,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flip = () => {
    setIsFlipped(!isFlipped);
  };

  let weatherClass = "default";

  if (condition.toLowerCase().includes("clear")) {
    weatherClass = "clear";
  } else if (condition.toLowerCase().includes("cloud")) {
    weatherClass = "clouds";
  } else if (condition.toLowerCase().includes("rain")) {
    weatherClass = "rain";
  } else if (condition.toLowerCase().includes("thunder")) {
    weatherClass = "thunder";
  } else if (condition.toLowerCase().includes("snow")) {
    weatherClass = "snow";
  }

  return (
    <div className="CardContainer" onClick={flip}>
      <div className={`card ${isFlipped ? "flipped" : ""}`}>

        {/* ---------- FRONT ---------- */}
        <div className={`front ${weatherClass}`}>
          <h2 className="title">Today's Weather</h2>

          <img
            className="weatherIcon"
            src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
            alt={condition}
          />

          <h1 className="temperature">
            {Math.round(temperature)}°
          </h1>

          <h2 className="city">{city}</h2>

          <p className="today">
            {new Date().toLocaleDateString()}
          </p>

          <p className="condition">
            {condition
              ? condition.charAt(0).toUpperCase() + condition.slice(1)
              : "Unknown"}
          </p>

          <p className="suggestion">{suggestion}</p>

          <div className="quickStats">
            <div>💧 {humidity}%</div>
            <div>🌬️ {windSpeed} m/s</div>
          </div>

          <small className="hint">
            Click anywhere to flip ↻
          </small>
        </div>

        {/* ---------- BACK ---------- */}
        <div className={`back ${weatherClass}`}>
          <h2>Detailed Forecast</h2>

          <img
            className="weatherIcon"
            src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
            alt={condition}
          />

          <div className="backDetails">
            <div className="detail">
              <span>💧 Humidity</span>
              <span>{humidity}%</span>
            </div>

            <div className="detail">
              <span>🌬 Wind</span>
              <span>{windSpeed} m/s</span>
            </div>

            <div className="detail">
              <span>📈 Pressure</span>
              <span>{pressure} hPa</span>
            </div>

            <div className="detail">
              <span>🌡 Temp</span>
              <span>{Math.round(temperature)}°C</span>
            </div>
          </div>

          <WeatherChart
            temperatures={forecasttemp}
            labels={forecaselabels}
          />
        </div>

      </div>
    </div>
  );
};

export default WeatherFlipCard;