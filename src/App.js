import React, { useEffect, useState } from "react";
import axios from "axios";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default function App() {
  const [open, setOpen] = useState(false);
  const [unit, setUnit] = useState("imperial");
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [check, setCheck] = useState(false);
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
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        console.log(response.data.main.temp);
        setTemp(response.data.main.temp);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    unitChange();
  });

  const unitChange = () => {
    if (check === true) {
      setUnit("metric");
    } else {
      setUnit("imperial");
    }
  };

  return (
    <div className="App">
      <IconButton onClick={() => setOpen(true)}>
        <SettingsIcon />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <List>
          <ListItem>
            <Grid container alignItems="center">
              <Grid item>Imperial</Grid>
              <Grid item>
                <Switch
                  checked={check}
                  onChange={() => setCheck(!check)}
                ></Switch>
              </Grid>
              <Grid item>Metric</Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <TextField
              label="Location"
              variant="outlined"
              onChange={(e) => setCity(e.target.value)}
            ></TextField>
          </ListItem>
        </List>
      </Drawer>
      <button onClick={() => call()}>Call</button>
      <h1>{temp}</h1>
    </div>
  );
}
