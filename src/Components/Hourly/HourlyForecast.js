import React, {useEffect, useState } from "react";
import axios from 'axios';
import FetchData from "../fetch/fetchData";

const HourlyForecast = () => {

    const [hourlyWeather, setHourlyWeather] = useState()
    const [loading, setLoading]= useState(true);
    const [error, setError]= useState(null);
    const [elevation, setElevation] = useState(null);

    // // const fetchElevation = async (latitude, longitude) => {
    // //     try {
    // //       const apiKey = 'AIzaSyCcQTpsFMiJKHT2sXYf5Z4Rk2s6SJNf2lo';
    // //       const response = await axios.get(
    // //         `https://maps.googleapis.com/maps/api/elevation/json?locations=${latitude},${longitude}&key=${apiKey}`
    // //       );
    
    // //       // Extract elevation data from the response
    // //       const elevationResult = response.data.results[0];
    // //       console.log(response.data);
    // //       const elevationValue = elevationResult ? elevationResult.elevation : null;
    
    // //       setElevation(elevationValue);
    // //     } catch (error) {
    // //       console.error('Error fetching elevation data:', error);
    // //     }
    // //   };

    // console.log("ferfrfrfr")

    // const fetchData = async (latitude, longitude) => {
    //     try {
    //       const apiKey = '1a945b25256fccab584f58958074cda8';
    //       const response = await axios.get(
    //         `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    //       );
    //       setHourlyWeather(response.data.list);
    //       setLoading(false)
    //       console.log("vefe");
    //       console.log(response.data); //You can see all the weather data in console log
    //       // Fetch elevation data using geolocation coordinates
    //     //   fetchElevation(latitude, longitude);
    //     } catch (error) {
    //         console.log("error")
    //       console.error(error);
    //       setError('Error fetching weather data. Please try again.');
    //       setLoading(false); // Set loading to false if an error occurs
    //     }
    //   };
    //   console.log(" here 0");
    //   useEffect(() => {
    //     // Check if geolocation is supported by the browser
    //     console.log(" here 1");
    //     if (navigator.geolocation) {
    //       // Get the user's current location
    //       console.log(" here 2");
    //       navigator.geolocation.getCurrentPosition(
    //         function (position) {
    //           const latitude = position.coords.latitude;
    //           const longitude = position.coords.longitude;
    //           console.log(" here 3");
    
    //           // Fetch weather data using geolocation coordinates
    //           fetchData(latitude, longitude);
    //           console.log(" here 4");
    //         },
    //         function (error) {
    //           // Handle errors in getting the user's location
    //           console.error('Error getting location:', error.message);
    //         }
    //       );
    //     } else {
    //       // Geolocation is not supported by the browser
    //       console.error('Geolocation is not supported by this browser.');
    //     }
    //   }, []); // Empty dependency array to run the effect only once on component moun

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
          setHourlyWeather(response.data);
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
          {hourlyWeather ? (
            <>
            <div>
                <br></br>
                <hr></hr>
                <br></br>
                <h2> Hourly Forecast</h2>
                <div className="hourlyList">
                {hourlyWeather.hourly.map((hour, index) => (
                            <div key={index} className="hourlyItem">
                                <p>Time: {new Date(hour.dt * 1000).toLocaleTimeString()}</p>
                                <p>Temperature: {hour.temp}°C</p>
                                <p>Humidity: {hour.humidity}%</p>
                                
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
export default HourlyForecast  ; 

