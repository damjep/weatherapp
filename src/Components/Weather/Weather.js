import React from 'react';
import useWeatherData from '../fetch/useWeatherData';
import UseElevation from '../fetch/useElevationData';

const Weather = () => {
  const {weatherData} = useWeatherData();
  const elevation = UseElevation();
  
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
              <p class="p2">{weatherData.current.humidity}%</p>
            </div>
            <div class="box1">
              <p class="p1">Pressure</p>
              <p class="p2">{weatherData.current.pressure}</p>
            </div>
            <div class="box1">
              <p class="p1">Wind Speed</p>
              <p class="p2">{weatherData.current.wind_speed}m/s</p>
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