import React, {useEffect, useState } from "react";
import axios from 'axios';
import FetchData from "../fetch/fetchData";


const HourlyRain = () => {

    const [HourlyRain, setHourlyRain] = useState()
    const [loading, setLoading]= useState(true);
    const [error, setError]= useState(null);
    const [elevation, setElevation] = useState(null);

   

    console.log("here 1");
    const fetchElevation = async (latitude, longitude) => {
        try {
          const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/elevation/json?locations=${latitude},${longitude}&key=${apiKey}`
          );
    
          // Extract elevation data from the response
          const elevationResult = response.data.results[0];
          const elevationValue = elevationResult ? elevationResult.elevation : null;
    
          setElevation(elevationValue);
        } catch (error) {
            console.log("error 1");
          console.error('Error fetching elevation data:', error);
        }
      };
    
      const fetchData = async (latitude, longitude) => {
        try {
            const url =  `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=bfd925496fb893f00d859137e9e982a6&units=metric`;
            console.log(url);
          const apiKey = '3a465d09f7b3550d880f18e8caa63cba';
          const response = await axios.get(
            //`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
            // 'https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=bfd925496fb893f00d859137e9e982a6&units=metric'
            //  'https://api.openweathermap.org/data/3.0/onecall?lat=44.34&lon=10.99&exclude={part}&appid=bfd925496fb893f00d859137e9e982a6&units=metric'
            url

          );
          console.log("here 2");
          setHourlyRain(response.data);
          console.log("here 3");
          console.log(response.data); //You can see all the weather data in console log
          // Fetch elevation data using geolocation coordinates
          
        } catch (error) {
            console.log(" error 2 ");
          console.error(error);
        }
      };
      useEffect(() => {
        console.log("here 4");
        // Check if geolocation is supported by the browser
        if (navigator.geolocation) {
          // Get the user's current location
          navigator.geolocation.getCurrentPosition(
            function (position) {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
    
              // Fetch weather data using geolocation coordinates
              fetchData(latitude, longitude);
            },
            function (error) {
              // Handle errors in getting the user's location
              console.error('Error getting location:', error.message);
            }
          );
        } else {
          // Geolocation is not supported by the browser
          console.error('Geolocation is not supported by this browser.');
        }
      }, []);

      return (
        <div className="hourlyContainer">
          {HourlyRain ? (
            <>
            <div>
                <br></br>
                <hr></hr>
                <br></br>
                <br></br>
                <br></br>
                
                <div className="hourlyList">
                    <h2 className="hourlyTitle">Chance of Rain</h2>
                {HourlyRain.hourly.map((hour, index) => (
                            <div key={index} className="hourlyItem">
                                <p>Date: {new Date(hour.dt * 1000).toLocaleDateString()}</p>
                                <p>Time: {new Date(hour.dt * 1000).toLocaleTimeString()}</p>
                                <p>Probability: {hour.pop*100}%</p>
                                
                                
                            </div>
                        ))}
              
                
                  {/* <p >Humidity</p>
                  <p >{hourlyWeather.hourly[0].temp}%</p> */}
                
                {/* <div class="box1">
                  <p class="p1">Pressure</p>
                  <p class="p2">{hourlyWeather.main.pressure}</p>
                </div>
                <div class="box1">
                  <p class="p1">Wind Speed</p>
                  <p class="p2">{hourlyWeather.wind.speed}m/s</p>
                </div> */}

                </div>

            </div>
          
                
             
            </>
          ) : (
            <p>Loading weather data...</p>
          )}
        </div>
      );

}

export default HourlyRain;