import { useState } from "react"

const Main = () => {
    const [city , setCity] = useState("Mile End");
    const [weather , setWeather] = useState(null);

    const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid={1a945b25256fccab584f58958074cda8}`
          );
          setWeather(response.data);
          console.log(response.data); //You can see all the weather data in console log
        } catch (error) {
          console.error(error);
        }
    };

    return <>
        <div>
            <p>{weather.main.temp}</p>
        </div>
    </>
}