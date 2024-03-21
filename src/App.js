import React, { useEffect, useState } from 'react';
import Weather from './Components/Weather/Weather';
import Main from './Components/Main/Main';
import Menu from './Components/MenuBtn/Menu';
import { Warning } from './Components/warning/warning';
import "./App.css"
import useWeatherData from './Components/fetch/useWeatherData';


function App() {
  const {weatherData} = useWeatherData();
  const [Theme, setTheme] = useState("night");

  useEffect(() => {
    if (weatherData != null) {
      if (weatherData.dt >= weatherData.sys.sunrise) {
        setTheme("light")
        console.log(Theme);
      }
      else if (weatherData.dt >= weatherData.sys.sunset ) {
        setTheme("night")
        console.log(Theme)
      }
    }
  } , [weatherData])

  return ( <>
  <div className={`desktop ${Theme}`}>
    <span className='eclipse-top'/>
    <span className='eclipse-btm'/>

    <div className='left'>
      <Menu/>
      <Main/>
    </div>

    <div className='right'>
      <Warning/>
      <Weather/>
    </div>
  </div>
  </>);
};

export default App;
