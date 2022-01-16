import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [userInput, setUserInput] = useState("");
  const [backendData, setBackendData] = useState([{}]);
  const [location, setLocation] = useState([]);
  const [forecast, setForecast] = useState([]);

  console.log(userInput);

  useEffect(() => {
    const search = async () => {
      try {
        const data = await axios.get(`/weather?address=${userInput}`);
        setBackendData(data.data);
        setLocation(data.data.location);
        setForecast(data.data.forecast);
      } catch (e) {
        throw new Error("something went wrong");
      }
    };
    search();
  }, [userInput]);

  console.log(backendData);

  return (
    <div className="input-container">
      <div>
      <label>Enter an address:</label>
      <input
        onChange={(e) => setUserInput(e.target.value)}
        value={userInput}
      ></input>
    </div>
      <div className="weather-container">
        <div>{`The selected location is: ${location}`}</div>
        <div>{`The weather there is ${forecast}`}</div>
      </div>
    </div>
  );
}

export default App;
