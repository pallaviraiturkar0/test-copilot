# Flappy Bird React Game 🎮

A fun Flappy Bird clone built with React and Vite!

## Features

- 🐦 Smooth bird physics with gravity and jump mechanics
- 🎯 Randomly generated pipe obstacles
- 💯 Score tracking with local storage for high scores
- 🎨 Beautiful gradient UI with animations
- 📱 Responsive controls (click, tap, or spacebar)
- 🔄 Game state management (Ready, Playing, Game Over)
- ⚡ Built with Vite for fast development

## How to Play

1. Click the "Start Game" button to begin
2. Click anywhere on the game board, tap (on mobile), or press SPACE to make the bird flap
3. Avoid the green pipes!
4. Try to get the highest score possible

## Controls

- **Mouse**: Click on the game board to flap
- **Keyboard**: Press SPACE to flap
- **Touch**: Tap the screen to flap (mobile)

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Game.jsx           # Main game component
│   ├── Game.css
│   ├── Bird.jsx           # Bird component
│   ├── Bird.css
│   ├── Pipe.jsx           # Pipe obstacle component
│   ├── Pipe.css
│   ├── Score.jsx          # Score display
│   ├── Score.css
│   ├── GameOver.jsx       # Game over modal
│   ├── GameOver.css
│   ├── StartScreen.jsx    # Start screen
│   └── StartScreen.css
├── hooks/
│   └── useGameLoop.js     # Custom hook for game loop
├── utils/
│   ├── constants.js       # Game constants
│   ├── collision.js       # Collision detection logic
│   └── storage.js         # Local storage utilities
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

## Game Mechanics

- **Gravity**: Constant downward acceleration applied to the bird
- **Jump**: Upward velocity applied when player flaps
- **Pipes**: Spawn every 2 seconds with random heights
- **Collision Detection**: AABB (Axis-Aligned Bounding Box) collision system
- **Scoring**: Increment score when bird passes through pipes
- **High Score**: Automatically saved to localStorage

## Technologies Used

- React 18+
- Vite 7+
- CSS3 with gradients and animations
- requestAnimationFrame for smooth 60 FPS gameplay
- localStorage API for persistent high scores

## Development

The game uses React hooks for state management and a custom `useGameLoop` hook that leverages `requestAnimationFrame` for smooth 60 FPS gameplay.

Key components:
- Game loop runs at ~60 FPS
- Physics updated every frame
- Collision detection using AABB algorithm
- State management with React hooks

## Tips for Playing

- 🎯 Timing is everything! Don't tap too early or too late
- 🚀 Try to maintain a steady rhythm
- 💪 The game gets harder as you progress
- 🏆 Beat your high score!

## License

MIT

## Credits

Inspired by the original Flappy Bird game by Dong Nguyen.
