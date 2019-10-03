import React from "react";
import CurrentWeather from "../current-weather/CurrentWeather";
import SearchBar from "../search-bar/SearchBar";
import weather from "../../apis/weather";
import DetailWeather from "../detail-weather/DetailWeather";
import DetailForecast from "../detail-forecast/DetailForecast";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      currRawData: {},
      currData: {
        temp: 0,
        description: "",
        city: "",
        time: "",
      },
      currWeatherCondition: "",
      forecastWeather: {}
    };
  }

  componentDidMount() {
    // calling api to get weather data
    weather
      .get("weather", {
        params: {
          q: "Melbourne",
          appid: "ac844fe4fb88e2c1ab652f2d160d053e",
          units: "metric"
        }
      })
      .then(response => {
        // handle success
        console.log(response);

        this.setState({
          currRawData: response,
          currData: {
            temp: response.data.main.temp.toFixed(0),
            description: response.data.weather[0].description,
            city: response.data.name,
            time: this.timeConverter(response.data.dt),
          },
          currWeatherCondition: response.data.weather[0].main
        });
      });
    
    weather
      .get("forecast", {
        params: {
          q: "Melbourne",
          appid: "ac844fe4fb88e2c1ab652f2d160d053e",
          units: "metric"
        }
      })
      .then((response)=> {
        // handle success
        console.log(response);
        const allForecast = response.data.list;
        let forecasts = {};
        let whichDay = this.getDate(allForecast[0].dt);
        let tempList = []
        allForecast.forEach(item => {
          const day = this.getDate(item.dt);
          if (day === whichDay) {
            tempList.push(item.main.temp)
          } else {
            forecasts[whichDay] = tempList;
            whichDay = day;
            tempList = []
          }
        });
        Object.keys(forecasts).forEach((key) => {
          forecasts[key] = (forecasts[key].reduce((sum, val) => {
            return sum + val;
          }, 0) / forecasts[key].length).toFixed(0);
        })

        this.setState({
          forecastWeather: forecasts,
          loading: false 
        })
      });

    
  }

  getHour(UNIX_timestamp) {
    const a = new Date(UNIX_timestamp * 1000);
    const hour = a.getHours();
    return hour > 12 ? hour - 12 + "PM" : hour + "AM";
  }

  getDate(UNIX_timestamp) {
    const a = new Date(UNIX_timestamp * 1000);
    return a.getDate();
  }

  timeConverter(UNIX_timestamp) {
    const a = new Date(UNIX_timestamp * 1000);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const day = days[a.getDay() - 1];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const min = a.getMinutes();
    const hour = a.getHours();
    const currTime = hour > 12 ? hour - 12 + ":" + min + "PM" : hour + ":" + min + "AM";
    const time = day + " - " + date + " " + month + " " + year + " - " + currTime;
    return time;
  }

  render() {
    if (this.state.loading) {
      return (<div></div>)
    }


    return (
      <div className="app-container">
        <div className="app">
          <div className="left-container">
            <SearchBar></SearchBar>
            <CurrentWeather
              temp={this.state.currData.temp}
              description={this.state.currData.description}
              city={this.state.currData.city}
              time={this.state.currData.time}
            ></CurrentWeather>
          </div>
          <div className="right-container">
            <DetailWeather></DetailWeather>
            <DetailForecast forecast={this.state.forecastWeather}></DetailForecast>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
