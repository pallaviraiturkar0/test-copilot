/**
 * Flappy Bird Clone
 * A minimal, UX-focused implementation
 */

// Game constants
const GRAVITY = 0.5;
const FLAP_STRENGTH = -9;
const PIPE_SPEED = 3;
const PIPE_GAP = 150;
const PIPE_WIDTH = 60;
const PIPE_SPAWN_INTERVAL = 1500;
const BIRD_SIZE = 30;
const GROUND_HEIGHT = 80;

// Game state
let canvas, ctx;
let gameState = 'start'; // 'start', 'playing', 'gameover'
let score = 0;
let highScore = 0;
let isNewHighScore = false;
let soundEnabled = true;

// Bird object
const bird = {
    x: 0,
    y: 0,
    velocity: 0,
    rotation: 0,
    flapFrame: 0
};

// Pipes array
let pipes = [];
let lastPipeSpawn = 0;

// Animation
let animationId;
let lastTime = 0;

// Audio context for sounds
let audioCtx = null;

// DOM Elements
let scoreDisplay, startScreen, gameOverScreen, finalScore, highScoreDisplay;
let newHighScoreDisplay, startBtn, restartBtn, shareBtn, soundToggle;

/**
 * Initialize the game
 */
function init() {
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');
    
    // Get DOM elements
    scoreDisplay = document.getElementById('score-display');
    startScreen = document.getElementById('start-screen');
    gameOverScreen = document.getElementById('game-over-screen');
    finalScore = document.getElementById('final-score');
    highScoreDisplay = document.getElementById('high-score-display');
    newHighScoreDisplay = document.getElementById('new-high-score');
    startBtn = document.getElementById('start-btn');
    restartBtn = document.getElementById('restart-btn');
    shareBtn = document.getElementById('share-btn');
    soundToggle = document.getElementById('sound-toggle');
    
    // Load high score from localStorage
    const savedHighScore = localStorage.getItem('flappyBirdHighScore');
    if (savedHighScore) {
        highScore = parseInt(savedHighScore, 10);
    }
    
    // Setup canvas size
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Setup event listeners
    setupEventListeners();
    
    // Initial render
    resetGame();
    render();
}

/**
 * Resize canvas to fit container
 */
function resizeCanvas() {
    const container = document.getElementById('game-container');
    const rect = container.getBoundingClientRect();
    
    // Set canvas size to match container with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    // Store logical dimensions
    canvas.logicalWidth = rect.width;
    canvas.logicalHeight = rect.height;
    
    // Reposition bird
    bird.x = canvas.logicalWidth * 0.2;
    if (gameState === 'start') {
        bird.y = canvas.logicalHeight / 2;
    }
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Flap on click/tap/space
    canvas.addEventListener('click', handleFlap);
    canvas.addEventListener('touchstart', handleTouchFlap, { passive: false });
    document.addEventListener('keydown', handleKeyFlap);
    
    // Button listeners
    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);
    shareBtn.addEventListener('click', shareScore);
    soundToggle.addEventListener('click', toggleSound);
}

/**
 * Handle touch flap (prevents double events)
 */
function handleTouchFlap(e) {
    e.preventDefault();
    handleFlap();
}

/**
 * Handle keyboard flap
 */
function handleKeyFlap(e) {
    if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        handleFlap();
    }
}

/**
 * Handle flap action
 */
function handleFlap() {
    if (gameState === 'start') {
        startGame();
    } else if (gameState === 'playing') {
        flap();
    } else if (gameState === 'gameover') {
        startGame();
    }
}

/**
 * Make the bird flap
 */
function flap() {
    bird.velocity = FLAP_STRENGTH;
    bird.flapFrame = 5;
    playSound('flap');
}

/**
 * Start or restart the game
 */
function startGame() {
    resetGame();
    gameState = 'playing';
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    scoreDisplay.style.display = 'block';
    lastTime = performance.now();
    lastPipeSpawn = lastTime;
    gameLoop(lastTime);
}

/**
 * Reset game state
 */
function resetGame() {
    bird.x = canvas.logicalWidth * 0.2;
    bird.y = canvas.logicalHeight / 2;
    bird.velocity = 0;
    bird.rotation = 0;
    bird.flapFrame = 0;
    pipes = [];
    score = 0;
    isNewHighScore = false;
    scoreDisplay.textContent = '0';
}

/**
 * Main game loop
 */
function gameLoop(currentTime) {
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    
    update(deltaTime, currentTime);
    render();
    
    if (gameState === 'playing') {
        animationId = requestAnimationFrame(gameLoop);
    }
}

/**
 * Update game state
 */
