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
const App = () => {
  return (
    <div>
      <div class="menu-bnt">
        <div></div>
      </div>
      <h1>Weather Forecast App</h1>
      <Weather/>
    </div>
  );
};
export default App;
