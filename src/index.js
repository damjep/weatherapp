import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { WeatherDataProvider } from './Components/fetch/useWeatherData';
import { SelectedAreasProvider } from './Components/MenuBtn/SelectedAreas';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SelectedAreasProvider>
      <WeatherDataProvider>
        <App />
      </WeatherDataProvider>
    </SelectedAreasProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
