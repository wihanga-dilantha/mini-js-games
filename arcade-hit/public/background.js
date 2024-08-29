document.addEventListener('DOMContentLoaded', () => {
    // Function to create a star
    function createStar() {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.top = `${Math.random() * window.innerHeight}px`;
        star.style.left = `${Math.random() * window.innerWidth}px`;
        document.getElementById('background').appendChild(star);
    }

    // Function to create and position a spaceship
    function createSpaceship() {
        const spaceship = document.createElement('div');
        spaceship.className = 'spaceship';
        spaceship.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
        spaceship.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
        document.getElementById('background').appendChild(spaceship);
    }

    // Function to create and position a snake alien
    function createSnakeAlien() {
        const snakeAlien = document.createElement('div');
        snakeAlien.className = 'snake-alien';
        snakeAlien.style.top = `${Math.random() * (window.innerHeight - 30)}px`;
        snakeAlien.style.left = `${Math.random() * (window.innerWidth - 30)}px`;
        document.getElementById('background').appendChild(snakeAlien);
    }

    // Function to create and position an asteroid
    function createAsteroid() {
        const asteroid = document.createElement('div');
        asteroid.className = 'asteroid';
        asteroid.style.top = `${Math.random() * (window.innerHeight - 30)}px`;
        asteroid.style.left = `${Math.random() * window.innerWidth}px`;
        document.getElementById('background').appendChild(asteroid);
    }

    // Function to create and position a planet
    function createPlanet() {
        const planet = document.createElement('div');
        planet.className = 'planet';
        planet.style.top = `${Math.random() * (window.innerHeight - 100)}px`;
        planet.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
        document.getElementById('background').appendChild(planet);
    }

    // Function to animate space objects
    function animateSpaceObjects() {
        const spaceships = document.querySelectorAll('.spaceship');
        const snakeAliens = document.querySelectorAll('.snake-alien');
        const stars = document.querySelectorAll('.star');
        const asteroids = document.querySelectorAll('.asteroid');
        const planets = document.querySelectorAll('.planet');

        function moveObjects() {
            spaceships.forEach(spaceship => {
                let top = parseFloat(spaceship.style.top);
                let left = parseFloat(spaceship.style.left);
                top += Math.sin(Date.now() / 1000) * 0.5; // Vertical movement
                left += Math.cos(Date.now() / 1000) * 0.5; // Horizontal movement
                spaceship.style.top = `${top}px`;
                spaceship.style.left = `${left}px`;

                // Reset position if out of bounds
                if (top > window.innerHeight || top < -50 || left > window.innerWidth || left < -50) {
                    spaceship.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
                    spaceship.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
                }
            });

            snakeAliens.forEach(snakeAlien => {
                let top = parseFloat(snakeAlien.style.top);
                let left = parseFloat(snakeAlien.style.left);
                top -= Math.sin(Date.now() / 1000) * 0.4; // Vertical movement
                left -= Math.cos(Date.now() / 1000) * 0.4; // Horizontal movement
                snakeAlien.style.top = `${top}px`;
                snakeAlien.style.left = `${left}px`;

                // Reset position if out of bounds
                if (top > window.innerHeight || top < -30 || left > window.innerWidth || left < -30) {
                    snakeAlien.style.top = `${Math.random() * (window.innerHeight - 30)}px`;
                    snakeAlien.style.left = `${Math.random() * (window.innerWidth - 30)}px`;
                }
            });

            stars.forEach(star => {
                let top = parseFloat(star.style.top);
                let left = parseFloat(star.style.left);
                top += Math.sin(Date.now() / 1000) * 0.1; // Subtle vertical movement
                left += Math.cos(Date.now() / 1000) * 0.1; // Subtle horizontal movement
                star.style.top = `${top}px`;
                star.style.left = `${left}px`;

                // Reset position if out of bounds
                if (top > window.innerHeight || top < -10 || left > window.innerWidth || left < -10) {
                    star.style.top = `${Math.random() * window.innerHeight}px`;
                    star.style.left = `${Math.random() * window.innerWidth}px`;
                }
            });

            asteroids.forEach(asteroid => {
                let top = parseFloat(asteroid.style.top);
                let left = parseFloat(asteroid.style.left);
                top += 1; // Vertical movement (falling)
                left += Math.sin(Date.now() / 1000) * 0.3; // Horizontal movement
                asteroid.style.top = `${top}px`;
                asteroid.style.left = `${left}px`;

                // Reset position if out of bounds
                if (top > window.innerHeight || left > window.innerWidth || left < -20) {
                    asteroid.style.top = `${Math.random() * -100}px`; // Start above the screen
                    asteroid.style.left = `${Math.random() * window.innerWidth}px`;
                }
            });

            planets.forEach(planet => {
                let top = parseFloat(planet.style.top);
                let left = parseFloat(planet.style.left);
                top += Math.sin(Date.now() / 1000) * 0.2; // Subtle vertical movement
                left += Math.cos(Date.now() / 1000) * 0.2; // Subtle horizontal movement
                planet.style.top = `${top}px`;
                planet.style.left = `${left}px`;

                // Reset position if out of bounds
                if (top > window.innerHeight || top < -100 || left > window.innerWidth || left < -100) {
                    planet.style.top = `${Math.random() * (window.innerHeight - 100)}px`;
                    planet.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
                }
            });

            requestAnimationFrame(moveObjects);
        }

        moveObjects();
    }

    // Create stars
    for (let i = 0; i < 100; i++) { // Adjust number as needed
        createStar();
    }

    // Create spaceships and snake aliens
    for (let i = 0; i < 2; i++) { // Adjust number as needed
        createSpaceship();
        createSnakeAlien();
    }

    // Create asteroids
    for (let i = 0; i < 20; i++) { // Adjust number as needed
        createAsteroid();
    }

    // Create planets
    for (let i = 0; i < 2; i++) { // Adjust number as needed
        createPlanet();
    }

    // Start animations
    animateSpaceObjects();
});
