import React, {useEffect, useState } from "react";
import useWeatherData from "../fetch/useWeatherData";
import "./forecast.css"

const HourlyForecast = () => {

    var { weatherData } = useWeatherData();
    const [hourly, setHourly] = useState([]);

    useEffect(()=> {
      if (weatherData && weatherData.hourly) {
        setHourly(weatherData.hourly)
        console.log(hourly);
      }console.log(hourly);
    }, [weatherData])

    function Icon(icon) {
      let iconS = JSON.stringify(icon).split("")[9]
      iconS += JSON.stringify(icon).split("")[10]
      iconS += JSON.stringify(icon).split("")[11]

      return <>
      <div className="right">
          <img src={"https://openweathermap.org/img/wn/" + iconS + "@2x.png"} />
      </div>
      </>
  }

    return (
      <div className="hourlyContainer">
        {weatherData ? (
          <>
          <div>
              <br></br>
              <h2 className="hourlyTitle"> Daily Forecast</h2>
              <hr></hr>

              <div className="hourlyList">
                  {hourly.map( ( hour, index ) => (
                    <div key={index} className="hourlyItem">
                        <p>Date: {new Date(hour.dt * 1000).toLocaleDateString()}</p>
                        <p>Time: {new Date(hour.dt * 1000).toLocaleTimeString()}</p>
                        <Icon icon={hour.weather[0].icon}/>
                        <p>Temperature: {hour.temp}°C</p>
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

