import axios from "axios";

export async function FetchData(latitude, longitude) {
    try {
      const apiKey = 'e75719491e7470f1a5954a20eb6b8c47';
      const response = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${apiKey}&units=metric`
        //`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=bfd925496fb893f00d859137e9e982a6&units=metric`
      );

      console.log(response.data);
      return response.data
       //You can see all the weather data in console log
      // Fetch elevation data using geolocation coordinates
    } catch (error) {
      console.error(error);
    }
  }; 

