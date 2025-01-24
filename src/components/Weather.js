import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude: '52.52',  // Example latitude
          longitude: '13.41', // Example longitude
          current: 'temperature_2m,wind_speed_10m',
          hourly: 'temperature_2m,relative_humidity_2m,wind_speed_10m'
        }
      });
      setWeatherData(result.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Weather Forecast</h1>
      {weatherData ? (
        <div>
          <p>Current temperature: {weatherData.current.temperature_2m} °C</p>
          <p>Wind speed: {weatherData.current.wind_speed_10m} km/h</p>
          <p>Humidity: {weatherData.current.relative_humidity_2m}%</p>
          <p>Cloud cover: {weatherData.current.cloud_cover_100m}%</p>
          <p>Precipitation: {weatherData.current.precipitation_sum} mm</p>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}
export default Weather;
