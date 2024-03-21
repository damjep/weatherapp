import React, { useEffect } from 'react';
import Weather from './Components/Weather/Weather';
import Main from './Components/Main/Main';
import Menu from './Components/MenuBtn/Menu';
import HF from './Components/Forcast/HourlyForecast';
import HR from './Components/Forcast/HourlyRain';
import { Warning } from './Components/warning/warning';
import "./App.css";


function App() {
  
  return ( <>
  <div className='desktop night'>
    <span className='eclipse-top'/>
    <span className='eclipse-btm'/>

    <div className='left'>
      <Menu/>
      <Main/>
    </div>

    <div className='right'>
      <Warning/>
      <Weather/>
      <HF/>
      <HR/>
    </div>


  </div>
  </>);
};

export default App;
