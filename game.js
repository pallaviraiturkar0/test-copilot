/**
 * Flappy Bird Clone - Game Loop, Rendering, and Input Handling
 */

class FlappyBirdGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Game state
        this.gameState = 'start'; // 'start', 'playing', 'gameOver'
        this.score = 0;
        
        // Game loop
        this.lastFrameTime = 0;
        this.targetFPS = 60;
        this.frameInterval = 1000 / this.targetFPS;
        this.animationFrameId = null;
        
        // Bird properties
        this.bird = {
            x: 100,
            y: this.canvas.height / 2,
            radius: 15,
            velocity: 0,
            gravity: 0.5,
            jumpStrength: -8,
            color: '#FFD700'
        };
        
        // Pipes properties
        this.pipes = [];
        this.pipeWidth = 60;
        this.pipeGap = 150;
        this.pipeSpeed = 2;
        this.pipeSpawnInterval = 90; // frames
        this.frameCount = 0;
        
        // Ground properties
        this.groundHeight = 50;
        this.groundY = this.canvas.height - this.groundHeight;
        
        // UI elements
        this.startScreen = document.getElementById('startScreen');
        this.gameOverScreen = document.getElementById('gameOverScreen');
        this.scoreDisplay = document.getElementById('scoreDisplay');
        this.startButton = document.getElementById('startButton');
        this.restartButton = document.getElementById('restartButton');
        
        // Initialize
        this.setupInputHandlers();
        this.render(); // Initial render
    }
    
    setupInputHandlers() {
        // Keyboard input (spacebar)
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.handleInput();
            }
        });
        
        // Touch input for mobile
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.handleInput();
        });
        
        // Click input
        this.canvas.addEventListener('click', () => {
            this.handleInput();
        });
        
        // Button handlers
        this.startButton.addEventListener('click', () => {
            this.startGame();
        });
        
        this.restartButton.addEventListener('click', () => {
            this.restartGame();
        });
    }
    
    handleInput() {
        if (this.gameState === 'start') {
            this.startGame();
        } else if (this.gameState === 'playing') {
            this.jump();
        } else if (this.gameState === 'gameOver') {
            this.restartGame();
        }
    }
    
    startGame() {
        this.gameState = 'playing';
        this.startScreen.classList.add('hidden');
        this.gameOverScreen.classList.add('hidden');
        this.resetGame();
        this.startGameLoop();
    }
    
    restartGame() {
        this.gameState = 'playing';
        this.gameOverScreen.classList.add('hidden');
        this.resetGame();
        this.startGameLoop();
    }
    
    resetGame() {
        this.score = 0;
        this.frameCount = 0;
        this.bird.y = this.canvas.height / 2;
        this.bird.velocity = 0;
        this.pipes = [];
    }
    
    jump() {
        this.bird.velocity = this.bird.jumpStrength;
    }
    
    startGameLoop() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        this.lastFrameTime = performance.now();
        this.gameLoop(this.lastFrameTime);
    }
    
    gameLoop(currentTime) {
        // Calculate delta time
        const deltaTime = currentTime - this.lastFrameTime;
        
        // Only update and render if enough time has passed for the target FPS
        if (deltaTime >= this.frameInterval) {
            this.lastFrameTime = currentTime - (deltaTime % this.frameInterval);
            
            if (this.gameState === 'playing') {
                this.update();
                this.checkCollisions();
            }
            
            this.render();
        }
        
        // Continue the game loop
        this.animationFrameId = requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    update() {
        // Update bird physics
        this.bird.velocity += this.bird.gravity;
        this.bird.y += this.bird.velocity;
        
        // Prevent bird from going above canvas
        if (this.bird.y - this.bird.radius < 0) {
            this.bird.y = this.bird.radius;
            this.bird.velocity = 0;
        }
        
        // Spawn pipes
        this.frameCount++;
        if (this.frameCount % this.pipeSpawnInterval === 0) {
            this.spawnPipe();
        }
        
        // Update pipes
        for (let i = this.pipes.length - 1; i >= 0; i--) {
            const pipe = this.pipes[i];
            pipe.x -= this.pipeSpeed;
            
            // Score when bird passes pipe
            if (!pipe.scored && pipe.x + this.pipeWidth < this.bird.x) {
                pipe.scored = true;
                this.score++;
            }
            
            // Remove off-screen pipes
            if (pipe.x + this.pipeWidth < 0) {
                this.pipes.splice(i, 1);
            }
        }
    }
    
    spawnPipe() {
        const minHeight = 50;
        const maxHeight = this.groundY - this.pipeGap - 50;
        const topHeight = Math.random() * (maxHeight - minHeight) + minHeight;
        
        this.pipes.push({
            x: this.canvas.width,
            topHeight: topHeight,
            bottomY: topHeight + this.pipeGap,
            scored: false
        });
    }
    
    checkCollisions() {
        // Check ground collision
        if (this.bird.y + this.bird.radius >= this.groundY) {
            this.gameOver();
            return;
        }
        
        // Check pipe collisions
        for (const pipe of this.pipes) {
            // Check if bird is in horizontal range of pipe
            if (this.bird.x + this.bird.radius > pipe.x && 
                this.bird.x - this.bird.radius < pipe.x + this.pipeWidth) {
                
                // Check if bird hits top or bottom pipe
                if (this.bird.y - this.bird.radius < pipe.topHeight || 
                    this.bird.y + this.bird.radius > pipe.bottomY) {
                    this.gameOver();
                    return;
                }
            }
        }
    }
    
    gameOver() {
        this.gameState = 'gameOver';
        this.scoreDisplay.textContent = `Score: ${this.score}`;
        this.gameOverScreen.classList.remove('hidden');
        
        // Stop the game loop
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }
    
    render() {
        // Clear canvas
        this.ctx.fillStyle = '#87CEEB';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw pipes
        this.ctx.fillStyle = '#228B22';
        for (const pipe of this.pipes) {
            // Top pipe
            this.ctx.fillRect(pipe.x, 0, this.pipeWidth, pipe.topHeight);
            
            // Bottom pipe
            this.ctx.fillRect(pipe.x, pipe.bottomY, this.pipeWidth, 
                            this.groundY - pipe.bottomY);
            
            // Pipe cap (darker green)
            this.ctx.fillStyle = '#1a6b1a';
            this.ctx.fillRect(pipe.x - 5, pipe.topHeight - 20, this.pipeWidth + 10, 20);
            this.ctx.fillRect(pipe.x - 5, pipe.bottomY, this.pipeWidth + 10, 20);
            this.ctx.fillStyle = '#228B22';
        }
        
        // Draw ground
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fillRect(0, this.groundY, this.canvas.width, this.groundHeight);
        
        // Draw grass on top of ground
        this.ctx.fillStyle = '#32CD32';
        this.ctx.fillRect(0, this.groundY, this.canvas.width, 10);
        
        // Draw bird
        this.ctx.fillStyle = this.bird.color;
        this.ctx.beginPath();
        this.ctx.arc(this.bird.x, this.bird.y, this.bird.radius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Bird eye
        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.arc(this.bird.x + 5, this.bird.y - 3, 5, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.fillStyle = 'black';
        this.ctx.beginPath();
        this.ctx.arc(this.bird.x + 6, this.bird.y - 3, 3, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Bird beak
        this.ctx.fillStyle = '#FF8C00';
        this.ctx.beginPath();
        this.ctx.moveTo(this.bird.x + this.bird.radius, this.bird.y);
        this.ctx.lineTo(this.bird.x + this.bird.radius + 8, this.bird.y - 3);
        this.ctx.lineTo(this.bird.x + this.bird.radius + 8, this.bird.y + 3);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Draw score during gameplay
        if (this.gameState === 'playing') {
            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 36px Arial';
            this.ctx.strokeStyle = 'black';
            this.ctx.lineWidth = 3;
            this.ctx.strokeText(this.score, this.canvas.width / 2, 50);
            this.ctx.fillText(this.score, this.canvas.width / 2, 50);
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new FlappyBirdGame();
});
