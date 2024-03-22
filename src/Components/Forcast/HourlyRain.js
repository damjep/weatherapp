import React, {useEffect, useState } from "react";
import useWeatherData from "../fetch/useWeatherData";


const HourlyRain = () => {
    const [HourlyRain, setHourlyRain] = useState([]);
    const {weatherData} = useWeatherData();

    useEffect(() => {
      if (weatherData && weatherData.hourly) {
        setHourlyRain(weatherData.hourly)
      }
    })
    return (
      <div className="weather-right">
        {HourlyRain ? (
          <>
          <div>
            <h2 className="hourlyTitle">Chance of Rain</h2>
            <hr></hr>
            <div className="hr">
              <svg className="svg-hr" width="105" height="60" viewBox="0 0 105 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20.362" width="3" height="42" rx="1.5" transform="rotate(29 20.362 0)" fill="#D9D9D9"/>
                <path d="M80.2586 5.7664C80.6603 5.04184 81.5732 4.78005 82.2978 5.18168C83.0223 5.58331 83.2841 6.49627 82.8825 7.22083L63.9749 41.331C63.5733 42.0556 62.6603 42.3173 61.9358 41.9157C61.2112 41.5141 60.9494 40.6011 61.3511 39.8766L80.2586 5.7664Z" fill="#D9D9D9"/>
                <rect x="40.978" width="3" height="66.7953" rx="1.5" transform="rotate(29 40.978 0)" fill="#D9D9D9"/>
                <rect x="101.978" y="2" width="3" height="59.3598" rx="1.5" transform="rotate(29 101.978 2)" fill="#D9D9D9"/>
                <rect x="58.7155" y="6" width="3" height="50.9798" rx="1.5" transform="rotate(29 58.7155 6)" fill="#D9D9D9"/>
              </svg>

              <div className="hourlyList">
                      {HourlyRain.map((hour, index) => (
                        <div key={index} className="hourlyItem">
                            <p>{new Date(hour.dt * 1000).toLocaleDateString([], {day:'numeric', month:'long'})}</p>
                            <p>{new Date(hour.dt * 1000).toLocaleTimeString([], {hour:'2-digit'})}</p>
                            <p>Probability: {hour.pop*100}%</p>
                        </div>
                    ))}
              </div>

            </div>
            
          </div>
          </>
        ) : (
          <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default HourlyRain;