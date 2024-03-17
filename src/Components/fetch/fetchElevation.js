import axios from "axios";

export const fetchElevation = async (latitude, longitude) => {
    try {
      const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/elevation/json?locations=${latitude},${longitude}&key=${apiKey}`
      );

      // Extract elevation data from the response
      const elevationResult = response.data.results[0];
      const elevationValue = elevationResult ? elevationResult.elevation : null;

      function giveVal() {
        return elevationValue
      }

    } catch (error) {
      console.error('Error fetching elevation data:', error);
    }
  };