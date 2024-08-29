const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20; // Size of each box
const canvasSize = 400; // Canvas size
canvas.width = canvasSize;
canvas.height = canvasSize;

const snake = new Snake(canvasSize, box);

let gameInterval;
const initialInterval = 150; // Initial speed in milliseconds
const speedIncrement = 10; // Speed increase increment
const pointsForFood = 5; // Points for each food
let intervalSpeed = initialInterval; // Current speed of the game

function initializeGame() {
    snake.snake = [{ x: canvasSize / 2, y: canvasSize / 2 }];
    snake.direction = '';
    snake.score = 0;
    snake.isAlive = true;
    initializeFood(canvasSize, box);
    document.getElementById('gameOverScreen').classList.add('hidden');
    document.getElementById('startScreen').classList.remove('hidden');
    clearInterval(gameInterval);
    intervalSpeed = initialInterval;
    gameInterval = null; // Ensure the interval is cleared
}

function startGame() {
    if (!gameInterval) { // Check if game is not already running
        document.getElementById('startScreen').classList.add('hidden'); // Hide start screen
        gameInterval = setInterval(draw, intervalSpeed); // Start the game with initial speed
    }
}

function draw() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    
    if (!snake.isAlive) {
        document.getElementById('gameOverScreen').classList.remove('hidden');
        document.getElementById('finalScore').innerText = 'Score: ' + snake.score;
        clearInterval(gameInterval); // Stop the game loop
        gameInterval = null; // Reset gameInterval
        return;
    }

    snake.move();
    snake.draw(ctx);
    drawFood(ctx, box);
    
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + snake.score, canvasSize/2-30, 20);

    // Adjust speed based on score
    if (snake.score >= 100) {
        const newIntervalSpeed = Math.max(50, initialInterval - Math.floor(snake.score / 100) * speedIncrement);
        if (newIntervalSpeed !== intervalSpeed) {
            clearInterval(gameInterval);
            intervalSpeed = newIntervalSpeed;
            gameInterval = setInterval(draw, intervalSpeed);
        }
    }
}

// Handle keydown events
document.addEventListener('keydown', function(event) {
    if (event.keyCode === 37 && snake.direction !== 'RIGHT') snake.setDirection('LEFT');
    if (event.keyCode === 38 && snake.direction !== 'DOWN') snake.setDirection('UP');
    if (event.keyCode === 39 && snake.direction !== 'LEFT') snake.setDirection('RIGHT');
    if (event.keyCode === 40 && snake.direction !== 'UP') snake.setDirection('DOWN');
    
    // Start the game when any arrow key is pressed
    if (event.keyCode >= 37 && event.keyCode <= 40) {
        if (!snake.isAlive) {
            initializeGame(); // Restart the game if it's over
        } else if (document.getElementById('startScreen').classList.contains('hidden')) {
            startGame(); // Start the game if the start screen is hidden
        } else {
            startGame(); // Start the game if the start screen is visible
        }
    }
});

// Initialize the game and set up the start screen
initializeGame();
