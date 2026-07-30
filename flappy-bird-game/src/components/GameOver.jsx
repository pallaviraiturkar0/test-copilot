import React from 'react';
import './GameOver.css';

const GameOver = ({ score, highScore, onRestart }) => {
  const isNewHighScore = score === highScore && score > 0;
  
  return (
    <div className="game-over-overlay">
      <div className="game-over-modal">
        <h1 className="game-over-title">Game Over!</h1>
        {isNewHighScore && <div className="new-high-score">🎉 New High Score! 🎉</div>}
        <div className="final-score">
          <div>Score: {score}</div>
          <div>Best: {highScore}</div>
        </div>
        <button className="restart-button" onClick={onRestart}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOver;
