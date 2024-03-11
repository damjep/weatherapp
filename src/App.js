/*import Weather from "./Weather.js";
import React from "react";

const App = () => {
  return <>
  <div>
    <Weather />
  </div>
  </>
}

export default App*/

import React from 'react';
import Weather from './Weather';
import Main from "./Components/Main.js"

const App = () => {
  return (
    <div>
      <h1>Weather Forecast App</h1>
      <Main />
    </div>
  );
};
export default App;
