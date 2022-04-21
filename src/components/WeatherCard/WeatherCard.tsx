import {Card, CardContent} from "@mui/material";
import "./weatherCard.scss"
import "../../styles/global.scss"
import {useEffect, useState} from "react";

interface weatherCardProps {
    title: string,
    dayAverageTemp: number,
    dayAverageHumidity: number,
    dayAveragePressure: number,
    nightAverageTemp: number,
    nightAverageHumidity: number,
    nightAveragePressure: number,
    imagePath: any
}

export default function WeatherCard({
                                        title,
                                        dayAverageTemp,
                                        dayAverageHumidity,
                                        dayAveragePressure,
                                        nightAverageTemp,
                                        nightAverageHumidity,
                                        nightAveragePressure,
                                        imagePath
                                    }: weatherCardProps) {
    console.log("image", [imagePath])
    const [icon, setIcon]=useState("");
    const getIcon = () => {
        imagePath[0].forEach((elem) => {
            const date = new Date(elem.dt_txt);
            if (date.getHours() >= 12 && date.getHours() <= 14) {
                console.log("kurla", elem.weather[0].icon);
                setIcon("https://openweathermap.org/img/wn/" + elem.weather[0].icon + "@2x.png");
                return;
            }
        })

    }
    useEffect(()=>{
        getIcon()
    },[]);
    return (
        <div className="card container">
            <Card>
                <CardContent>
                    <div className="row card__title">
                        <h5>{title}</h5>
                        <img src={icon} />
                    </div>

                    <div className="row">
                        <div className="card__half">
                            <p className="card__half-title">day</p>
                            <p>temperature: {Math.round(dayAverageTemp)} C</p>
                            <p>humidity: {Math.round(dayAverageHumidity)}%</p>
                            <p>pressure: {Math.round(dayAveragePressure)}hPa</p>
                        </div>
                        <div className="card__half">
                            <p className="card__half-title">night</p>
                            <p>temperature: {Math.round(nightAverageTemp)} C</p>
                            <p>humidity: {Math.round(nightAverageHumidity)}%</p>
                            <p>pressure: {Math.round(nightAveragePressure)}hPa</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

    )
}