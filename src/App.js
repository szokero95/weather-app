import { useState, useEffect } from "react";
import imageProvider from "./imageProvider";
import "./styles.css";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
    "X-RapidAPI-Host": process.env.REACT_APP_HOST,
  },
};

export default function App() {
  const [bg, setBg] = useState(imageProvider(1000, 1));
  const [weather, setWeather] = useState();
  const [city, setCity] = useState("");

  const search = (e) => {
    if (e.key === "Enter") {
      //Conversion, because api doesn't suppport non english chars
      fetch(
        `https://weatherapi-com.p.rapidapi.com/current.json?q=${city
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")}`,
        options
      )
        .then((response) => response.json())
        .then((result) => {
          if (!result.error) setWeather(result);
        })
        .catch((err) => console.error(err));
      e.target.blur();
    }
  };

  useEffect(() => {
    console.log(options);
    if (weather) {
      setBg(
        imageProvider(weather.current.condition.code, weather.current.is_day)
      );
      console.log(
        imageProvider(weather.current.condition.code, weather.current.is_day)
      );
    }
  }, [weather]);

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <main>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setCity(e.target.value)}
            value={city}
            onKeyPress={search}
          />
        </div>
        {weather && !weather.error ? (
          <div className="result">
            <h2>
              {weather.location.name}, {weather.location.country}
            </h2>
            <h3>{weather.current.temp_c} °C</h3>
            <h4>{weather.current.condition.text}</h4>
            <p>Wind: {weather.current.wind_kph} KM/H</p>
          </div>
        ) : (
          <></>
        )}
      </main>
    </div>
  );
}
