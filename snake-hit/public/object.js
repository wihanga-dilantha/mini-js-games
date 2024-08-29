let food = { x: 0, y: 0 };

function drawFood(ctx, box) {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);
}

function initializeFood(canvasSize, box) {
    food = { x: Math.floor(Math.random() * (canvasSize / box)) * box, y: Math.floor(Math.random() * (canvasSize / box)) * box };
}
