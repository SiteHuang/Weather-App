import React from 'react';
import PieComponent from './PieComponent';

class DetailWeather extends React.Component {

  render() {
    return (
      <div className='detail-weather-container'>
        <div className='time-container'>
          <p className='time-container-sunrise'>sunrise 5:44am</p>
          <p className='time-container-sunset'>sunset 8.57pm</p>
        </div>
        <div className='related-weather-info-container'>
          <PieComponent label='Pressure' pienum='45'></PieComponent>
          <PieComponent label='Humidity' pienum='65'></PieComponent>
          <PieComponent label='Wind' pienum='85'></PieComponent>
        </div>
      </div>
    )
  }
}

export default DetailWeather;