# 🌤️ Weather Lens

An interactive weather application built with **React** that displays real-time weather information and forecasts using the **OpenWeatherMap API**.

## ✨ Features

- 🔍 Search weather by city name
- 📍 Detect and fetch weather for the user's current location using Geolocation
- 🌡️ Display current temperature and weather conditions
- 🪪 Interactive **flip card** interface
  - **Front:** Weather summary, icon, quick stats, and suggestions
  - **Back:** Humidity, wind speed, pressure, and forecast chart
- 📈 Visualize forecast temperatures with **Chart.js**
- 🎨 Dynamic themes based on weather conditions
- ⌨️ Search via button click or **Enter** key
- 📱 Responsive UI with glassmorphism-inspired styling

## 🛠️ Tech Stack

- React
- JavaScript (ES6)
- Vite
- CSS3
- Chart.js (`react-chartjs-2`)
- OpenWeatherMap API
- Browser Geolocation API

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/weather-flip-card.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:

   ```env
   VITE_WEATHER_API_KEY=your_openweathermap_api_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## 📚 What I Learned

- Managing state with React hooks (`useState`, `useEffect`)
- Fetching and processing asynchronous API data
- Passing data between components using props
- Building reusable UI components
- Creating flip-card animations with CSS
- Visualizing data with Chart.js
- Using the Browser Geolocation API to access the user's current location
- Applying conditional styling based on weather conditions

## 🔮 Future Improvements

- 7-day forecast
- Air quality and UV index
- Temperature unit toggle (°C/°F)
- Search history and favorite locations
- Electron desktop packaging
- Progressive Web App (PWA) support

---

Built to explore React, API integration, data visualization, and modern UI design through a practical weather application.
