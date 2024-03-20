import axios from "axios";
import { useEffect, useState } from "react";
import {ReactComponent as svg} from "./warning.svg" 
import "./warning.css"

export const Warning = () => {
    const [alertData, setAlert] = useState(null);

    const fetchAlert = async(latitude , longitude) => {
        try {
            const apiKey = 'ec97f681c5bd4ec6bf075518241503';
            const response = await axios.get(
                `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=1&aqi=no&alerts=yes`
            );

            console.log(response.data)
            setAlert(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // Check if geolocation is supported by the browser
        if (navigator.geolocation) {
        // Get the user's current location
        navigator.geolocation.getCurrentPosition(
            function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Fetch weather data using geolocation coordinates
            fetchAlert(latitude, longitude);
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
        <>
            {alertData ? (
                <>
                    <div className="warning">
                        {alertData.alerts.alert[0] ? (
                            <>
                                <svg width="126" height="112" viewBox="0 0 126 112" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M47.1311 8.82971C54.1013 -2.94323 71.1386 -2.94324 78.1088 8.8297L122.701 84.1477C129.805 96.1466 121.157 111.318 107.212 111.318H18.0275C4.08325 111.318 -4.56545 96.1466 2.53858 84.1477L47.1311 8.82971ZM71.95 87.9105C71.95 92.7064 67.9468 96.5943 63.0085 96.5943C58.0703 96.5943 54.0671 92.7064 54.0671 87.9105C54.0671 83.1145 58.0703 79.2266 63.0085 79.2266C67.9468 79.2266 71.95 83.1145 71.95 87.9105ZM70.6253 18.7614H55.3918L57.3788 74.0806H68.6383L70.6253 18.7614Z" fill="white"/>
                                </svg>
                                <p>
                                    {alertData.alerts.alert[0]}
                                </p>
                            </>
                        ) : (
                            <>
                                <svg width="126" height="112" viewBox="0 0 126 112" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M47.1311 8.82971C54.1013 -2.94323 71.1386 -2.94324 78.1088 8.8297L122.701 84.1477C129.805 96.1466 121.157 111.318 107.212 111.318H18.0275C4.08325 111.318 -4.56545 96.1466 2.53858 84.1477L47.1311 8.82971ZM71.95 87.9105C71.95 92.7064 67.9468 96.5943 63.0085 96.5943C58.0703 96.5943 54.0671 92.7064 54.0671 87.9105C54.0671 83.1145 58.0703 79.2266 63.0085 79.2266C67.9468 79.2266 71.95 83.1145 71.95 87.9105ZM70.6253 18.7614H55.3918L57.3788 74.0806H68.6383L70.6253 18.7614Z" fill="white"/>
                                </svg>
                                <p>No Severe Warnings</p>                                
                            </>
                        )}
                    </div>
                </>
            ) : (
                <>
                <div>
                    <p>Loading</p>
                </div>
                
                </>
            )}
        </>
    )
}