import React from 'react';
import './Bird.css';

const Bird = ({ x, y, width, height }) => {
  return (
    <div
      className="bird"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`
      }}
    />
  );
};

export default Bird;
