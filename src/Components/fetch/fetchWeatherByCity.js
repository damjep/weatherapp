import axios from "axios";

export async function fetchWeatherByCity(city) {
    try {
      const apiKey = '1a945b25256fccab584f58958074cda8';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
    
      const obj = new Array()
      obj = [response.data, false, [...selectedAreas, response.data]]
      return obj
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };