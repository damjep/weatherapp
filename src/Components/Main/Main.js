import { useState, useEffect } from "react";
import { FetchData } from "../fetch/fetchData";
import "./Main.css"

export default function Main() {
    const [weatherData, setWeatherData] = useState(null);

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
        
    function Icon(icon) {
        let iconS = JSON.stringify(icon).split("")[9]
        iconS += JSON.stringify(icon).split("")[10]
        iconS += JSON.stringify(icon).split("")[11]

        return <>
        <div className="right">
            <img src={"https://openweathermap.org/img/wn/" + iconS + "@2x.png"} />
        </div>
        </>
    }

    function Temp(t) {
        let T = JSON.stringify(t).split("")[5]
        T += JSON.stringify(t).split("")[6]
        T += JSON.stringify(t).split("")[7]
        T += JSON.stringify(t).split("")[8]
        T += JSON.stringify(t).split("")[9]
        let tRounded = parseInt(T)

        return (<p className="temp">{tRounded} &deg;C</p>)
    }
    
    return (
        <>
            {weatherData ? (
                <>
                <div className="container">
                    <div className="left">
                        <Temp t={weatherData.main.temp} />
                        <p className="desc">{weatherData.weather[0].description}</p>
                        <div>
                            <p className="feels_like">Feels Like: {weatherData.main.feels_like}</p>
                        </div>
                        
                    </div>
                    <Icon icon={weatherData.weather[0].icon} />
                </div>
                    
                </>
            ) : (
                <>
                    <div>

                    </div>
                </>
            )}
        </>
    )
}