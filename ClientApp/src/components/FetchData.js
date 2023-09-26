import React, { useEffect, useState } from "react";

export function FetchData() {
  const [forecasts, setForecasts] = useState([]);
  const [demo, setDemo] = useState("");

  const populateWeatherData = async () => {
    const response = await fetch("weatherforecast");
    const data = await response.json();
    setForecasts(data);
  };

  const populateDemoData = async () => {
    const response = await fetch("demo");
    const data = await response.text();
    setDemo(data);
  };

  useEffect(() => {
    populateWeatherData();
    populateDemoData()
  }, []);

  return (
    <table className="table table-striped" aria-labelledby="tabelLabel">
      {demo}
      <thead>
        <tr>
          <th>Date</th>
          <th>Temp. (C)</th>
          <th>Temp. (F)</th>
          <th>Summary</th>
        </tr>
      </thead>
      <tbody>
        {forecasts.map((forecast) => (
          <tr key={forecast.date}>
            <td>{forecast.date}</td>
            <td>{forecast.temperatureC}</td>
            <td>{forecast.temperatureF}</td>
            <td>{forecast.summary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