function update(deltaTime, currentTime) {
    // Update bird physics
    bird.velocity += GRAVITY;
    bird.y += bird.velocity;
    
    // Update bird rotation based on velocity
    bird.rotation = Math.min(Math.max(bird.velocity * 3, -30), 90);
    
    // Update flap animation
    if (bird.flapFrame > 0) {
        bird.flapFrame--;
    }
    
    // Spawn pipes
    if (currentTime - lastPipeSpawn > PIPE_SPAWN_INTERVAL) {
        spawnPipe();
        lastPipeSpawn = currentTime;
    }
    
    // Update pipes
    for (let i = pipes.length - 1; i >= 0; i--) {
        const pipe = pipes[i];
        pipe.x -= PIPE_SPEED;
        
        // Check if bird passed pipe
        if (!pipe.passed && pipe.x + PIPE_WIDTH < bird.x) {
            pipe.passed = true;
            score++;
            scoreDisplay.textContent = score.toString();
            playSound('score');
        }
        
        // Remove off-screen pipes
        if (pipe.x + PIPE_WIDTH < 0) {
            pipes.splice(i, 1);
        }
    }
    
    // Check collisions
    if (checkCollision()) {
        endGame();
    }
}

/**
 * Spawn a new pipe pair
 */
function spawnPipe() {
    const minHeight = 50;
    const maxHeight = canvas.logicalHeight - PIPE_GAP - minHeight - GROUND_HEIGHT - 20;
    const topHeight = Math.random() * (maxHeight - minHeight) + minHeight;
    
    pipes.push({
        x: canvas.logicalWidth,
        topHeight: topHeight,
        passed: false
    });
}

/**
 * Check for collisions
 */
function checkCollision() {
    const birdHitbox = {
        x: bird.x - BIRD_SIZE / 2 + 5,
        y: bird.y - BIRD_SIZE / 2 + 5,
        width: BIRD_SIZE - 10,
        height: BIRD_SIZE - 10
    };
    
    // Ground collision
    if (bird.y + BIRD_SIZE / 2 > canvas.logicalHeight - GROUND_HEIGHT) {
        return true;
    }
    
    // Ceiling collision
    if (bird.y - BIRD_SIZE / 2 < 0) {
        return true;
    }
    
    // Pipe collision
    for (const pipe of pipes) {
        const topPipe = {
            x: pipe.x,
            y: 0,
            width: PIPE_WIDTH,
            height: pipe.topHeight
        };
        
        const bottomPipe = {
            x: pipe.x,
            y: pipe.topHeight + PIPE_GAP,
            width: PIPE_WIDTH,
            height: canvas.logicalHeight - pipe.topHeight - PIPE_GAP
        };
        
        if (rectIntersect(birdHitbox, topPipe) || rectIntersect(birdHitbox, bottomPipe)) {
            return true;
        }
    }
    
    return false;
}

/**
 * Check if two rectangles intersect
 */
function rectIntersect(r1, r2) {
    return r1.x < r2.x + r2.width &&
           r1.x + r1.width > r2.x &&
           r1.y < r2.y + r2.height &&
           r1.y + r1.height > r2.y;
}

/**
 * End the game
 */
function endGame() {
    gameState = 'gameover';
    cancelAnimationFrame(animationId);
    playSound('hit');
    
    // Check for new high score
    if (score > highScore) {
        highScore = score;
        isNewHighScore = true;
        localStorage.setItem('flappyBirdHighScore', highScore.toString());
    }
    
    // Update game over screen
    finalScore.textContent = `Score: ${score}`;
    highScoreDisplay.textContent = `Best: ${highScore}`;
    newHighScoreDisplay.classList.toggle('hidden', !isNewHighScore);
    
    // Show game over screen with slight delay for impact
    setTimeout(() => {
        gameOverScreen.classList.remove('hidden');
    }, 500);
}

/**
 * Render the game
 */
function render() {
    const width = canvas.logicalWidth;
    const height = canvas.logicalHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw sky gradient
    const skyGradient = ctx.createLinearGradient(0, 0, 0, height);
    skyGradient.addColorStop(0, '#70c5ce');
    skyGradient.addColorStop(1, '#87ceeb');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw clouds (decorative)
    drawClouds();
    
    // Draw pipes
    drawPipes();
    
    // Draw ground
    drawGround();
    
    // Draw bird
    drawBird();
}

/**
 * Draw decorative clouds
 */
function drawClouds() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    
    // Simple cloud shapes
    const clouds = [
        { x: 50, y: 80, scale: 1 },
        { x: 200, y: 120, scale: 0.8 },
        { x: 350, y: 60, scale: 1.2 }
    ];
    
    clouds.forEach(cloud => {
        const { x, y, scale } = cloud;
        ctx.beginPath();
        ctx.arc(x, y, 20 * scale, 0, Math.PI * 2);
        ctx.arc(x + 25 * scale, y - 10 * scale, 25 * scale, 0, Math.PI * 2);
        ctx.arc(x + 50 * scale, y, 20 * scale, 0, Math.PI * 2);
        ctx.fill();
    });
}

/**
 * Draw pipes
 */
