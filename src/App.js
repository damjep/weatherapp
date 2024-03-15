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
import Weather from './Components/Weather/Weather';
import Main from './Components/Main/Main';
const App = () => {
  return (
    <div>
      <div class="menu-bnt">
        <div></div>
      </div>
      <Main />
      <Weather/>
    </div>
  );
};
export default App;
