import React from 'react';
import './Score.css';

const Score = ({ score, highScore }) => {
  return (
    <div className="score-container">
      <div className="current-score">Score: {score}</div>
      <div className="high-score">Best: {highScore}</div>
    </div>
  );
};

export default Score;
