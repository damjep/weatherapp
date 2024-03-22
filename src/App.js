import React, { useEffect, useState } from 'react';
import Weather from './Components/Weather/Weather';
import Main from './Components/Main/Main';
import Menu from './Components/MenuBtn/Menu';
import HF from './Components/Forcast/HourlyForecast';
import HR from './Components/Forcast/HourlyRain';
import Sos from './Components/warning/Sos';
import Forecast from './Components/Forecast/forecast';
import { Warning } from './Components/warning/warning';
import "./App.css";
import useWeatherData from './Components/fetch/useWeatherData';
import Topo from './Components/topography/topo';


function App() {
  const {weatherData} = useWeatherData();
  const [Theme, setTheme] = useState("night");

  useEffect(() => {
    if (weatherData && weatherData.current) {
      if (weatherData.current.dt >= weatherData.current.sunrise && weatherData.current.dt <= weatherData.current.sunset) {
        setTheme("light")
        document.getElementById('ec-top').style.display = 'none'
        document.getElementById('ec-btm').style.display = 'none'
        console.log(Theme);
      }
      else if (weatherData.current.dt >= weatherData.current.sunset) {
        setTheme("night")
        document.getElementById('ec-top').style.display = 'contents'
        document.getElementById('ec-btm').style.display = 'contents'
        console.log(Theme)
      }
    }
  } , [weatherData])

  return ( <>
  <div className={`desktop ${Theme}`}>
    <span className='eclipse-top' id='ec-top'/>
    <span className='eclipse-btm' id='ec-btm'/>

    <div className='left'>
      <Menu/>
      <Main/>
      <Sos/>
    </div>

    <div className='right'>
      <HF/>
      <Warning/>
      <Weather/>
      <HR />
      <Forecast />
    </div>

  </div>
  </>);
};

export default App;
