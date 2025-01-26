import React, { useState, useEffect } from "react";
import axios from "axios";
import CitySelector from "./CitySelector";
import "../Weather.css"; // Import Weather.css

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState({ latitude: "52.52", longitude: "13.41" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await axios.get("https://api.open-meteo.com/v1/forecast", {
          params: {
            latitude: city.latitude,
            longitude: city.longitude,
            daily: "weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum",
            timezone: "auto",
            start: new Date().toISOString().split("T")[0],
            end: new Date(new Date().setDate(new Date().getDate() + 7))
              .toISOString()
              .split("T")[0],
          },
        });
        setWeatherData(result.data);
        setError("");
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Network error. Please check your connection and try again.");
      } finally {
        setLoading(false);
      }
    };

    if (city.latitude && city.longitude) {
      fetchData();
    }
  }, [city]);

  function getWeatherIcon(code) {
    const iconMap = {
      clear: process.env.PUBLIC_URL + "/animated/day.svg",
      rainy: process.env.PUBLIC_URL + "/animated/rainy.svg",
      cloudy: process.env.PUBLIC_URL + "/animated/cloudy.svg",
      snow: process.env.PUBLIC_URL + "/animated/snowy.svg",
      default: process.env.PUBLIC_URL + "/animated/default-icon.svg",
    };
    return iconMap[code] || iconMap["default"];
  }

  return (
    <div className="pc">
      <h1 className="city-name">Weather Forecast</h1>
      <div className="section">
        <div className="date">{new Date().toLocaleDateString()}</div>
        <button className="button">Change City</button>
      </div>
      <CitySelector setCity={setCity} />
      {loading ? (
        <p className="messages normal-message">Loading...</p>
      ) : error ? (
        <p className="messages error-message">{error}</p>
      ) : weatherData && weatherData.daily && weatherData.daily.time.length > 0 ? (
        <div className="box">
          {weatherData.daily.time.map((date, index) => (
            <div key={index} className="weather-box">
              <div className="name">
                <p className="city-name">{new Date(date).toLocaleDateString()}</p>
                <p className="weather-temp">
                  {weatherData.daily.temperature_2m_max[index]}°C
                </p>
              </div>
              <div className="weather-icon">
                <img
                  src={getWeatherIcon(weatherData.daily.weathercode[index])}
                  alt="Weather Icon"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="messages normal-message">No data available</p>
      )}
      <nav>
        <ul>
          <li>
            <a href="#" className="active">
              Home
            </a>
          </li>
          <li>
            <a href="#">Forecast</a>
          </li>
          <li>
            <a href="#">Settings</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Weather;
