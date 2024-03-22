import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './forecast.css'; // Import the CSS file

const Forecast = () => {
    const apiKey = 'd69680645c7443d998c30148242003';
    const days = 7;
    const [weatherData, setWeatherData] = useState(null);
    
    // a function to get the name of the day
    const getDayName = (index) => {
        if (index === 0) {
            return "Today"; // Returns "Today" if the index is 0
        } else {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const today = new Date();
            const nextDay = new Date(today);
            nextDay.setDate(today.getDate() + index);
            return days[nextDay.getDay()]; // Returns name of day based on index
        }
    };

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                if (navigator.geolocation) {
                    // Gets the current position using geolocation
                    navigator.geolocation.getCurrentPosition(async function(position) {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;                        
                        const response = await axios.get(
                            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=${days}&aqi=no`
                        );
                        setWeatherData(response.data.forecast.forecastday); // Set weather data from response
                    });
                } else {
                    console.error('Geolocation is not supported by this browser.'); // Log error if geolocation is not supported
                }
            } catch (error) {
                console.error('Error fetching weather data:', error); // Log error if fetching weather data fails
            }
        };
        fetchWeatherData(); // Fetch weather data on component mount
    }, [apiKey, days]); // Update when apiKey or days change
    
    return (
        <div className="forecast-container">
            <h2 className="forecast">Forecast</h2>
            <div className="horizontal-line"></div>
            {weatherData && ( // Render weather data if available
                <div className="group-35">
                    <table className="forecast-table">
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>AM</th>
                                <th>PM</th>
                                <th>Temp</th>
                                <th>Hi</th>
                                <th>Lo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {weatherData.map((dayForecast, index) => (
                                <tr key={index}>
                                    <td>{getDayName(index)}</td>
                                    <td>Icon AM</td>
                                    <td>Icon PM</td>
                                    <td>{dayForecast.day.avgtemp_c}°C</td>
                                    <td>{dayForecast.day.maxtemp_c}°C</td>
                                    <td>{dayForecast.day.mintemp_c}°C</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
export default Forecast;
