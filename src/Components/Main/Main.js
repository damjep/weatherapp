import {image} from "./data.js"

let data = "Rain"

export default function Main() {
    const WeatherCondition = image.map(c => {
        if (data == "Rain") {
            return <>
                <div>
                    <img src={c.link}></img>
                </div>
            </>
        }
    })

    return <>
    <div>
        {WeatherCondition}
    </div>
    </>
}

