import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CitySelector from './CitySelector';

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
            daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum',
            timezone: 'auto', // Automatski određuje vremensku zonu
            start: new Date().toISOString().split('T')[0], // Početak od danas
            end: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0] // Kraj za 7 dana
          }
        });
        setWeatherData(result.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (city.latitude && city.longitude) {
      fetchData();
    }
  }, [city]);

  return (
    <div className="container mt-3">
      <h1 className="text-center mb-4">Weather Forecast</h1>
      <CitySelector setCity={setCity} />
      {weatherData && weatherData.daily ? (
        <div>
          {weatherData.daily.time.map((date, index) => (
            <div key={index} className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">{new Date(date).toLocaleDateString()}</h5>
                <p className="card-text">Max Temperature: {weatherData.daily.temperature_2m_max[index]} °C</p>
                <p className="card-text">Min Temperature: {weatherData.daily.temperature_2m_min[index]} °C</p>
                <p className="card-text">Precipitation: {weatherData.daily.precipitation_sum[index]} mm</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default Weather;
