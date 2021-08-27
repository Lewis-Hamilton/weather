import React from "react";

export default function App() {
  const call = () => {
    fetch("https://dad-jokes.p.rapidapi.com/random/joke/png", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "dad-jokes.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response.body.setup);
        console.log(response.body.punchline);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="App">
      <button onClick={() => call()}>Call</button>
    </div>
  );
}
