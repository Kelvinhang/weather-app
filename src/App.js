import "./App.css";
import React, {useState, useEffect} from "react";
import { format } from "date-fns";
import tempImg from "./images/temp.png";
import feelsLikeImg from "./images/feelsLike.png";
import humidityImg from "./images/humidity.png";
import windSpeedImg from "./images/windSpeed.png";
import visibilityImg from "./images/visibility.png";
import cloudinessImg from "./images/cloudiness.png";

function App() {
  const [weatherInfo, setweatherInfo] = useState({
    city: "",
    date: "",
    temp: "",
    feelsLike: "",
    humidity: "",
    windSpeed: "",
    visibility: "",
    cloudiness: ""
  });

  async function getWeatherInfo(location, metric) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=7c06df40661810ca2b8d0dc66cd6da77&units=${metric}`,
    { mode: "cors" });
    const weatherData = await response.json();
    changeLocation(weatherData);
    console.log("run");
  }

  function changeLocation(data) {
    setweatherInfo({city: data.name,
      date: format(new Date(), "cccc LLLL d, yyyy"),
      temp: data.main.temp + "℃",
      feelsLike: data.main.feels_like + "℃",
      humidity: data.main.humidity + "%",
      windSpeed: data.wind.speed + "m/s",
      visibility: data.visibility/1000 + "km",
      cloudiness: data.clouds.all + "%"
    })
  }

  function searchLocation(e) {
      if (e.key === "Enter") {
        getWeatherInfo(e.target.value, "metric");
        e.target.value = "";
      }
  }

  useEffect(() => {
    getWeatherInfo("hong kong", "metric");
  },[]);

  return (
    <div className="weatherApp">
      <div className="locationInfo">
        <div className="form__group field">
          <input
            className="form__field"
            type="text"
            placeholder="Search location.."
            onKeyDown={searchLocation}
          />
          <label className="form__label">Search location</label>
        </div>
        <div className="city">{weatherInfo.city}</div>
        <div className="date">{weatherInfo.date}</div>
      </div>
      <div className="weatherInfo">
        <div className="section">
          <div className="temp">
            <div className="weatherImg">
              <img src={tempImg} alt="tempImg"></img>
            </div>
            <div className="weatherDetail">
              <h6>Temperature</h6>
              <p>{weatherInfo.temp}</p>
            </div>
          </div>
          <div className="feelsLike">
            <div className="weatherImg">
              <img src={feelsLikeImg} alt="feelsLikeImg"></img>
            </div>
            <div className="weatherDetail">
              <h6>Feels like</h6>
              <p>{weatherInfo.feelsLike}</p>
            </div>
          </div>
          <div className="humidity">
            <div className="weatherImg">
              <img src={humidityImg} alt="humidityImg"></img>
            </div>
            <div className="weatherDetail">
              <h6>Humidity</h6>
              <p>{weatherInfo.humidity}</p>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="windSpeed">
            <div className="weatherImg">
              <img src={windSpeedImg} alt="windSpeedImg"></img>
            </div>
            <div className="weatherDetail">
              <h6>Wind speed</h6>
              <p>{weatherInfo.windSpeed}</p>
            </div>
          </div>
          <div className="visibility">
            <div className="weatherImg">
              <img src={visibilityImg} alt="visibilityImg"></img>
            </div>
            <div className="weatherDetail">
              <h6>Visibility</h6>
              <p>{weatherInfo.visibility}</p>
            </div>
          </div>
          <div className="cloudiness">
            <div className="weatherImg">
              <img src={cloudinessImg} alt="cloudinessImg"></img>
            </div>
            <div className="weatherDetail">
              <h6>Cloudiness</h6>
              <p>{weatherInfo.cloudiness}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
