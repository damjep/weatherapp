import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async () => {
    try {
      const apiKey = '1a945b25256fccab584f58958074cda8';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeatherData(response.data);
      console.log(response.data); //You can see all the weather data in console log
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData ? (
        <>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Feels like : {weatherData.main.feels_like}°C</p>
          <div class="box-holder">
            <div class="box1">
            <p class="p1">Elevation</p>
            <p class="p2">{weatherData.main.elevation}m</p>
            </div>
            <div class="box1">
              <p class="p1">Humidity</p>
              <p class="p2">{weatherData.main.humidity}%</p>
            </div>
            <div class="box1">
              <p class="p1">Pressure</p>
              <p class="p2">{weatherData.main.pressure}</p>
            </div>
            <div class="box1">
              <p class="p1">Wind Speed</p>
              <p class="p2">{weatherData.wind.speed}m/s</p>
            </div>
          </div>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};
export default Weather;