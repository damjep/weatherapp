import axios from "axios";
import { useEffect, useState } from "react";

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
                    <div>
                        {alertData.alerts.alert[0] ? (
                            <>
                                <p>
                                    Hi
                                </p>
                            </>
                        ) : (
                            <>
                                <p>No Severe Warnings</p>
                            </>
                        )}
                    </div>
                </>
            ) : (
                <>
                <p>Loading</p>
                </>
            )}
        </>
    )
}