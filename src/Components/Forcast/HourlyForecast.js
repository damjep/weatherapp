import React, {useEffect, useState } from "react";
import useWeatherData from "../fetch/useWeatherData";

const HourlyForecast = () => {

    var { weatherData } = useWeatherData();
    const [hourly, setHourly] = useState([]);

    useEffect(()=> {
      if (weatherData && weatherData.hourly) {
        setHourly(weatherData.hourly)
        console.log(hourly);
      }console.log(hourly);
    }, [weatherData])

    return (
      <div className="hourlyContainer">
        {weatherData ? (
          <>
          <div>
              <br></br>
              <hr></hr>
              <br></br>
              
              <div className="hourlyList">
                  <h2 className="hourlyTitle"> Daily Forecast</h2>
                  {hourly.map( ( hour, index ) => (
                    <div key={index} className="hourlyItem">
                        <p>Date: {new Date(hour.dt * 1000).toLocaleDateString()}</p>
                        <p>Time: {new Date(hour.dt * 1000).toLocaleTimeString()}</p>
                        <p>Temperature: {hour.temp}°C</p>
                        <p>Humidity: {hour.humidity}%</p>
                        <p>Wind Speed: {hour.wind_speed} m/s</p>
                        
                    </div>
                  ))}
              </div>
          </div>
          </>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    );
}
export default HourlyForecast  ; 

