import React from 'react'
import {useState, useEffect} from 'react'
import './App.css'
import WeatherFlipCard from './components/WeatherFlipCard'

const App = () => {
  const [city, setCity] = useState("")
  const [temperature, setTemperature] = useState(0)
  const [condition, setCondition] = useState("")
  const [forecasttemp, setForecasttemp] = useState([])
  const [forecaselabels, setForecastlabels] = useState([])
  const [humidity, setHumidity] = useState(0)
  const [windSpeed, setWindSpeed] = useState(0)
  const [pressure, setPressure] = useState(0)
  const [icon, setIcon] = useState("01d")
  const [loading, setLoading] = useState(true)   // add this

  // ── Fetch by city name (existing) ──────────────────────────────
  const getWeather = async (cityName) => {
    const target = cityName || city
    if (!target) { alert("Please enter a city name"); return }
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${target}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
      )
      const data = await response.json()
      if (data.cod !== 200) { alert("City not found"); return }
      setTemperature(data.main.temp)
      setCondition(data.weather[0].description)
      setHumidity(data.main.humidity)
      setWindSpeed(data.wind.speed)
      setPressure(data.main.pressure)
      setIcon(data.weather[0].icon)
      setCity(data.name)          // sets the proper city name in input too
    } catch (error) {
      console.log(error)
    }
  }

  // ── Fetch by coords (new) ──────────────────────────────────────
  const getWeatherByCoords = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
      )
      const data = await response.json()
      setTemperature(data.main.temp)
      setCondition(data.weather[0].description)
      setHumidity(data.main.humidity)
      setWindSpeed(data.wind.speed)
      setPressure(data.main.pressure)
      setIcon(data.weather[0].icon)
      setCity(data.name)          // fills the input with detected city name

      // also fetch forecast for the detected city
      await getForecastByCoords(lat, lon)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  // ── Forecast by coords (new) ───────────────────────────────────
  const getForecastByCoords = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
      )
      const data = await response.json()
      const temps = data.list.map(item => item.main.temp)
      const labels = data.list.map(item =>
        new Date(item.dt_txt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      )
      setForecasttemp(temps)
      setForecastlabels(labels)
    } catch (error) {
      console.log(error)
    }
  }

  const getforecast = async () => {
    if (!city) { alert("Please enter a city name"); return }
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
      )
      const data = await response.json()
      const temps = data.list.map(item => item.main.temp)
      const labels = data.list.map(item =>
        new Date(item.dt_txt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      )
      setForecasttemp(temps)
      setForecastlabels(labels)
    } catch (error) {
      console.log(error)
    }
  }

  // ── Auto-detect location on mount ─────────────────────────────
  useEffect(() => {
    if (!navigator.geolocation) {
      // browser doesn't support geolocation, just stop loading
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        getWeatherByCoords(latitude, longitude)
      },
      (error) => {
        // user denied or error — just stop loading silently
        console.log("Geolocation denied:", error.message)
        setLoading(false)
      },
      { timeout: 8000 }
    )
  }, [])

  const getSuggestion = () => {
    if (temperature > 35) return "Stay hydrated 💧"
    if (temperature < 10) return "Wear a jacket 🧥"
    if (condition.includes("rain")) return "Carry an umbrella ☂️"
    return "Weather looks pleasant today"
  }

  const getBackgroundClass = () => {
    const c = condition.toLowerCase()
    if (c.includes("clear")) return "clear"
    if (c.includes("cloud")) return "clouds"
    if (c.includes("rain")) return "rain"
    if (c.includes("snow")) return "snow"
    if (c.includes("thunder")) return "thunder"
    return "default"
  }

  const handleSearch = () => {
    getWeather()
    getforecast()
  }

  const appClass = `app ${getBackgroundClass()}`

  return (
    <div className={appClass}>
      <h1 className="appTitle">🌤 Weather Lens</h1>
      <p className="subtitle">
        Search any city and flip the card for detailed insights.
      </p>

      <div className="searchBar">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch()
          }}
          autoComplete="off"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Loading state while fetching location */}
      {loading ? (
        <div className="loadingCard">
          <p>📍 Detecting your location...</p>
        </div>
      ) : (
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
      )}
    </div>
  )
}

export default App