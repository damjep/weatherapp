import "./Main.css"
import useWeatherData from "../fetch/useWeatherData";
import { useState } from "react";

export default function Main() {
    const {weatherData} = useWeatherData();
    const {selectedAreas} = useWeatherData();
    const [data , setData] = useState([])
    
    function Icon(icon) {
        let iconS = JSON.stringify(icon).split("")[9]
        iconS += JSON.stringify(icon).split("")[10]
        iconS += JSON.stringify(icon).split("")[11]

        return <>
        <div className="right">
            <img src={"https://openweathermap.org/img/wn/" + iconS + "@2x.png"} />
        </div>
        </>
    }

    function Temp(t) {
        let T = JSON.stringify(t).split("")[5]
        T += JSON.stringify(t).split("")[6]
        T += JSON.stringify(t).split("")[7]
        T += JSON.stringify(t).split("")[8]
        T += JSON.stringify(t).split("")[9]
        let tRounded = parseInt(T)

        return (<p className="temp">{tRounded} &deg;C</p>)
    }
    
    return (
        <>
            {weatherData ? (
                <>
                <div className="container">
                    <div className="left">
                        <Temp t={weatherData.main.temp} />
                        <p className="desc">{weatherData.weather[0].description}</p>
                        <div>
                            <p className="feels_like">Feels Like: {weatherData.main.feels_like}</p>
                        </div>
                        
                    </div>
                    <Icon icon={weatherData.weather[0].icon} />
                </div>
                    
                </>
            ) : (
                <>
                    <div>

                    </div>
                </>
            )}
        </>
    )
}