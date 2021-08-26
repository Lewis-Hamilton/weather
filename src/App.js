export default function App() {
  fetch("https://dad-jokes.p.rapidapi.com/random/joke/png", {
    method: "GET",
    headers: {
      "x-rapidapi-host": "dad-jokes.p.rapidapi.com",
      "x-rapidapi-key": "7076ad1595msh127766a5ba6d357p18e999jsn3e77642477f6",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });

  const call = () => {
    console.log("hello");
  };
  return (
    <div className="App">
      <button onClick={() => call()}>Call</button>
    </div>
  );
}
