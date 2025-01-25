import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CitySelector from './CitySelector';
import '../Weather.css'; // Uvoz Weather.css

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState({ latitude: '52.52', longitude: '13.41' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get('https://api.open-meteo.com/v1/forecast', {
          params: {
            latitude: city.latitude,
            longitude: city.longitude,
            daily: 'weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum',
            timezone: 'auto',
            start: new Date().toISOString().split('T')[0],
            end: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0]
          }
        });
        setWeatherData(result.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Failed to fetch data. Check your internet connection and try again.');
      }
      setLoading(false);
    };

    if (city.latitude && city.longitude) {
      fetchData();
    }
  }, [city]);


  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Weather Forecast</h1>
      <CitySelector setCity={setCity} />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : weatherData && weatherData.daily && weatherData.daily.time.length > 0 ? (
        <div className="row">
          {weatherData.daily.time.map((date, index) => (
            <div key={index} className="col-md-4">
              <div className="card mt-3">
                <div className="card-body">
                  <h5 className="card-title">{new Date(date).toLocaleDateString()}</h5>
                  <img src={getWeatherIcon(weatherData.daily.weathercode[index])} alt="Weather Icon" className="img-fluid" />
                  <div className="weather-details">
                    <p>Max Temp: {weatherData.daily.temperature_2m_max[index]} °C</p>
                    <p>Min Temp: {weatherData.daily.temperature_2m_min[index]} °C</p>
                    <p>Precipitation: {weatherData.daily.precipitation_sum[index]} mm</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default Weather;

function getWeatherIcon(code) {
  const iconMap = {
    'clear': '/path/to/sun-icon.png',
    'rainy': '/path/to/rain-icon.png',
    'cloudy': '/path/to/cloud-icon.png',
    'snow': '/path/to/snow-icon.png',
    'default': '/path/to/default-icon.png'
  };
  return iconMap[code] || iconMap['default'];
}
