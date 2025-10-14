import React, { useState, useEffect, useCallback } from 'react';
import Bird from './Bird';
import Pipe from './Pipe';
import Score from './Score';
import GameOver from './GameOver';
import StartScreen from './StartScreen';
import { useGameLoop } from '../hooks/useGameLoop';
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  BIRD_WIDTH,
  BIRD_HEIGHT,
  BIRD_X,
  PIPE_WIDTH,
  PIPE_GAP,
  PIPE_SPAWN_INTERVAL,
  GAME_STATES
} from '../utils/constants';
import { getHighScore, setHighScore } from '../utils/storage';
import './Game.css';

const Game = () => {
  const [gameState, setGameState] = useState(GAME_STATES.READY);
  const [score, setScore] = useState(0);
  const [highScore, setHighScoreState] = useState(getHighScore());
  const [bird, setBird] = useState({
    x: BIRD_X,
    y: GAME_HEIGHT / 2,
    width: BIRD_WIDTH,
    height: BIRD_HEIGHT,
    velocity: 0
  });
  const [pipes, setPipes] = useState([]);

  const incrementScore = useCallback(() => {
    setScore(prev => {
      const newScore = prev + 1;
      if (setHighScore(newScore)) {
        setHighScoreState(newScore);
      }
      return newScore;
    });
  }, []);

  const handleGameOver = useCallback(() => {
    setGameState(GAME_STATES.GAME_OVER);
  }, []);

  const { jump } = useGameLoop(
    gameState,
    bird,
    setBird,
    pipes,
    setPipes,
    incrementScore,
    handleGameOver
  );

  // Generate pipes at intervals
  useEffect(() => {
    if (gameState === GAME_STATES.PLAYING) {
      const interval = setInterval(() => {
        const minHeight = 100;
        const maxHeight = GAME_HEIGHT - PIPE_GAP - 100;
        const topHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

        setPipes(prev => [
          ...prev,
          {
            x: GAME_WIDTH,
            topHeight,
            gap: PIPE_GAP,
            width: PIPE_WIDTH,
            bottomHeight: GAME_HEIGHT - topHeight - PIPE_GAP,
            passed: false
          }
        ]);
      }, PIPE_SPAWN_INTERVAL);

      return () => clearInterval(interval);
    }
  }, [gameState]);

  const handleStart = () => {
    setGameState(GAME_STATES.PLAYING);
    setScore(0);
    setBird({
      x: BIRD_X,
      y: GAME_HEIGHT / 2,
      width: BIRD_WIDTH,
      height: BIRD_HEIGHT,
      velocity: 0
    });
    setPipes([]);
  };

  const handleRestart = () => {
    handleStart();
  };

  const handleClick = () => {
    if (gameState === GAME_STATES.PLAYING) {
      jump();
    }
  };

  const handleKeyPress = useCallback((e) => {
    if (e.code === 'Space' && gameState === GAME_STATES.PLAYING) {
      e.preventDefault();
      jump();
    }
  }, [gameState, jump]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div className="game-container">
      <div
        className="game-board"
        onClick={handleClick}
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
      >
        <Bird x={bird.x} y={bird.y} width={bird.width} height={bird.height} />
        
        {pipes.map((pipe, index) => (
          <Pipe
            key={index}
            x={pipe.x}
            topHeight={pipe.topHeight}
            gap={pipe.gap}
            width={pipe.width}
            gameHeight={GAME_HEIGHT}
          />
        ))}

        <Score score={score} highScore={highScore} />

        {gameState === GAME_STATES.READY && <StartScreen onStart={handleStart} />}
        {gameState === GAME_STATES.GAME_OVER && (
          <GameOver score={score} highScore={highScore} onRestart={handleRestart} />
        )}
      </div>
    </div>
  );
};

export default Game;
