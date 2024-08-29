// Accessing the canvas element
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

// Game objects and states
const player = new Player();
const enemies = [];
let gameRunning = false; // Tracks if the game is active
let score = 0;
let gameOver = false;

// Key controls
const keys = {};

// Listen to key presses
window.addEventListener('keydown', (e) => {
    keys[e.code] = true;

    // Start the game when space is pressed at the beginning
    if (e.code === 'Space' && !gameRunning && !gameOver) {
        gameRunning = true;
    }
});

window.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

// Update game state
function update() {
    if (gameRunning) {
        player.update();

        // Spawn enemies
        if (Math.random() * 100 < 1) { // 1% chance each frame
            const y = Math.random() * (canvas.height - 20);
            enemies.push(new Enemy(canvas.width, y));
        }

        // Update enemies
        enemies.forEach((enemy, eIndex) => {
            enemy.adjustSpeed(score);
            enemy.update();

            // Check for collisions with bullets
            player.bullets.forEach((bullet, bIndex) => {
                if (
                    bullet.x < enemy.x + enemy.width &&
                    bullet.x + bullet.width > enemy.x &&
                    bullet.y < enemy.y + enemy.height &&
                    bullet.y + bullet.height > enemy.y
                ) {
                    enemies.splice(eIndex, 1);
                    player.bullets.splice(bIndex, 1);
                    score += 10; // Increase score when an enemy is destroyed
                }
            });

            // Check for collisions with the player
            if (
                enemy.x < player.x + player.width &&
                enemy.x + enemy.width > player.x &&
                enemy.y < player.y + player.height &&
                enemy.y + enemy.height > player.y
            ) {
                gameRunning = false;
                gameOver = true;
            }

            // Remove enemies that go off-screen
            if (enemy.x + enemy.width < 0) {
                enemies.splice(eIndex, 1);
            }
        });
    }
}

// Draw game state
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player spaceship
    player.draw();

    // Draw bullets
    player.bullets.forEach(bullet => bullet.draw());

    // Draw enemies
    enemies.forEach(enemy => enemy.draw());

    // Draw score closer to the center
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width / 2, 30);

    // Display start message
    if (!gameRunning && !gameOver) {
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Press Space to Start', canvas.width / 2, canvas.height / 2);
    }

    // Display game over message
    if (gameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 20);
        ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 30);
    }
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
