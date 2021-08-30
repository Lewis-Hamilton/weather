import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [unit, setUnit] = useState("imperial");
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
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

  return (
    <div className="App">
      <input onChange={(e) => setCity(e.target.value)}></input>
      <button onClick={() => setUnit("metric")}>Metric</button>
      <button onClick={() => setUnit("imperial")}>Imperial</button>
      <button onClick={() => call()}>Call</button>
      <h1>{temp}</h1>
    </div>
  );
}
