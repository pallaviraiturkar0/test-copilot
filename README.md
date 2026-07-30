# Project Title 🚀

Basic project description goes here.

## Flappy Bird Web Clone 🐦

A simple, browser-based Flappy Bird clone built with pure JavaScript and HTML5 Canvas.

### How to Play

1. **Run the game:** Simply open `index.html` in your web browser - no build step required!
   ```bash
   # Option 1: Open directly in browser
   open index.html
   
   # Option 2: Use a simple HTTP server (recommended for some browsers)
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

2. **Controls:**
   - **Spacebar** - Flap to fly up
   - **Click/Tap** - Flap to fly up (mobile-friendly)
   
3. **Gameplay:**
   - Navigate the bird through gaps in the pipes
   - Each pipe passed earns 1 point
   - Avoid hitting pipes, the ground, or the ceiling
   - Your high score is saved automatically in your browser

### Features

- ✅ Smooth gameplay using `requestAnimationFrame`
- ✅ Bird physics with gravity, flap impulse, and rotation
- ✅ Randomly generated pipes
- ✅ Collision detection
- ✅ Score tracking with localStorage high score persistence
- ✅ Game over screen with restart option
- ✅ Simple sound effects using Web Audio API
- ✅ Responsive design - works on desktop and mobile
- ✅ No external dependencies

### Project Structure

```
├── index.html      # Main HTML file with canvas element
├── styles.css      # CSS styling for responsive layout
├── src/
│   └── main.js     # All game logic (ES6 JavaScript)
├── assets/         # Placeholder for sprites/audio (optional)
├── LICENSE         # MIT License
└── README.md       # This file
```

---

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/pallaviraiturkar0/test-copilot.git
   ```

2. Navigate to the project directory:
   ```
   cd test-copilot
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Contribution Guidelines

1. Fork the repository.
2. Create a new branch for your feature or fix:
   ```
   git checkout -b feature/YourFeature
   ```
3. Commit your changes:
   ```
   git commit -m "Add your message"
   ```
4. Push to the branch:
   ```
   git push origin feature/YourFeature
   ```
5. Create a pull request.