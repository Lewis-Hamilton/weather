import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  paper: {
    margin: "40px",
  },
}));

export default function Weather() {
  const [temp, setTemp] = useState("");
  const [feel, setFeel] = useState("");
  const [weather, setWeather] = useState("");
  const [tempColor, setTempColor] = useState("");
  const [feelColor, setFeelColor] = useState("");
  const unit = useSelector((state) => state.unitReducer.unit);
  const city = useSelector((state) => state.locationReducer.location);
  const rounded = useSelector((state) => state.tempReducer.rounded);
  const funColors = useSelector((state) => state.colorReducer.funColors);
  const classes = useStyles();
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

  const tempStyle = {
    color: funColors ? tempColor : "Black",
  };

  const feelStyle = {
    color: funColors ? feelColor : "Black",
  };

  const call = () => {
    if (city === "Unkown" || "") {
      setTemp("Enter a location Dumbass");
    } else {
      axios
        .request(options)
        .then(function (response) {
          //console.log(response.data);
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
    changeTempColor();
    changefeelColor();
  };

  const changeTempColor = () => {
    if (temp < 0) {
      setTempColor("#00FFFD");
    } else if (temp >= 0 && temp < 32) {
      setTempColor("#0094FF");
    } else if (temp >= 32 && temp < 60) {
      setTempColor("#0094FF");
    } else if (temp >= 60 && temp < 80) {
      setTempColor("#FFD100");
    } else if (temp >= 80 && temp < 100) {
      setTempColor("#FF9D00");
    } else if (temp >= 100) {
      setTempColor("#D50F09");
    }
  };

  const changefeelColor = () => {
    if (temp < 0) {
      setFeelColor("#00FFFD");
    } else if (temp >= 0 && temp < 32) {
      setFeelColor("#0094FF");
    } else if (temp >= 32 && temp < 60) {
      setFeelColor("#0094FF");
    } else if (temp >= 60 && temp < 80) {
      setFeelColor("#FFD100");
    } else if (temp >= 80 && temp < 100) {
      setFeelColor("#FF9D00");
    } else if (temp >= 100) {
      setFeelColor("#D50F09");
    }
  };

  useEffect(() => {
    if (city) {
      call();
    }
  }, []);

  return (
    <>
      <Paper className={classes.paper}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Typography style={tempStyle} variant="h1">
              {temp}&deg;
            </Typography>
          </Grid>
          <Grid item>
            <Typography style={feelStyle} variant="h2">
              {feel}&deg;
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h2">{weather}</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Button variant="contained" color="primary" onClick={() => call()}>
        Call
      </Button>
    </>
  );
}
