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
  const [forecast, setForecast] = useState([]);
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

  //api call to get forecast data
  const call = () => {
    axios
      .request(options)
      .then(function (response) {
        const data = response.data.list;
        if (data.length) {
          if (rounded) {
            setForecast(
              data.map((value) => {
                return {
                  id: data.index,
                  min: Math.round(value.temp.min),
                  max: Math.round(value.temp.max),
                };
              })
            );
          } else if (!rounded) {
            setForecast(
              data.map((value) => {
                return {
                  id: data.index,
                  min: value.temp.min,
                  max: value.temp.max,
                };
              })
            );
          }
        }
      })

      .catch(function (error) {
        console.error(error);
      });
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
        {forecast.map((forecast) => (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItemss="center"
          >
            <Grid item key={forecast.id}>
              {"low " + forecast.min}
            </Grid>
            <Grid item key={forecast.id}>
              {"High" + forecast.max}
            </Grid>
          </Grid>
        ))}
      </Paper>
    </>
  );
}
