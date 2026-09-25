// SPDX-License-Identifier: MIT

/**
 * Flappy Bird Web Clone
 * A simple browser-based implementation of the classic Flappy Bird game.
 * Uses Canvas 2D API for rendering and pure ES6 JavaScript for game logic.
 */

(function() {
    'use strict';

    // ==========================================================================
    // CONFIGURATION
    // ==========================================================================
    
    const CONFIG = {
        // Canvas/game dimensions (internal resolution)
        GAME_WIDTH: 288,
        GAME_HEIGHT: 512,
        
        // Bird settings
        BIRD: {
            X: 50,                  // Fixed horizontal position
            SIZE: 20,               // Bird radius
            GRAVITY: 0.35,          // Downward acceleration
            FLAP_IMPULSE: -7,       // Upward velocity on flap
            MAX_FALL_SPEED: 10,     // Terminal velocity
            MAX_RISE_SPEED: -10,    // Maximum upward velocity
            ROTATION_SPEED: 3       // Degrees per frame when falling
        },
        
        // Pipe settings
        PIPE: {
            WIDTH: 52,
            GAP: 120,               // Vertical gap between top and bottom pipes
            SPEED: 2.5,             // Horizontal movement speed
            SPAWN_INTERVAL: 1800,   // Milliseconds between pipe spawns
            MIN_HEIGHT: 50,         // Minimum pipe height
            COLOR_TOP: '#73bf2e',
            COLOR_BOTTOM: '#548c2c',
            BORDER_COLOR: '#333'
        },
        
        // Ground settings
        GROUND: {
            HEIGHT: 80,
            COLOR: '#ded895',
            LINE_COLOR: '#73bf2e'
        },
        
        // Colors
        COLORS: {
            SKY: '#70c5ce',
            BIRD_BODY: '#f8d347',
            BIRD_WING: '#e8a83a',
            BIRD_EYE: '#fff',
            BIRD_PUPIL: '#000',
            BIRD_BEAK: '#ff6b35'
        },
        
        // Audio settings
        AUDIO: {
            ENABLED: true,
            VOLUME: 0.3
        }
    };

    // ==========================================================================
    // GAME STATE
    // ==========================================================================
    
    let canvas, ctx;
    let gameState = 'start'; // 'start', 'playing', 'gameover'
    let score = 0;
    let highScore = 0;
    let lastPipeSpawn = 0;
    let lastTime = 0;
    
    // Bird state
    let bird = {
        y: CONFIG.GAME_HEIGHT / 2,
        velocity: 0,
        rotation: 0
    };
    
    // Pipes array
    let pipes = [];
    
    // Audio context for sound effects
    let audioContext = null;

    // ==========================================================================
    // DOM ELEMENTS
    // ==========================================================================
    
    const elements = {};

    // ==========================================================================
    // INITIALIZATION
    // ==========================================================================
    
    /**
     * Initialize the game when DOM is loaded
     */
    function init() {
        // Cache DOM elements
        elements.canvas = document.getElementById('game-canvas');
        elements.scoreDisplay = document.getElementById('score');
        elements.finalScore = document.getElementById('final-score');
        elements.highScore = document.getElementById('high-score');
        elements.gameOverOverlay = document.getElementById('game-over-overlay');
        elements.startOverlay = document.getElementById('start-overlay');
        elements.restartBtn = document.getElementById('restart-btn');
        
        canvas = elements.canvas;
        ctx = canvas.getContext('2d');
        
        // Set internal canvas resolution
        canvas.width = CONFIG.GAME_WIDTH;
        canvas.height = CONFIG.GAME_HEIGHT;
        
        // Load high score from localStorage
        loadHighScore();
        
        // Set up event listeners
        setupEventListeners();
        
        // Resize canvas for responsive layout
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Initialize audio context on first user interaction
        initAudioOnInteraction();
        
        // Start the game loop
        requestAnimationFrame(gameLoop);
    }
    
    /**
     * Resize canvas to fit the viewport while maintaining aspect ratio
     */
    function resizeCanvas() {
        const headerHeight = document.querySelector('header').offsetHeight;
        const availableWidth = window.innerWidth - 20; // 20px margin
        const availableHeight = window.innerHeight - headerHeight - 40; // 40px margin
        
        const aspectRatio = CONFIG.GAME_WIDTH / CONFIG.GAME_HEIGHT;
        
        let width, height;
        
        if (availableWidth / availableHeight > aspectRatio) {
            // Height constrained
            height = availableHeight;
            width = height * aspectRatio;
        } else {
            // Width constrained
            width = availableWidth;
            height = width / aspectRatio;
        }
        
        // Apply CSS scaling (keeps internal resolution)
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
    }
    
    /**
     * Set up all event listeners for user input
     */
    function setupEventListeners() {
        // Keyboard input
        document.addEventListener('keydown', handleKeyDown);
        
        // Mouse/touch input
        canvas.addEventListener('click', handleInteraction);
        canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
        
        // Restart button
        elements.restartBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            restartGame();
        });
        
        // Start/game over overlay clicks
        elements.startOverlay.addEventListener('click', handleInteraction);
        elements.gameOverOverlay.addEventListener('click', function(e) {
            if (e.target === elements.gameOverOverlay || e.target.classList.contains('overlay-content')) {
                restartGame();
            }
        });
    }
    
    /**
     * Initialize audio context on first user interaction
     */
    function initAudioOnInteraction() {
        const initAudio = function() {
            if (!audioContext && CONFIG.AUDIO.ENABLED) {
                try {
                    audioContext = new (window.AudioContext || window.webkitAudioContext)();
                } catch (e) {
                    console.warn('Web Audio API not supported');
                    CONFIG.AUDIO.ENABLED = false;
                }
            }
            document.removeEventListener('click', initAudio);
            document.removeEventListener('keydown', initAudio);
            document.removeEventListener('touchstart', initAudio);
        };
        
        document.addEventListener('click', initAudio);
        document.addEventListener('keydown', initAudio);
        document.addEventListener('touchstart', initAudio);
    }

    // ==========================================================================
    // INPUT HANDLING
    // ==========================================================================
    
    /**
     * Handle keyboard input
     * @param {KeyboardEvent} e 
     */
    function handleKeyDown(e) {
        if (e.code === 'Space' || e.key === ' ') {
            e.preventDefault();
            handleInteraction();
        }
    }
    
    /**
     * Handle touch events
     * @param {TouchEvent} e 
     */
    function handleTouchStart(e) {
        e.preventDefault();
        handleInteraction();
    }
    
    /**
     * Handle any user interaction (flap, start, or restart)
     */
    function handleInteraction() {
        switch (gameState) {
            case 'start':
                startGame();
                break;
            case 'playing':
                flap();
                break;
            case 'gameover':
                // Do nothing - use button or overlay click
                break;
        }
    }

    // ==========================================================================
    // GAME LOGIC
    // ==========================================================================
    
    /**
     * Start a new game
     */
    function startGame() {
        gameState = 'playing';
        elements.startOverlay.classList.add('hidden');
        resetGame();
    }
    
    /**
     * Reset all game state for a new game
     */
    function resetGame() {
        bird = {
            y: CONFIG.GAME_HEIGHT / 2,
            velocity: 0,
            rotation: 0
        };
        pipes = [];
        score = 0;
        lastPipeSpawn = 0;
        updateScoreDisplay();
    }
    
    /**
     * Restart the game after game over
     */
    function restartGame() {
        elements.gameOverOverlay.classList.add('hidden');
        gameState = 'playing';
        resetGame();
    }
    
    /**
     * Make the bird flap (apply upward impulse)
     */
    function flap() {
        bird.velocity = CONFIG.BIRD.FLAP_IMPULSE;
        playSound('flap');
    }
    
    /**
     * Update bird physics
     */
    function updateBird() {
        // Apply gravity
        bird.velocity += CONFIG.BIRD.GRAVITY;
        
        // Clamp velocity
        bird.velocity = Math.min(bird.velocity, CONFIG.BIRD.MAX_FALL_SPEED);
        bird.velocity = Math.max(bird.velocity, CONFIG.BIRD.MAX_RISE_SPEED);
        
        // Update position
        bird.y += bird.velocity;
        
        // Update rotation based on velocity
        if (bird.velocity < 0) {
            bird.rotation = Math.max(bird.rotation - CONFIG.BIRD.ROTATION_SPEED, -25);
        } else {
            bird.rotation = Math.min(bird.rotation + CONFIG.BIRD.ROTATION_SPEED, 70);
        }
    }
    
    /**
     * Spawn a new pair of pipes
     */
    function spawnPipe() {
        const minGapY = CONFIG.PIPE.MIN_HEIGHT + CONFIG.PIPE.GAP / 2;
        const maxGapY = CONFIG.GAME_HEIGHT - CONFIG.GROUND.HEIGHT - CONFIG.PIPE.MIN_HEIGHT - CONFIG.PIPE.GAP / 2;
        const gapY = minGapY + Math.random() * (maxGapY - minGapY);
        
        pipes.push({
            x: CONFIG.GAME_WIDTH,
            gapY: gapY,
            passed: false
        });
    }
    
    /**
     * Update all pipes (move and remove off-screen)
     */
    function updatePipes() {
        for (let i = pipes.length - 1; i >= 0; i--) {
            const pipe = pipes[i];
            pipe.x -= CONFIG.PIPE.SPEED;
            
            // Check if bird passed the pipe (for scoring)
            if (!pipe.passed && pipe.x + CONFIG.PIPE.WIDTH < CONFIG.BIRD.X) {
                pipe.passed = true;
                score++;
                updateScoreDisplay();
                playSound('score');
            }
            
            // Remove off-screen pipes
            if (pipe.x + CONFIG.PIPE.WIDTH < 0) {
                pipes.splice(i, 1);
            }
        }
    }
    
    /**
     * Check for collisions between bird and pipes/ground/ceiling
     * @returns {boolean} True if collision detected
     */
    function checkCollisions() {
        const birdX = CONFIG.BIRD.X;
        const birdY = bird.y;
        const birdRadius = CONFIG.BIRD.SIZE * 0.8; // Slightly smaller hitbox for fairness
        
        // Check ground collision
        const groundY = CONFIG.GAME_HEIGHT - CONFIG.GROUND.HEIGHT;
        if (birdY + birdRadius > groundY) {
            return true;
        }
        
        // Check ceiling collision
        if (birdY - birdRadius < 0) {
            return true;
        }
        
        // Check pipe collisions
        for (const pipe of pipes) {
            // Bird's bounding box (circle approximated as square for simplicity)
            const birdLeft = birdX - birdRadius;
            const birdRight = birdX + birdRadius;
            const birdTop = birdY - birdRadius;
            const birdBottom = birdY + birdRadius;
            
            // Pipe boundaries
            const pipeLeft = pipe.x;
            const pipeRight = pipe.x + CONFIG.PIPE.WIDTH;
            const gapTop = pipe.gapY - CONFIG.PIPE.GAP / 2;
            const gapBottom = pipe.gapY + CONFIG.PIPE.GAP / 2;
            
            // Check if bird is within pipe's horizontal range
            if (birdRight > pipeLeft && birdLeft < pipeRight) {
                // Check if bird is hitting top or bottom pipe
                if (birdTop < gapTop || birdBottom > gapBottom) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    /**
     * Handle game over state
     */
    function gameOver() {
        gameState = 'gameover';
        playSound('hit');
        
        // Update high score
        if (score > highScore) {
            highScore = score;
            saveHighScore();
        }
        
        // Update UI
        elements.finalScore.textContent = score;
        elements.highScore.textContent = highScore;
        elements.gameOverOverlay.classList.remove('hidden');
    }
    
    /**
     * Update the score display
     */
    function updateScoreDisplay() {
        elements.scoreDisplay.textContent = score;
    }

    // ==========================================================================
    // RENDERING
    // ==========================================================================
    
    /**
     * Render the entire game scene
     */
    function render() {
        // Clear canvas
        ctx.fillStyle = CONFIG.COLORS.SKY;
        ctx.fillRect(0, 0, CONFIG.GAME_WIDTH, CONFIG.GAME_HEIGHT);
        
        // Draw pipes
        drawPipes();
        
        // Draw ground
        drawGround();
        
        // Draw bird
        drawBird();
    }
    
    /**
     * Draw all pipes
     */
    function drawPipes() {
        for (const pipe of pipes) {
            const gapTop = pipe.gapY - CONFIG.PIPE.GAP / 2;
            const gapBottom = pipe.gapY + CONFIG.PIPE.GAP / 2;
            
            // Top pipe
            drawPipe(pipe.x, 0, CONFIG.PIPE.WIDTH, gapTop, false);
            
            // Bottom pipe
            const bottomHeight = CONFIG.GAME_HEIGHT - CONFIG.GROUND.HEIGHT - gapBottom;
            drawPipe(pipe.x, gapBottom, CONFIG.PIPE.WIDTH, bottomHeight, true);
        }
    }
    
    /**
     * Draw a single pipe with cap
     * @param {number} x - X position
     * @param {number} y - Y position
     * @param {number} width - Pipe width
     * @param {number} height - Pipe height
     * @param {boolean} isBottom - Whether this is a bottom pipe
     */
    function drawPipe(x, y, width, height, isBottom) {
        const capHeight = 24;
        const capOverhang = 4;
        
        // Main pipe body
        ctx.fillStyle = CONFIG.PIPE.COLOR_TOP;
        ctx.fillRect(x, y, width, height);
        
        // Pipe body gradient effect
        ctx.fillStyle = CONFIG.PIPE.COLOR_BOTTOM;
        ctx.fillRect(x + width * 0.6, y, width * 0.4, height);
        
        // Pipe cap
        const capY = isBottom ? y : y + height - capHeight;
        ctx.fillStyle = CONFIG.PIPE.COLOR_TOP;
        ctx.fillRect(x - capOverhang, capY, width + capOverhang * 2, capHeight);
        
        // Cap gradient
        ctx.fillStyle = CONFIG.PIPE.COLOR_BOTTOM;
        ctx.fillRect(x + width * 0.6 - capOverhang, capY, width * 0.4 + capOverhang, capHeight);
        
        // Pipe border
        ctx.strokeStyle = CONFIG.PIPE.BORDER_COLOR;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);
        ctx.strokeRect(x - capOverhang, capY, width + capOverhang * 2, capHeight);
    }
    
    /**
     * Draw the ground
     */
    function drawGround() {
        const groundY = CONFIG.GAME_HEIGHT - CONFIG.GROUND.HEIGHT;
        
        // Ground fill
        ctx.fillStyle = CONFIG.GROUND.COLOR;
        ctx.fillRect(0, groundY, CONFIG.GAME_WIDTH, CONFIG.GROUND.HEIGHT);
        
        // Ground top line (grass)
        ctx.fillStyle = CONFIG.GROUND.LINE_COLOR;
        ctx.fillRect(0, groundY, CONFIG.GAME_WIDTH, 10);
        
        // Ground border
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, groundY);
        ctx.lineTo(CONFIG.GAME_WIDTH, groundY);
        ctx.stroke();
    }
    
    /**
     * Draw the bird
     */
    function drawBird() {
        const x = CONFIG.BIRD.X;
        const y = bird.y;
        const size = CONFIG.BIRD.SIZE;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(bird.rotation * Math.PI / 180);
        
        // Body (main circle)
        ctx.fillStyle = CONFIG.COLORS.BIRD_BODY;
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Wing
        ctx.fillStyle = CONFIG.COLORS.BIRD_WING;
        ctx.beginPath();
        ctx.ellipse(-2, 3, size * 0.5, size * 0.3, -0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Eye (white part)
        ctx.fillStyle = CONFIG.COLORS.BIRD_EYE;
        ctx.beginPath();
        ctx.arc(size * 0.4, -size * 0.2, size * 0.35, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Pupil
        ctx.fillStyle = CONFIG.COLORS.BIRD_PUPIL;
        ctx.beginPath();
        ctx.arc(size * 0.5, -size * 0.2, size * 0.15, 0, Math.PI * 2);
        ctx.fill();
        
        // Beak
        ctx.fillStyle = CONFIG.COLORS.BIRD_BEAK;
        ctx.beginPath();
        ctx.moveTo(size * 0.7, 0);
        ctx.lineTo(size * 1.3, size * 0.1);
        ctx.lineTo(size * 0.7, size * 0.4);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        ctx.restore();
    }

    // ==========================================================================
    // AUDIO
    // ==========================================================================
    
    /**
     * Play a sound effect using Web Audio API
     * @param {string} type - Type of sound ('flap', 'score', 'hit')
     */
    function playSound(type) {
        if (!audioContext || !CONFIG.AUDIO.ENABLED) return;
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        gainNode.gain.value = CONFIG.AUDIO.VOLUME;
        
        switch (type) {
            case 'flap':
                oscillator.frequency.value = 400;
                oscillator.type = 'sine';
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.1);
                break;
                
            case 'score':
                oscillator.frequency.value = 600;
                oscillator.type = 'square';
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.15);
                break;
                
            case 'hit':
                oscillator.frequency.value = 150;
                oscillator.type = 'sawtooth';
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.3);
                break;
        }
    }

    // ==========================================================================
    // STORAGE
    // ==========================================================================
    
    /**
     * Load high score from localStorage
     */
    function loadHighScore() {
        try {
            const stored = localStorage.getItem('flappyBirdHighScore');
            if (stored) {
                highScore = parseInt(stored, 10) || 0;
            }
        } catch (e) {
            // localStorage might not be available
            console.warn('Could not load high score from localStorage');
        }
    }
    
    /**
     * Save high score to localStorage
     */
    function saveHighScore() {
        try {
            localStorage.setItem('flappyBirdHighScore', highScore.toString());
        } catch (e) {
            // localStorage might not be available
            console.warn('Could not save high score to localStorage');
        }
    }

    // ==========================================================================
    // GAME LOOP
    // ==========================================================================
    
    /**
     * Main game loop
     * @param {number} timestamp - Current timestamp from requestAnimationFrame
     */
    function gameLoop(timestamp) {
        // Calculate delta time for pipe spawning
        const deltaTime = timestamp - lastTime;
        
        if (gameState === 'playing') {
            // Update bird physics
            updateBird();
            
            // Spawn pipes at intervals
            if (timestamp - lastPipeSpawn > CONFIG.PIPE.SPAWN_INTERVAL) {
                spawnPipe();
                lastPipeSpawn = timestamp;
            }
            
            // Update pipes
            updatePipes();
            
            // Check collisions
            if (checkCollisions()) {
                gameOver();
            }
        }
        
        // Render the game (always, even when paused)
        render();
        
        lastTime = timestamp;
        
        // Continue the loop
        requestAnimationFrame(gameLoop);
    }

    // ==========================================================================
    // START
    // ==========================================================================
    
    // Initialize game when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
