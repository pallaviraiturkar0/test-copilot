import { useEffect, useRef, useCallback } from 'react';
import { GRAVITY, JUMP_STRENGTH, PIPE_SPEED, GAME_HEIGHT } from '../utils/constants';
import { checkCollision, checkBoundary } from '../utils/collision';

export const useGameLoop = (gameState, bird, setBird, pipes, setPipes, incrementScore, onGameOver) => {
  const requestRef = useRef();
  const lastTimeRef = useRef(0);

  const gameLoop = useCallback((timestamp) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = timestamp;
    }

    const deltaTime = timestamp - lastTimeRef.current;
    
    if (deltaTime >= 16) { // ~60 FPS
      if (gameState === 'PLAYING') {
        // Update bird position and velocity
        setBird(prevBird => {
          const newVelocity = prevBird.velocity + GRAVITY;
          const newY = prevBird.y + newVelocity;
          
          return {
            ...prevBird,
            y: newY,
            velocity: newVelocity
          };
        });

        // Update pipes position and check for scoring
        setPipes(prevPipes => {
          return prevPipes.map(pipe => {
            const newX = pipe.x - PIPE_SPEED;
            
            // Check if bird passed the pipe
            if (!pipe.passed && newX + pipe.width < bird.x) {
              incrementScore();
              return { ...pipe, x: newX, passed: true };
            }
            
            return { ...pipe, x: newX };
          }).filter(pipe => pipe.x > -pipe.width); // Remove pipes that are off screen
        });

        // Check collisions
        let collision = false;
        pipes.forEach(pipe => {
          if (checkCollision(bird, pipe)) {
            collision = true;
          }
        });

        if (collision || checkBoundary(bird, GAME_HEIGHT)) {
          onGameOver();
        }
      }
      
      lastTimeRef.current = timestamp;
    }

    requestRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, bird, pipes, setBird, setPipes, incrementScore, onGameOver]);

  useEffect(() => {
    if (gameState === 'PLAYING') {
      requestRef.current = requestAnimationFrame(gameLoop);
      return () => {
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
        }
      };
    }
  }, [gameState, gameLoop]);

  const jump = useCallback(() => {
    if (gameState === 'PLAYING') {
      setBird(prevBird => ({
        ...prevBird,
        velocity: JUMP_STRENGTH
      }));
    }
  }, [gameState, setBird]);

  return { jump };
};
