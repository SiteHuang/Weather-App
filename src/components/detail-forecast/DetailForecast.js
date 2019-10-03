import React from "react";
import BarComponent from "./BarComponent";

class DetailForecast extends React.Component {
  constructor(props) {
    super(props);
    this.barContainerDom = React.createRef();
    this.state = {
      styleInfo: []
    };
  }

  componentDidMount() {
    this.calculateBarStyles(this.props.forecast);
  }

  getBarComponents() {
    return this.state.styleInfo.map((item,index) => {
      return <BarComponent 
        key={index}
        left={item.marginLeft} 
        height={item.height} 
        day={item.day} 
        temp={item.temp}
        animationDelay={item.animationDelay}></BarComponent>;
    });
  }

  calculateBarStyles(data) {
    const width = this.barContainerDom.current.clientWidth;
    const keys = Object.keys(data);
    const values = Object.values(data);

    var barList = [];
    const maxTemp = Math.max(...values);
    console.log(maxTemp);

    for (let index = 0; index < keys.length; index++) {
      const marginLeft = (width / (keys.length + 1)) * (index + 1) - 10 + "px";
      const temp = values[index];
      const height = (temp / maxTemp).toFixed(2) * 100 + "px";
      const day = keys[index];
      const animationDelay = 100 * index;

      barList.push({
        marginLeft: marginLeft,
        temp: temp,
        height: height,
        day: day,
        animationDelay: animationDelay
      });
    }
    this.setState({
      styleInfo: barList
    });
  }

  render() {
    return (
      <div className="detail-temperature-container">
        <p>Temperature</p>
        <div className="igFrameBar" ref={this.barContainerDom}>
          {/* <BarComponent width={this.state.barWidth} total="7" i="2"></BarComponent> */}
          {this.getBarComponents()}

          {/* <div class="igData line igData1" ><p>50</p><span>2pm</span></div>
          <div class="igData line igData2"></div>
          <div class="igData line igData3"></div>
          <div class="igData line igData4"></div>
          <div class="igData line igData5"></div>
          <div class="igData line igData6"></div>
          <div class="igData line igData7"></div>
          <div class="igData line igData8"></div>
          <div class="igData line igData9"></div>
          <div class="igData line igData10"></div> */}
        </div>
      </div>
    );
  }
}

export default DetailForecast;
