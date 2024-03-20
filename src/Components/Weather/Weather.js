import React, { useEffect, useState } from 'react';
import { FetchData } from '../fetch/fetchData';
import { FetchElevation } from '../fetch/fetchElevation';

const Weather = () => {
  //const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [elevation, setElevation] = useState(null);

  useEffect(() => {
    // Check if geolocation is supported by the browser
    if (navigator.geolocation) {
      // Get the user's current location
      navigator.geolocation.getCurrentPosition(
        async function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          try {
            const data = await FetchData(latitude,longitude)
            setWeatherData(data)
            const dataE = await FetchElevation(latitude,longitude)
            setElevation(dataE)
          } catch (error) {
            console.log(error)
          }
          // Fetch weather data using geolocation coordinates
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
  }, []);
  
  return (
    <div>
      {weatherData ? (
        <>
          <div class="box-holder">
            <div class="box1">
              <p class="p1">Elevation</p>
              <p class="p2">{elevation ? `${elevation.elevation}m` : 'N/A'}</p>
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