import React from 'react'
import {useState,useEffect} from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard'
import WeatherChart from './components/WeatherChart'
import WeatherFlipCard from './components/WeatherFlipCard'
import clearBg from "./assets/sunnyday.jpg"
import cloudsBg from "./assets/cloud.jpg"
import rainBg from "./assets/Rain.jpg"
import snowBg from "./assets/snow.jpg"
import thunderBg from "./assets/thunder.jpg"

 const App = () => {
  const [city,setCity] = useState("")
  const [temperature,setTemperature] = useState(0)
  const [condition,setCondition] = useState("")
  const [forecasttemp,setForecasttemp] = useState([])
  const [forecaselabels,setForecastlabels] = useState([]) 
  const [humidity,setHumidity] = useState(0)
  const [windSpeed,setWindSpeed] = useState(0)
  const [pressure,setPressure] = useState(0)
  const [icon, setIcon] = useState("01d")
  useEffect(() => {
    console.log("App component mounted");
    // Fetch weather data from API and update state
  }, [])
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
    setHumidity(data.main.humidity);
    setWindSpeed(data.wind.speed);
    setPressure(data.main.pressure);
    setIcon(data.weather[0].icon);
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
    const labels = data.list.map(item =>
  new Date(item.dt_txt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })
);

    setForecasttemp(temps);
    setForecastlabels(labels);
   setIcon(data.weather[0].icon);
    console.log(data.list[0]);
  } catch (error) {
    console.log(error);
  }
}
 const getSuggestion = () => {
  if (temperature > 35)
    return "Stay hydrated 💧";

  if (temperature < 10)
    return "Wear a jacket 🧥";

  if (condition.includes("rain"))
    return "Carry an umbrella ☂️";

  return "Weather looks pleasant today";
}

const getBackgroundImage = () => {
  const c = condition.toLowerCase();

  if (c.includes("clear")) return clearBg;
  if (c.includes("cloud")) return cloudsBg;
  if (c.includes("rain")) return rainBg;
  if (c.includes("snow")) return snowBg;
  if (c.includes("thunder")) return thunderBg;

  return clearBg;
};
  
const handleSearch = () => {
  getWeather();
  getforecast();
}
  return (
   <div className="app"  style={{
    backgroundImage: `url(${getBackgroundImage()})`,
  }}>
    <h1>Weather App</h1>
    <input type="text" placeholder="Enter city name" onChange={(e)=>setCity(e.target.value)} onKeyDown={(e)=>{
      if(e.key==="Enter"){handleSearch();
      }
    }} />
    <button onClick={handleSearch}>Search</button>
  
   <WeatherFlipCard
  city={city}
  temperature={temperature}
  condition={condition}
  suggestion={getSuggestion()}
  icon={icon}
  forecasttemp={forecasttemp}
  forecaselabels={forecaselabels}
  humidity={humidity}
  windSpeed={windSpeed}
  pressure={pressure}
/>
   </div>
   
  )
}
export default App
