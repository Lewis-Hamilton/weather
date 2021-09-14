import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Weather() {
  const [temp, setTemp] = useState("");
  const [feel, setFeel] = useState("");
  const [weather, setWeather] = useState([]);
  const unit = useSelector((state) => state.unitReducer.unit);
  const city = useSelector((state) => state.locationReducer.location);
  const rounded = useSelector((state) => state.tempReducer.rounded);
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
          //console.log(response.data.main);
          //console.log(response.data.weather[0].description);
          if (rounded) {
            setTemp(Math.round(response.data.main.temp));
            setFeel(Math.round(response.data.main.feels_like));
          } else if (!rounded) {
            setTemp(response.data.main.temp);
            setFeel(response.data.main.feels_like);
          }
          if (response.data.weather.length) {
            setWeather(response.data.weather[0].main);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    if (city) {
      call();
    }
  }, []);

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h1">{temp}&deg;</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h2">{feel}&deg;</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h2">{weather}</Typography>
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" onClick={() => call()}>
        Call
      </Button>
    </>
  );
}
