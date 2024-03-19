import React from 'react';
import Weather from './Components/Weather/Weather';
import Main from './Components/Main/Main';
import Menu from './Components/MenuBtn/Menu';
import { Warning } from './Components/warning/warning';

const App = () => {
  return (
    <div>
      <Menu/>
      <Main/>
      <Warning/>
      <Weather/>
    </div>
  );
};
export default App;
