import React from 'react'


const WeatherCard = (props) => {
  
  return (
    <div className="weather-card">
    <h2>City:</h2>
    <p>{props.city}</p>
    <h2>Temperature:</h2>
    <p>{props.temperature}</p>
    <h2>Condition:</h2>
    <p>{props.condition}</p>
    </div>
    

  )
}

export default WeatherCard