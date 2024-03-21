import axios from "axios";

export async function FetchData(latitude, longitude) {
    try {
      const apiKey = '1a945b25256fccab584f58958074cda8';
      const response = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=bfd925496fb893f00d859137e9e982a6&units=metric`
      );

      console.log(response.data);
      return response.data
       //You can see all the weather data in console log
      // Fetch elevation data using geolocation coordinates
    } catch (error) {
      console.error(error);
    }
  }; 

