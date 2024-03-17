import axios from "axios";
import { fetchElevation } from "./fetchElevation";

export default class FetchData {
    async fetchData(latitude , longitude) {
    try {
      const apiKey = '1a945b25256fccab584f58958074cda8';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
      );

      console.log(response.data);
      return response.data
       //You can see all the weather data in console log
      // Fetch elevation data using geolocation coordinates
      fetchElevation(latitude, longitude);
    } catch (error) {
      console.error(error);
    }
  }; 
}
