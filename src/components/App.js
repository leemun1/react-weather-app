import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

// openweather api
const apiBaseUrl = `http://api.openweathermap.org/data/2.5/weather?`;
const apiKey = process.env.REACT_APP_API_KEY;

class App extends Component {
  state = {
    city: "",
    day: "",
    date: "",
    dayOrNight: "",
    icon: "",
    condition: "",
    temperature: ""
  };

  getCurrentWeather = () => {
    axios("http://ipinfo.io/json")
      .then(({ data }) => {
        this.setState({
          city: data.city
        });
        return data.loc.split(",");
      })
      .then(([lat, lon]) => {
        const apiCall = `${apiBaseUrl}lat=${lat}&lon=${lon}&appid=${apiKey}`;
        axios(apiCall).then(({ data }) => {
          this.setState({
            day: moment.unix(data.dt).format("dddd"),
            date: moment.unix(data.dt).format("MMM Do YYYY"),
            dayOrNight: data.weather[0].icon,
            icon: data.weather[0].id,
            condition: data.weather[0].description,
            temperature: Math.round(data.main.temp - 273.15)
          });
          console.log(data.dt);
          console.log(moment.unix(data.dt));
        });
      });
  };

  componentDidMount() {
    this.getCurrentWeather();
  }

  render() {
    const {
      day,
      date,
      city,
      dayOrNight,
      icon,
      temperature,
      condition
    } = this.state;

    return (
      <div className="main-app">
        {dayOrNight.match(/[d]/i) ? (
          <i className={`icon wi wi-owm-day-${icon}`} />
        ) : (
          <i className={`icon wi wi-owm-night-${icon}`} />
        )}
        <h1 className="temperature">{temperature} °c</h1>
        <br />
        <h1 className="city">{city}</h1>
        <h1 className="condition">{condition}</h1>
        <h1 className="day">{day}</h1>
        <h1 className="date">{date}</h1>
      </div>
    );
  }
}

export default App;
