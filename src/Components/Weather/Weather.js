import React from 'react';
import useWeatherData from '../fetch/useWeatherData';
import UseElevation from '../fetch/useElevationData';

const Weather = () => {
  //fetch weather/elevation data
  const {weatherData} = useWeatherData();
  const elevation = UseElevation();
  
  return (
    <div>
      {weatherData ? (
        <>
          {/* elevation,humidity,pressure and windspeed */}
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
        //loading/error message
        <p>Loading weather data...</p>
      )}
    </div>
  );
};
export default Weather;