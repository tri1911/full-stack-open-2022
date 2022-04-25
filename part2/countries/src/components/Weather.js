import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      )
      .then((response) => setWeather(response.data));
  }, [city]);

  return (
    weather && (
      <div>
        <h3>Weather in {city}</h3>

        <div>temperature {weather.main.temp} Celsius</div>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="Weather icon"
        />
        <div>wind {weather.wind.speed} m/s/</div>
      </div>
    )
  );
};

export default Weather;
