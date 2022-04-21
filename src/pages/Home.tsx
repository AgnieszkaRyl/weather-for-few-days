import Input from "@mui/material/Input";
import Button from '@mui/material/Button';
import {useState} from "react";
import axios from "axios";
import {GEOGRAPHY_PATH, API_KEY} from "../utilities/constants.ts";
import {Link} from "react-router-dom";

export default function Home(){
    const [city, setCity]=useState("");
    const [lotCoordinate, setLotCoordinate]=useState("");
    const [lonCoordinate, setLonCoordinate]=useState("");
    const [link, setLink]=useState("");

    const testFun=(e)=>{
        const target = e.target as HTMLInputElement;
        setCity(target.value);

        const path=GEOGRAPHY_PATH+target.value+API_KEY;

        axios.get(path).then(res=>{
            const coordinates=res.data;
            setLink("/weather/"+coordinates[0].lat+"/"+coordinates[0].lon);
        })
    }
    const getCoordinates=(town:string):void=>{
        const path=GEOGRAPHY_PATH+town+API_KEY;
        axios.get(path).then(res=>{
            const coordinates=res.data;
            setLotCoordinate(coordinates[0].lat);
            setLonCoordinate(coordinates[0].lon);
            console.log(lotCoordinate, lonCoordinate);
        })
    }



    return (
        <div>
            <h1>app weather</h1>
            <Input placeholder="Enter a city" value={city} onInput={(e)=>testFun(e)}
                   />
                   <Button variant="contained" onClick={()=>getCoordinates(city)}>
                       <Link to={link}>
                           Go
                       </Link>
                   </Button>
        </div>
    )
}