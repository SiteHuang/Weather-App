import React from "react";

class BarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.barDom = React.createRef();
  }

  componentDidMount() {
    console.log(this.props.animationDelay);
    // this.barDom.current.style.height = this.props.height;
    // console.log('width',this.props.width);
    // console.log('total',this.props.total);
    this.barDom.current.style.left = this.props.left;
    this.barDom.current.animate(
      [{ height: 0 }, { height: this.props.height }],{
        duration: 800,
        delay: this.props.animationDelay,
        fill: 'forwards'
      }
    );
  }

  render() {
    return (
      <div className="igFrameBar-igData" ref={this.barDom}>
        <span className="igFrameBar-igData-degree">{this.props.temp}&#176;</span>
        <span className="igFrameBar-igData-time">{this.props.day}</span>
      </div>
    );
  }
}
export default BarComponent;
