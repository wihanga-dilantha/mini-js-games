class Snake {
    constructor(canvasSize, box) {
        this.canvasSize = canvasSize;
        this.box = box;
        this.snake = [];
        this.direction = '';
        this.score = 0;
        this.isAlive = true;
    }

    setDirection(newDirection) {
        this.direction = newDirection;
    }

    move() {
        const head = { ...this.snake[0] };

        if (this.direction === 'LEFT') head.x -= this.box;
        if (this.direction === 'UP') head.y -= this.box;
        if (this.direction === 'RIGHT') head.x += this.box;
        if (this.direction === 'DOWN') head.y += this.box;

        // Wrap around screen edges
        if (head.x < 0) head.x = this.canvasSize - this.box;
        if (head.x >= this.canvasSize) head.x = 0;
        if (head.y < 0) head.y = this.canvasSize - this.box;
        if (head.y >= this.canvasSize) head.y = 0;

        this.snake.unshift(head);

        // Check if the snake has eaten the food
        if (head.x === food.x && head.y === food.y) {
            this.score += pointsForFood;
            initializeFood(this.canvasSize, this.box); // Reinitialize food
        } else {
            this.snake.pop(); // Remove the tail segment unless food is eaten
        }

        // Check for collision with itself
        for (let i = 1; i < this.snake.length; i++) {
            if (this.snake[i].x === head.x && this.snake[i].y === head.y) {
                this.isAlive = false;
            }
        }
    }

    draw(ctx) {
        // Draw the snake body
        this.snake.forEach((segment, index) => {
            ctx.fillStyle = 'green';
            ctx.fillRect(segment.x, segment.y, this.box, this.box);
            // Draw dots on the snake body
            if (index !== 0) { // Avoid dots on the head for visual clarity
                this.drawDots(ctx, segment);
            }
        });

        // Draw eyes on the head separately
        if (this.snake.length > 0) {
            this.drawEyes(ctx, this.snake[0]);
        }
    }

    drawEyes(ctx, segment) {
        // Eyes position relative to the snake's head
        const eyeOffset = this.box / 4; // Offset from the edge
        const eyeSize = this.box / 5; // Size of the eyes

        // Save the current canvas state
        ctx.save();

        // Draw the left eye
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(segment.x + eyeOffset, segment.y + eyeOffset, eyeSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw the right eye
        ctx.beginPath();
        ctx.arc(segment.x + this.box - eyeOffset, segment.y + eyeOffset, eyeSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw the pupils
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(segment.x + eyeOffset, segment.y + eyeOffset, eyeSize / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(segment.x + this.box - eyeOffset, segment.y + eyeOffset, eyeSize / 2, 0, Math.PI * 2);
        ctx.fill();

        // Restore the canvas state
        ctx.restore();
    }

    drawDots(ctx, segment) {
        // Generate random dots within the segment
        const numberOfDots = 3;
        const dotSize = this.box / 20; // Size of each dot

        ctx.fillStyle = 'white';

        for (let i = 0; i < numberOfDots; i++) {
            // Random position within the segment
            const x = segment.x + Math.random() * this.box;
            const y = segment.y + Math.random() * this.box;

            ctx.beginPath();
            ctx.arc(x, y, dotSize, 0, Math.PI * 1);
            ctx.fill();
        }
    }
}

let food;
function initializeFood(canvasSize, box) {
    food = {
        x: Math.floor(Math.random() * canvasSize / box) * box,
        y: Math.floor(Math.random() * canvasSize / box) * box
    };
}

function drawFood(ctx, box) {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(food.x + box / 2, food.y + box / 2, box / 2, 0, Math.PI * 2);
    ctx.fill();
}
