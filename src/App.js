import React from "react";
import axios from "axios";

export default function App() {
  const options = {
    method: "GET",
    url: "https://community-open-weather-map.p.rapidapi.com/weather",
    params: {
      q: "London,uk",
      lat: "0",
      lon: "0",
      callback: "test",
      id: "2172797",
      lang: "null",
      units: '"metric" or "imperial"',
      mode: "xml, html",
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
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <button onClick={() => call()}>Call</button>
    </div>
  );
}
