import React from 'react'
import {useState} from 'react'
import WeatherChart from './WeatherChart'
import '../FlipCard.css'


const WeatherFlipCard = ({city, temperature, condition, suggestion, forecasttemp, forecaselabels, humidity, windSpeed, pressure, icon}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const flip = () => {
    setIsFlipped(!isFlipped);
  };
  let weatherClass = "";

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
} else {
  weatherClass = "default";
}
  
 
  return (
    <div className="CardContainer" onClick={flip}>
      <div className={`card ${isFlipped ? 'flipped' : ''}`}>
  
      <div className={`front ${weatherClass}`}>
  <h2 className="title">What's the weather like?</h2>
   
  <img
    className="weatherIcon"
    src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
    alt={condition}
  />

  <h1 className="temperature">{temperature}°C</h1>

  <h2 className="city">{city}</h2>

<p className="condition">
  {condition.charAt(0).toUpperCase() + condition.slice(1)}
</p>

  <p className="suggestion">{suggestion}</p>
  <div className="quickStats">
  <div>💧 {humidity}%</div>
  <div>🌬️ {windSpeed} m/s</div>
</div>

  <small className="hint">Click to flip ↻</small>
</div>
      <div className={`back ${weatherClass}`}>
        <h2>Wanna know more?</h2>
         <img
          className="weatherIcon"
          src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
          alt={condition}
        />
      <div className="detail">
                  <span>💧 Humidity:</span>
                  <span>{humidity}%</span>
                </div>

                <div className="detail">
                  <span>🌬️ Wind:</span>
                  <span>{windSpeed} m/s</span>
                </div>

                <div className="detail">
                  <span>📈 Pressure:</span>
                  <span>{pressure} hPa</span>
      </div>
          <WeatherChart temperatures={forecasttemp} labels={forecaselabels} />
      </div>
    </div>
    </div>
  )
}

export default WeatherFlipCard