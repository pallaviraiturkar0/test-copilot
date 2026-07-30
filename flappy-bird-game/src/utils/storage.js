// Local storage utilities for high score
const HIGH_SCORE_KEY = 'flappyBirdHighScore';

export const getHighScore = () => {
  const score = localStorage.getItem(HIGH_SCORE_KEY);
  return score ? parseInt(score, 10) : 0;
};

export const setHighScore = (score) => {
  const currentHighScore = getHighScore();
  if (score > currentHighScore) {
    localStorage.setItem(HIGH_SCORE_KEY, score.toString());
    return true;
  }
  return false;
};
