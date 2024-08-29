// Base enemy speed
let baseEnemySpeed = 3;

// Enemy class
class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 20;
        this.speed = baseEnemySpeed; // Set initial speed
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.x -= this.speed;
    }

    adjustSpeed(score) {
        // Increase enemy speed based on score increments of 200
        this.speed = baseEnemySpeed + Math.floor(score / 200);
    }
}
