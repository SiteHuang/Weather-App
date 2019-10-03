import React from 'react';

const DetailPie = (props) => {
  return (
    <div className={`pie progress-${props.pienum}`}>
      <span className="pie-number">{props.pienum}<span className="pie-percent">%</span></span>
      <div className="pie-container">
        <div className="left-side half-circle"></div>
        <div className="right-side half-circle"></div>
      </div>
      <div className="pie-shadow"></div>
      <div className="pie-label">{props.label}</div>
    </div>
  )
}

export default DetailPie;