function drawPipes() {
    pipes.forEach(pipe => {
        // Pipe colors
        const pipeColor = '#73bf2e';
        const pipeDarkColor = '#558b2f';
        const pipeHighlight = '#8bc34a';
        
        // Top pipe
        drawPipe(pipe.x, 0, PIPE_WIDTH, pipe.topHeight, true, pipeColor, pipeDarkColor, pipeHighlight);
        
        // Bottom pipe
        const bottomY = pipe.topHeight + PIPE_GAP;
        const bottomHeight = canvas.logicalHeight - bottomY - GROUND_HEIGHT;
        drawPipe(pipe.x, bottomY, PIPE_WIDTH, bottomHeight, false, pipeColor, pipeDarkColor, pipeHighlight);
    });
}

/**
 * Draw a single pipe
 */
function drawPipe(x, y, width, height, isTop, color, darkColor, highlight) {
    // Main pipe body
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
    
    // Pipe border/shadow
    ctx.fillStyle = darkColor;
    ctx.fillRect(x, y, 5, height);
    ctx.fillRect(x + width - 5, y, 5, height);
    
    // Pipe highlight
    ctx.fillStyle = highlight;
    ctx.fillRect(x + 8, y, 8, height);
    
    // Pipe cap
    const capHeight = 30;
    const capOverhang = 5;
    const capY = isTop ? y + height - capHeight : y;
    
    ctx.fillStyle = color;
    ctx.fillRect(x - capOverhang, capY, width + capOverhang * 2, capHeight);
    
    ctx.fillStyle = darkColor;
    ctx.fillRect(x - capOverhang, capY, 5, capHeight);
    ctx.fillRect(x + width + capOverhang - 5, capY, 5, capHeight);
    
    ctx.fillStyle = highlight;
    ctx.fillRect(x - capOverhang + 8, capY, 8, capHeight);
}

/**
 * Draw the ground
 */
function drawGround() {
    const y = canvas.logicalHeight - GROUND_HEIGHT;
    
    // Ground base
    ctx.fillStyle = '#ded895';
    ctx.fillRect(0, y, canvas.logicalWidth, GROUND_HEIGHT);
    
    // Grass top
    ctx.fillStyle = '#5cb85c';
    ctx.fillRect(0, y, canvas.logicalWidth, 20);
    
    // Grass detail
    ctx.fillStyle = '#4cae4c';
    for (let i = 0; i < canvas.logicalWidth; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, y);
        ctx.lineTo(i + 10, y + 20);
        ctx.lineTo(i + 20, y);
        ctx.fill();
    }
}

/**
 * Draw the bird
 */
function drawBird() {
    ctx.save();
    ctx.translate(bird.x, bird.y);
    ctx.rotate(bird.rotation * Math.PI / 180);
    
    // Bird body (yellow)
    ctx.fillStyle = '#ffd93d';
    ctx.beginPath();
    ctx.ellipse(0, 0, BIRD_SIZE / 2, BIRD_SIZE / 2 - 3, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Bird belly (lighter yellow)
    ctx.fillStyle = '#fff176';
    ctx.beginPath();
    ctx.ellipse(3, 3, BIRD_SIZE / 3, BIRD_SIZE / 3, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Wing
    ctx.fillStyle = '#ffb300';
    const wingY = bird.flapFrame > 0 ? -5 : 3;
    ctx.beginPath();
    ctx.ellipse(-5, wingY, 10, 6, -0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Eye
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(8, -5, 7, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(10, -5, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Beak
    ctx.fillStyle = '#ff7043';
    ctx.beginPath();
    ctx.moveTo(12, 0);
    ctx.lineTo(22, 3);
    ctx.lineTo(12, 6);
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();
}

/**
 * Play a sound effect
 */
function playSound(type) {
    if (!soundEnabled) return;
    
    // Create audio context on first interaction
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    switch (type) {
        case 'flap':
            oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.1);
            break;
        case 'score':
            oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(900, audioCtx.currentTime + 0.15);
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.15);
            break;
        case 'hit':
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(200, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.3);
            gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.3);
            break;
    }
}

/**
 * Toggle sound on/off
 */
function toggleSound() {
    soundEnabled = !soundEnabled;
    soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
}

/**
 * Share score functionality
 */
function shareScore() {
    const text = `I scored ${score} in Flappy Bird! Can you beat my score? 🐦`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Flappy Bird Score',
            text: text
        }).catch(() => {
            // Fallback to clipboard if share fails
            copyToClipboard(text);
        });
    } else {
        copyToClipboard(text);
    }
}

/**
 * Copy text to clipboard with fallback
 */
function copyToClipboard(text) {
    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showShareFeedback('Copied!');
        }).catch(() => {
            // Fallback for older browsers or non-HTTPS
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

/**
 * Fallback clipboard copy using execCommand
 */
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showShareFeedback('Copied!');
        } else {
            showShareFeedback('Score: ' + score);
        }
    } catch (err) {
        showShareFeedback('Score: ' + score);
    }
    
    document.body.removeChild(textArea);
}

/**
 * Show feedback on the share button
 */
function showShareFeedback(message) {
    const originalText = shareBtn.textContent;
    shareBtn.textContent = message;
    setTimeout(() => {
        shareBtn.textContent = originalText;
    }, 2000);
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', init);
