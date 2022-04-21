import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {API_KEY, ICON_PATH, ICON_PATH_SUFFIX, WEATHER_PATH} from '../utilities/constants.ts';
import axios from "axios";
import "../styles/global.scss"
import Loading from "./Loading.tsx";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import NotFound from "./NotFound.tsx";
import WeatherCard from "../components/WeatherCard/WeatherCard.tsx";
import {getAveragesForDay} from "../utilities/getAveragesForDay.ts";
import {splitElementsByDate} from "../utilities/splitElementsByDate.ts";
import ChartLine from "../components/Chart/ChartLine.tsx";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function CityWeather() {
    const {lot, lon} = useParams();
    const [weatherObject, setWeatherObject] = useState(null);

    useEffect(() => {
        const path = WEATHER_PATH + lot + "&lon=" + lon + API_KEY;
        axios.get(path).then(res => {
            const data = res.data;
            setWeatherObject(data);
        })
    }, [])

    if (!weatherObject) {
        return <Loading/>
    }
    if (!weatherObject.city) {
        return <NotFound/>
    }

    const daysData = splitElementsByDate(weatherObject);
    const averagesTomorrow = getAveragesForDay(daysData[1]);
    const averageDayAfterTomorrow = getAveragesForDay(daysData[2]);
    const inTwoDays = getAveragesForDay(daysData[3]);

    const iconPath=(icon)=>{
        const path = ICON_PATH+icon+ICON_PATH_SUFFIX;
        return path
    }
    return (
        <div className="container">
            <div>
            <h1>City: {weatherObject.city.name}</h1>
                <img src={iconPath(weatherObject.list[0].weather[0].icon)}/>
            </div>
            <p>country: {weatherObject.city.country}</p>
            <p>current temperature: {Math.round(weatherObject.list[0].main.temp)} F</p>
            <p>current humidity: {Math.round(weatherObject.list[0].main.humidity)} %</p>
            <p>current pressure: {Math.round(weatherObject.list[0].main.pressure)} hPa</p>
            <div className="container">
                <WeatherCard title="Tommorow" dayAverageTemp={averagesTomorrow.dayAverageTemp}
                             dayAverageHumidity={averagesTomorrow.dayAverageHumidity}
                             dayAveragePressure={averagesTomorrow.dayAveragePressure}
                             nightAverageTemp={averagesTomorrow.nightAverageTemp}
                             nightAverageHumidity={averagesTomorrow.nightAverageHumidity}
                             nightAveragePressure={averagesTomorrow.nightAveragePressure}
                             imagePath={daysData[1]}
                />
                <WeatherCard title="The day after tomorrow" dayAverageTemp={averageDayAfterTomorrow.dayAverageTemp}
                             dayAverageHumidity={averageDayAfterTomorrow.dayAverageHumidity}
                             dayAveragePressure={averageDayAfterTomorrow.dayAveragePressure}
                             nightAverageTemp={averageDayAfterTomorrow.nightAverageTemp}
                             nightAverageHumidity={averageDayAfterTomorrow.nightAverageHumidity}
                             nightAveragePressure={averageDayAfterTomorrow.nightAveragePressure}
                             imagePath={daysData[2]}
                />
                <WeatherCard title="In two days" dayAverageTemp={inTwoDays.dayAverageTemp}
                             dayAverageHumidity={inTwoDays.dayAverageHumidity}
                             dayAveragePressure={inTwoDays.dayAveragePressure}
                             nightAverageTemp={inTwoDays.nightAverageTemp}
                             nightAverageHumidity={inTwoDays.nightAverageHumidity}
                             nightAveragePressure={inTwoDays.nightAveragePressure}
                             imagePath={daysData[3]}

                />
            </div>
            <div>
                <ChartLine weatherObject={weatherObject}/>
            </div>
        </div>
    )
}