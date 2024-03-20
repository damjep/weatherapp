import axios from "axios";

export async function FetchElevation (latitude, longitude) {
    try {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/elevation?latitude=${latitude}&longitude=${longitude}`
      );

      // Extract elevation data from the response
      console.log(response.data);
      return response.data

    } catch (error) {
      console.error('Error fetching elevation data:', error);
    }
  };