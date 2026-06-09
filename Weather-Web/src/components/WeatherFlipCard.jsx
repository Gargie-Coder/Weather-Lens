import React from 'react'
import {useState} from 'react'
import WeatherChart from './WeatherChart'
import '../FlipCard.css'


const WeatherFlipCard = ({city, temperature, condition, suggestion, forecasttemp, forecaselabels, humidity, windSpeed, pressure}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const flip = () => {
    setIsFlipped(!isFlipped);
  };
 
  return (
    <div className="CardContainer" onClick={flip}>
      <div className={`card ${isFlipped ? 'flipped' : ''}`}>
  
      <div className="front">
        <h2>whats the weather like?</h2>
          <p>City: {city}</p>
          <p>Temperature: {temperature}°C</p>
          <p>Condition: {condition}</p>
          <p>Suggestion: {suggestion}</p>
      </div>
      <div className="back">
        <h2>Back of the card</h2>
          <p>Humidity: {humidity}%</p>
          <p>Wind Speed: {windSpeed} m/s</p>
          <p>Pressure: {pressure} hPa</p>
          <WeatherChart temperatures={forecasttemp} labels={forecaselabels} />
      </div>
    </div>
    </div>
  )
}

export default WeatherFlipCard