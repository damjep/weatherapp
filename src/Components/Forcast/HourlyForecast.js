import React, {useEffect, useState } from "react";
import useWeatherData from "../fetch/useWeatherData";
import './forecast.css'

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
      <div className="icon">
          <img className="img-hf" src={"https://openweathermap.org/img/wn/" + iconS + "@2x.png"} />
      </div>
      </>
  }

    return (
      <div className="hourlyContainer">
        {weatherData ? (
          <>
          <div>
              <h2 className="hourlyTitle"> Hourly Forecast</h2>
              <hr></hr>

              <div className="hourlyList">
                  {hourly.map( ( hour, index ) => (
                    <div key={index} className="hourlyItem">
                        <p>{new Date(hour.dt * 1000).toLocaleDateString([] , {month:'long',day: 'numeric'})}</p>
                        <p>{new Date(hour.dt * 1000).toLocaleTimeString([] , {hour: '2-digit'})}</p>
                        <Icon icon={hour.weather[0].icon}/>
                        <p>{hour.temp}°C</p>
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

