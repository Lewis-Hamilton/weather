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
  const [forecast, setForecast] = useState([]);
  var tempArray = [];
  const unit = useSelector((state) => state.unitReducer.unit);
  const city = useSelector((state) => state.locationReducer.location);
  const rounded = useSelector((state) => state.tempReducer.rounded);
  const classes = useStyles();
  const options = {
    method: "GET",
    url: "https://community-open-weather-map.p.rapidapi.com/forecast/daily",
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
          const data = response.data.list;
          setForecast(
            data.map((value) => {
              return {
                min: value.temp.min,
                max: value.temp.max,
              };
            })
          );
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
      <Button onClick={() => call()}>forecast</Button>
      <Paper className={classes.paper}>
        <Typography variant="h6">Daily Forecast</Typography>
        <Grid>
          {forecast.map((forecast) => (
            <>
              <Grid item key={forecast.min}>
                {"low " + forecast.min}
              </Grid>
              <Grid item key={forecast.max}>
                {"High" + forecast.max}
              </Grid>
            </>
          ))}
        </Grid>
      </Paper>
    </>
  );
}
