import React from 'react';
import './StartScreen.css';

const StartScreen = ({ onStart }) => {
  return (
    <div className="start-screen">
      <div className="start-content">
        <h1 className="game-title">Flappy Bird</h1>
        <div className="instructions">
          <p>Click, tap, or press SPACE to flap</p>
          <p>Avoid the pipes!</p>
        </div>
        <button className="start-button" onClick={onStart}>
          Start Game
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
