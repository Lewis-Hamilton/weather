import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Modal from "./modal";
import Settings from "./settings";
import { useSelector } from "react-redux";

export default function Home() {
  const unit = useSelector((state) => state.unitReducer.unit);
  const city = useSelector((state) => state.locationReducer.location);
  const [temp, setTemp] = useState("");
  const [feel, setFeel] = useState("");
  const options = {
    method: "GET",
    url: "https://community-open-weather-map.p.rapidapi.com/weather",
    params: {
      q: city,
      units: unit,
    },
    headers: {
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
      "x-rapidapi-key": process.env.REACT_APP_WEATHER_API_KEY,
    },
  };

  const call = () => {
    if (city === "Unkown" || "") {
      setTemp("Enter a location Dumbass");
    } else {
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          console.log(response.data.main.temp);
          setTemp(response.data.main.temp);
          setFeel(response.data.main.feels_like);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    if (city !== "") {
      call();
    }
  }, []);

  return (
    <>
      <Settings />
      <Modal />
      <Typography variant="h1">Temp: {temp}</Typography>
      <Typography variant="h2">Feels: {feel}</Typography>
      <Button variant="contained" color="primary" onClick={() => call()}>
        Call
      </Button>
    </>
  );
}
