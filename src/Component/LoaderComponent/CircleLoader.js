import React, { useEffect, useState } from 'react';
// import './LoaderComponent.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';


const CircleLoader = (props) => {
  const progress = props.progress ? props.progress : 0;
  const animation = props.animation ? props.animation : 'all 3s'
  const size = props.size?props.size:65
  const strokeWidth = props.strokeWidth?props.strokeWidth:2
  const percentage = 100
  const activeColor = props.activeColor && props.activeColor ? props.activeColor : "#FDCC5D"
  const color = props.color && props.color ? props.color : "#ccc"
  const viewBox = `0 0 ${size} ${size}`;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI * 2;
  const dash = (progress * circumference) / 100;

  // useEffect(() => {
  //   setProgress(percentage);
  // }, [percentage]);

  return (

    <div className="CircleLoader">
      <svg width={size} height={size} viewBox={viewBox}>
        <circle
          fill="none"
          stroke={color}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
        />
        <circle
          fill="none"
          stroke={activeColor}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          strokeDasharray={[dash, circumference - dash]}
          strokeLinecap="round"
          style={{ transition: animation }}
        />
        {/* <text
          fill="#fff"
          fontSize="40px"
          x="50%"
          y="50%"
          dy="20px"
          textAnchor="middle"
        >
          {`${percentage}%`}
        </text> */}
      </svg>
      <div className="arrowPosition">
        {props.action==-1?<LazyLoadImage style={{ transform: `scaleX(-1)` }}  effect="" src={`/assets/images/homepage/Group137.png`} alt="next" width="auto" height="auto" />:<LazyLoadImage effect="" src={`/assets/images/homepage/Group137.png`} alt="next" width="auto" height="auto" /> }
        {/* <LazyLoadImage style={{ transform: `scaleX(${props.action && props.action ? props.action : 1})` }}  effect="" src={`/assets/images/homepage/Group137.png`} alt="next" width="auto" height="auto" /> */}
      </div>
    </div>
  );
}


CircleLoader.propTypes = {};

CircleLoader.defaultProps = {};

export default CircleLoader;

