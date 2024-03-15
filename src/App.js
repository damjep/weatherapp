import React from 'react';
import Weather from './Components/Weather/Weather';
import Main from './Components/Main/Main';
import Menu from './Components/MenuBtn/MenuBtn';

const App = () => {
  return (
    <div>
      <Menu />
      <Main />
      <Weather/>
    </div>
  );
};
export default App;
