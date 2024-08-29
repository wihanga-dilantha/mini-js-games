// Player class
class Player {
    constructor() {
        this.x = 50;
        this.y = canvas.height / 2 - 20;
        this.width = 20;
        this.height = 20;
        this.speed = 5;
        this.bullets = [];
        this.fireCooldown = 0;
        this.fireRate = 10; // Rate of firing bullets
    }

    draw() {
        ctx.fillStyle = 'cyan';
        ctx.beginPath();
        // Draw the spaceship body (triangular shape)
        ctx.moveTo(this.x, this.y + 10);     // Nose of the spaceship
        ctx.lineTo(this.x - 20, this.y + 30); // Left wing
        ctx.lineTo(this.x + 20, this.y + 30); // Right wing
        ctx.closePath();
        ctx.fill();

        // Draw the cockpit
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x, this.y + 15, 5, 0, Math.PI * 2); // Cockpit
        ctx.fill();
    }

    update() {
        // Player movement
        if (keys['ArrowUp'] && this.y > 0) this.y -= this.speed;
        if (keys['ArrowDown'] && this.y < canvas.height - this.height) this.y += this.speed;
        if (keys['ArrowLeft'] && this.x > 0) this.x -= this.speed;
        if (keys['ArrowRight'] && this.x < canvas.width - this.width) this.x += this.speed;

        // Fire bullet when holding space key
        if (keys['Space'] && this.fireCooldown <= 0) {
            this.bullets.push(new Bullet(this.x + this.width, this.y + this.height / 2 - 2));
            this.fireCooldown = this.fireRate; // Reset cooldown
        }

        // Reduce cooldown timer
        if (this.fireCooldown > 0) {
            this.fireCooldown--;
        }

        // Update bullets
        this.bullets.forEach((bullet, index) => {
            bullet.update();
            // Remove bullets that go off-screen
            if (bullet.x > canvas.width) {
                this.bullets.splice(index, 1);
            }
        });
    }
}

// Bullet class
class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 5;
        this.speed = 7;
    }

    draw() {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.x += this.speed;
    }
}
