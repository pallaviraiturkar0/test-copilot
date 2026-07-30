import React from 'react';
import './Pipe.css';

const Pipe = ({ x, topHeight, gap, width, gameHeight }) => {
  const bottomHeight = gameHeight - topHeight - gap;
  
  return (
    <>
      <div
        className="pipe pipe-top"
        style={{
          left: `${x}px`,
          width: `${width}px`,
          height: `${topHeight}px`,
          top: 0
        }}
      />
      <div
        className="pipe pipe-bottom"
        style={{
          left: `${x}px`,
          width: `${width}px`,
          height: `${bottomHeight}px`,
          bottom: 0
        }}
      />
    </>
  );
};

export default Pipe;
