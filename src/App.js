import React, { useState } from "react";
import "./app.css";
import axios from "axios";
import {
  FaThermometerHalf,
  FaTemperatureHigh,
  FaTemperatureLow,
} from "react-icons/fa";
import { BsSunset, BsSunrise, BsPinMap } from "react-icons/bs";
import { SlSpeedometer } from "react-icons/sl";
import { WiHumidity } from "react-icons/wi";



const App = () => {
  const [cityName, setCityName] = useState("");
  const [response, setResponse] = useState({});
  const [error, setError] = useState("");
  const [dayTime, setDayTime] = useState("");
  const [className, setClassName] = useState("");
  const [degrees, setDegrees] = useState("");
  // console.log(cityName);

  const key = "b9cad901e37fd0885dfdf408eed10cb9";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${key}`;

  // GET DATA FROM API
  const getData = (e) => {
    if (e.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setResponse(response.data);
          console.log(response.data);
          checkDayTime();
        })
        .catch((error) => setError(error.toJSON()));
      setCityName("");
    }
  };

  const convertEpochToDate = (epoch) => {
    const date = new Date(epoch * 1000);
    const hours = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");
    if (hours - 12 >= 0) {
      const time = `${(hours - 12)
        .toString()
        .padStart(2, "0")}:${minute}:${second} pm`;
      return time;
    } else {
      const time = `${hours}:${minute}:${second} am`;
      return time;
    }
  };

  const checkDayTime = () => {
    const date = Date.now();
    const time = new Date(date);
    const hours = time.getHours();
    if (hours > 20) {
    }
  };

  const changeFaradToCelsius = (farad) => {
    const celsius = (farad - 32) / 1.8 + " \u00b0C";
    const Farad = farad + " \u00b0F";
    return Farad;
  };

  return (
    <div className="container">
      <div className="weatherInfoBox">
        <div className="header">
          <h2 className="cityName">{response.name}</h2>
          <p className="tempDegre">{`${
            response.main ? changeFaradToCelsius(response.main.temp) : ""
          } `}</p>
        </div>
        <div className="showWeatherBox">
          <div className="inputBox">
            <input
              type="text"
              placeholder="add city..."
              onKeyPress={getData}
              value={cityName}
              onChange={(event) => setCityName(event.target.value)}
            />
          </div>

          <div className="infoBox">
            <div className="maximumTemp">
              <FaTemperatureHigh />
              {`Maximum : ${
                response.main ? response.main.temp_max + " \u00b0F" : ""
              }`}
            </div>
            <div>
              <FaTemperatureLow className="icon" />
              {`Minimum : ${
                response.main ? response.main.temp_min + " \u00b0F" : ""
              }`}
            </div>
            <div>
              <FaThermometerHalf />
              {`Feels like : ${
                response.main ? response.main.feels_like + " \u00b0F" : ""
              }`}
            </div>
            <div>
              {`Description : ${
                response.weather ? response.weather[0].description : ""
              }`}
            </div>
            <div>
              <BsPinMap />
              {`Country : ${response.sys ? response.sys.country : ""}`}
            </div>
            <div>
              <WiHumidity />
              {`Humidity : ${response.main ? response.main.humidity : ""}`}
            </div>
            <div>
              <SlSpeedometer />
              {`Pressure : ${
                response.main ? response.main.pressure + " Pa" : ""
              }`}
            </div>
            <div className="sunTimig">
              <div>
                <BsSunrise />
                {`SunRise : ${
                  response.sys ? convertEpochToDate(response.sys.sunrise) : ""
                }`}
              </div>
              <div className="sunsetTimig">
                <BsSunset />
                {` SunSet : ${
                  response.sys ? convertEpochToDate(response.sys.sunset) : ""
                }`}
              </div>
            </div>

            {/* <p>{response.sys.country}</p>
        <p>{response.sys.sunrise}</p>
        <p>{response.sys.sunset}</p>
        <p>{response.weather.description}</p>
        <p>{response.wind.speed}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
