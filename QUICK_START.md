# Quick Start Guide
## Flappy Bird React Game

This guide provides a condensed version of the implementation plan for quick reference.

---

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Modern web browser
- Code editor (VS Code recommended)

---

## Setup (30 minutes)

### 1. Initialize Project
```bash
# Create React app with Vite
npm create vite@latest flappy-bird-game -- --template react

# Navigate and install
cd flappy-bird-game
npm install

# Verify it works
npm run dev
```

### 2. Create File Structure
```bash
mkdir -p src/components src/hooks src/utils
touch src/components/{Game,Bird,Pipe,Pipes,Ground,Score,StartScreen,GameOverScreen}.jsx
touch src/hooks/{useGameLoop,useKeyPress}.js
touch src/utils/{physics,collision,constants}.js
```

---

## Core Constants (src/utils/constants.js)

```javascript
export const GAME_WIDTH = 400;
export const GAME_HEIGHT = 600;

export const BIRD_WIDTH = 40;
export const BIRD_HEIGHT = 30;
export const BIRD_START_X = 100;
export const BIRD_START_Y = 250;

export const GRAVITY = 0.5;
export const FLAP_VELOCITY = -10;
export const MAX_FALL_SPEED = 10;

export const PIPE_WIDTH = 60;
export const PIPE_GAP = 150;
export const PIPE_SPEED = 2;
export const PIPE_SPAWN_INTERVAL = 200;

export const GROUND_HEIGHT = 100;

export const GAME_STATES = {
  READY: 'READY',
  PLAYING: 'PLAYING',
  GAME_OVER: 'GAME_OVER'
};
```

---

## Implementation Checklist

### Phase 1: Setup ✓
- [x] Initialize React with Vite
- [x] Create file structure
- [x] Define constants
- [x] Basic CSS setup

### Phase 2: Components (4-5 hrs)
- [ ] Bird component with positioning
- [ ] Pipe component (top & bottom)
- [ ] Pipes container component
- [ ] Ground component
- [ ] Score display component
- [ ] Start screen component
- [ ] Game over screen component

### Phase 3: Logic (4-5 hrs)
- [ ] Physics utilities (gravity, flap, position)
- [ ] Collision detection (AABB)
- [ ] Game loop hook (useGameLoop)
- [ ] Input hook (useKeyPress)
- [ ] Pipe generation logic

### Phase 4: Integration (3-4 hrs)
- [ ] Main Game component
- [ ] Initialize game state
- [ ] Integrate game loop
- [ ] Handle user input
- [ ] Implement collision detection
- [ ] Implement scoring system

### Phase 5: Polish (2-3 hrs)
- [ ] Visual polish & animations
- [ ] Responsive design
- [ ] Performance optimization
- [ ] Cross-browser testing
- [ ] Bug fixes

### Phase 6: Final (1-2 hrs)
- [ ] Update README
- [ ] Clean up code
- [ ] Production build
- [ ] (Optional) Deploy

---

## Key Algorithms

### Physics Update (every frame)
```javascript
// 1. Apply gravity
velocity += GRAVITY * deltaTime;

// 2. Update position
birdY += velocity * deltaTime;

// 3. Update pipes
pipes.forEach(pipe => {
  pipe.x -= PIPE_SPEED;
});

// 4. Check collisions
if (collision) {
  gameState = 'GAME_OVER';
}

// 5. Check score
if (birdPassedPipe && !pipe.passed) {
  score++;
  pipe.passed = true;
}
```

### Collision Detection
```javascript
function checkCollision(bird, pipe) {
  const birdRect = {
    x: bird.x,
    y: bird.y,
    width: BIRD_WIDTH,
    height: BIRD_HEIGHT
  };
  
  const topPipeRect = {
    x: pipe.x,
    y: 0,
    width: PIPE_WIDTH,
    height: pipe.topHeight
  };
  
  const bottomPipeRect = {
    x: pipe.x,
    y: pipe.topHeight + PIPE_GAP,
    width: PIPE_WIDTH,
    height: GAME_HEIGHT - pipe.topHeight - PIPE_GAP
  };
  
  return checkAABB(birdRect, topPipeRect) || 
         checkAABB(birdRect, bottomPipeRect);
}
```

---

## Component Props Quick Reference

### Bird
```javascript
<Bird x={number} y={number} velocity={number} />
```

### Pipe
```javascript
<Pipe x={number} topHeight={number} gap={number} />
```

### Pipes
```javascript
<Pipes pipes={array} />
```

### Score
```javascript
<Score score={number} />
```

### StartScreen
```javascript
<StartScreen onStart={function} />
```

### GameOverScreen
```javascript
<GameOverScreen 
  score={number} 
  highScore={number} 
  onRestart={function} 
/>
```

---

## Game State Structure

```javascript
const [gameState, setGameState] = useState({
  state: GAME_STATES.READY,
  bird: {
    x: BIRD_START_X,
    y: BIRD_START_Y,
    velocity: 0
  },
  pipes: [],
  score: 0,
  highScore: 0
});
```

---

## Common Pitfalls & Solutions

### Problem: Bird falls too fast
**Solution:** Adjust `GRAVITY` constant (lower value = slower fall)

### Problem: Game is too hard
**Solution:** Increase `PIPE_GAP` or decrease `PIPE_SPEED`

### Problem: Collision detection is off
**Solution:** Check bounding box calculations, add visual debug rectangles

### Problem: Performance issues
**Solution:** 
- Use CSS transforms instead of top/left
- Memoize components that don't change often
- Limit number of pipes on screen

### Problem: Input lag
**Solution:**
- Attach event listeners directly, not through React events
- Don't debounce game input
- Keep flap function simple

---

## Testing Strategy

### Manual Tests
1. **Start Game:** Click/press space to start
2. **Flap:** Bird jumps up
3. **Gravity:** Bird falls naturally
4. **Pipes:** Move from right to left
5. **Collision:** Game over on hit
6. **Score:** Increments when passing pipes
7. **Restart:** Game resets properly
8. **High Score:** Persists across sessions

### Edge Cases
- Rapid clicking
- Window resize
- Tab switching
- Multiple restarts
- Long play sessions

---

## Development Tips

1. **Start Simple:** Get one component working before moving to the next
2. **Test Frequently:** Run the game after each major change
3. **Use Console Logs:** Debug state and physics calculations
4. **Visual Debug:** Draw collision boxes during development
5. **Adjust Constants:** Tweak values for fun gameplay
6. **Commit Often:** Save progress after each working feature

---

## Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## Resource Links

- **React Docs:** https://react.dev
- **Vite Docs:** https://vitejs.dev
- **Game Loop Pattern:** https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
- **Collision Detection:** https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

---

## Getting Help

If you get stuck:
1. Check the detailed [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md)
2. Review the [PRD.md](./PRD.md) for requirements
3. Search for similar React game tutorials
4. Check browser console for errors
5. Use React DevTools to inspect state

---

## Next Steps

After completing the MVP:
1. Add sound effects
2. Implement difficulty levels
3. Create different themes
4. Add pause functionality
5. Improve animations
6. Deploy online

---

## Success Indicators

You know you're done when:
- ✅ Game starts and restarts properly
- ✅ Bird responds to input immediately
- ✅ Pipes scroll smoothly
- ✅ Collisions work accurately
- ✅ Score increments correctly
- ✅ High score persists
- ✅ Game runs at 60 FPS
- ✅ Works on mobile and desktop
- ✅ No console errors
- ✅ **It's fun to play!**

---

Good luck and have fun building! 🎮🐦
