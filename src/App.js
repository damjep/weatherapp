import React from 'react';
import Weather from './Components/Weather/Weather';
import Main from './Components/Main/Main';
import Menu from './Components/MenuBtn/Menu';
import { Warning } from './Components/warning/warning';
import "./App.css"

const App = () => {
  return ( <>
  <div className='desktop night'>
    <span className='eclipse'/>
    <span className='eclipse2'/>
    
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
