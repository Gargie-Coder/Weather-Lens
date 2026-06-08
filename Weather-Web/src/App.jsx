import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard'
import WeatherChart from './components/WeatherChart'

 const App = () => {
  useEffect(() => {
    console.log("App component mounted");
    // Fetch weather data from API and update state
  }, [])

  const [city,setCity] = useState("")
  const [temperature,setTemperature] = useState(0)
  const [condition,setCondition] = useState("")
  const [forecasttemp,setForecasttemp] = useState([])
  const [forecaselabels,setForecastlabels] = useState([]) 
 const getWeather = async () => {
  if(!city){alert("Please enter a city name");return;}
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
    );

    const data = await response.json();
    if (data.cod !== 200){
      alert("City not found");
      return;
    }
    setTemperature(data.main.temp);
    setCondition(data.weather[0].description);
  
  } catch (error) {
    console.log(error);
  }
};
const getforecast = async () => {
  if(!city){alert("Please enter a city name");return;}
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
    );
    const data = await response.json();
    const temps=data.list.map(item=>item.main.temp);
    const labels=data.list.map(item=>item.dt_txt);
    setForecasttemp(temps);
    setForecastlabels(labels);
    console.log(data.list[0]);
  } catch (error) {
    console.log(error);
  }
}
  
const handleSearch = () => {
  getWeather();
  getforecast();
}
  return (
   <div className="app">
    <h1>Weather App</h1>
    <input type="text" placeholder="Enter city name" onChange={(e)=>setCity(e.target.value)} onKeyDown={(e)=>{
      if(e.key==="Enter"){handleSearch();
      }
    }} />
    <button onClick={handleSearch}>Search</button>
  
    <WeatherCard city={city} temperature={temperature} condition={condition} />
    <WeatherChart temperatures={forecasttemp} labels={forecaselabels} />
   </div>
   
  )
}
export default App
