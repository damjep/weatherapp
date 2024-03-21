import { useState, useEffect } from "react";
import { FetchFloodWarning } from "./fetchFloodWarning";

export default function UseFloodWarning() {
    const [warning, setWarning] = useState(null);

    useEffect(() => {
        // Check if geolocation is supported by the browser
        if (navigator.geolocation) {
        // Get the user's current location
        navigator.geolocation.getCurrentPosition(
            async function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            try {
                const dataE = await FetchFloodWarning(latitude,longitude)
                setWarning(dataE)
            } catch (error) {
                console.log(error)
            }
            // Fetch weather data using geolocation coordinates
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

  return warning;
}