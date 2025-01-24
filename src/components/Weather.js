import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CitySelector from './CitySelector'

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState({ latitude: '52.52', longitude: '13.41' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://api.open-meteo.com/v1/forecast', {
          params: {
            latitude: city.latitude,
            longitude: city.longitude,
            current: 'temperature_2m,wind_speed_10m,relative_humidity_2m',
            hourly: 'temperature_2m,relative_humidity_2m,wind_speed_10m'
          }
        });
        setWeatherData(result.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (city.latitude && city.longitude) { // Ensure coordinates are set before fetching
      fetchData();
    }
  }, [city]); // Dependency array to refetch when city changes

  return (
    <div>
      <h1>Weather Forecast</h1>
      <CitySelector setCity={setCity} />
      {weatherData ? (
        <div>
          <p>Current temperature: {weatherData.current.temperature_2m} °C</p>
          <p>Wind speed: {weatherData.current.wind_speed_10m} km/h</p>
          <p>Humidity: {weatherData.current.relative_humidity_2m}%</p>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default Weather;
