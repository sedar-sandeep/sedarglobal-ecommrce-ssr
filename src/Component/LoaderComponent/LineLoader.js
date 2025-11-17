import React, { useEffect, useState } from 'react';

const LineLoader = (props) => {

  return (
    <>
      <div className="LineLoader">
        <div className="progress">
          <div className="progress-value" style={{ animation: props.animation }}></div>
        </div>
      </div>
    </>
  );
}

export default LineLoader;

