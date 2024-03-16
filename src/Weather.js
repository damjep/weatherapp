import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = () => {
  //const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [elevation, setElevation] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fetchElevation = async (latitude, longitude) => {
    try {
      const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/elevation/json?locations=${latitude},${longitude}&key=${apiKey}`
      );

      // Extract elevation data from the response
      const elevationResult = response.data.results[0];
      const elevationValue = elevationResult ? elevationResult.elevation : null;

      setElevation(elevationValue);
    } catch (error) {
      console.error('Error fetching elevation data:', error);
    }
  };

  const fetchData = async (latitude, longitude) => {
    try {
      const apiKey = '1a945b25256fccab584f58958074cda8';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
      );
      setWeatherData(response.data);
      console.log(response.data); //You can see all the weather data in console log
      // Fetch elevation data using geolocation coordinates
      fetchElevation(latitude, longitude);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    // Check if geolocation is supported by the browser
    if (navigator.geolocation) {
      // Get the user's current location
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Fetch weather data using geolocation coordinates
          fetchData(latitude, longitude);
        },
        function (error) {
          // Handle errors in getting the user's location
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      // Geolocation is not supported by the browser
      console.error('Geolocation is not supported by this browser.');
    }
  }, []); // Empty dependency array to run the effect only once on component mount

  // const handleInputChange = (e) => {
  //   setCity(e.target.value);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   fetchData();
  // };
  
  return (
    <div>
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit">Get Weather</button>
      </form> */}
      {weatherData ? (
        <>
          <div class="header">
            <div class="menu-bnt" 
            className={`menu-bnt ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <div class="menu-line l1"></div>
              <div class="menu-line l2"></div>
              <div class="menu-line l3"></div>
            </div>
            <h2 class="location">{weatherData.name}</h2>
          </div>
          <div class="menu" style={{ display: isMenuOpen ? 'block' : 'none' }} id="menu">
            <div class="card-holder">
              <div class="loca-card">
                <div class="loca-info">
                  <p>{weatherData.name}</p>
                  <p>{weatherData.weather[0].description}</p>
                </div>
                <p>{weatherData.main.temp}°C</p>
              </div>
              <div>
                
              </div>
              <div class="loca-card plus-card">
                <div class="plus"></div>
              </div>
            </div>
          </div>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Feels like : {weatherData.main.feels_like}°C</p>
          <div class="box-holder">
            <div class="box1">
              <p class="p1">Elevation</p>
              <p class="p2">{elevation ? `${elevation}m` : 'N/A'}</p>
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