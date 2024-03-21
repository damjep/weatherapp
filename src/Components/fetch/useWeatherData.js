import { useState, useEffect, createContext, useContext } from "react";
import { FetchData } from "./fetchData";

const WeatherDataContext = createContext();

export default function useWeatherData() {
    return useContext(WeatherDataContext);
}

export function WeatherDataProvider({children}) {
    const [weatherData, setWeatherData] = useState(null);
    const [selectedAreas, setSelectedAreas] = useState([]);

    useEffect(() => {
        // Check if geolocation is supported by the browser
        if (navigator.geolocation) {
            // Get the user's current location
            navigator.geolocation.getCurrentPosition(
                async function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                try {
                    const data = await FetchData(latitude, longitude);
                    setWeatherData(data)
                    setSelectedAreas( ...selectedAreas, data)
                } catch (error) {
                    console.log(error)
                }
                // Fetch weather data using geolocation coordinates
                
                },
            function (error) {
                // Handle errors in getting the user's location
                console.error('Error getting location:', error.message);
                }
        );} else {
            // Geolocation is not supported by the browser
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);


    
    return (
        <WeatherDataContext.Provider value={{weatherData, selectedAreas}} >
            {children}
        </WeatherDataContext.Provider>
    );
}