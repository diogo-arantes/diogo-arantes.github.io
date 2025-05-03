// Create a falling stalactite
function createStalactite() {
    if (isMobile) return;
    let baseWidth = 30 + Math.random() * 15; // Wider base
    let height = 60 + Math.random() * 50; // Taller stalactite

    let stalactite = {
        x: Math.random() * (canvas.width - baseWidth) + baseWidth / 2, // Random horizontal position
        y: ceilingLevel, // Starts at ceiling
        width: baseWidth,
        height: height,
        speed: 2 + Math.random(), // Falling speed
        active: true // Track if it's still in the game
    };
    stalactites.push(stalactite);
}

// Draw stalactites
function drawStalactites() {
    ctx.fillStyle = "#553322"; // Darker rock color
    ctx.strokeStyle = "#8a0303"; // Red outline for visibility
    ctx.lineWidth = 2;

    stalactites.forEach(stalactite => {
        ctx.beginPath();
        ctx.moveTo(stalactite.x, stalactite.y); // Top middle
        let peakOffset = stalactite.width * 0.2;

        // Draw a jagged, uneven base (simulating rocky formation)
        ctx.lineTo(stalactite.x - stalactite.width / 2, stalactite.y + peakOffset);
        ctx.lineTo(stalactite.x - stalactite.width * 0.3, stalactite.y + stalactite.height * 0.5);
        ctx.lineTo(stalactite.x - stalactite.width * 0.1, stalactite.y + stalactite.height * 0.8);
        ctx.lineTo(stalactite.x, stalactite.y + stalactite.height);
        ctx.lineTo(stalactite.x + stalactite.width * 0.1, stalactite.y + stalactite.height * 0.8);
        ctx.lineTo(stalactite.x + stalactite.width * 0.3, stalactite.y + stalactite.height * 0.5);
        ctx.lineTo(stalactite.x + stalactite.width / 2, stalactite.y + peakOffset);
        ctx.closePath();

        ctx.fill();
        ctx.stroke(); // Outline for better visibility
    });
}

// 🏗️ Update stalactites (falling effect)
function updateStalactites() {
    if (isMobile) return;

    for (let i = stalactites.length - 1; i >= 0; i--) {
        let stalactite = stalactites[i];
        stalactite.y += stalactite.speed; // Move downward

        // Remove stalactites that go off the screen
        if (stalactite.y > canvas.height) {
            stalactites.splice(i, 1);
        }

        // Check collision with the ship
        if (
            shipX < stalactite.x + stalactite.width / 2 &&
            shipX + shipWidth > stalactite.x - stalactite.width / 2 &&
            shipY < stalactite.y + stalactite.height &&
            shipY + shipHeight > stalactite.y
        ) {
            loseLife();
            stalactites.splice(i, 1);
        }
    }
}

const explosionParticles = [];

function createExplosion(x, y) {
    for (let i = 0; i < 50; i++) { // More particles for a stronger effect
        explosionParticles.push({
            x: x,
            y: y,
            size: 5 + Math.random() * 12, // Bigger explosion
            speedX: (Math.random() - 0.5) * 10,
            speedY: (Math.random() - 0.5) * 10,
            life: 50 + Math.random() * 30, // Lasts longer
            color: `rgba(255, ${50 + Math.random() * 150}, 0, 1)`
        });
    }
}

function updateExplosion() {
    for (let i = explosionParticles.length - 1; i >= 0; i--) {
        let p = explosionParticles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life--;
        if (p.life <= 0) explosionParticles.splice(i, 1); // Remove finished particles
    }
}

function drawExplosion() {
    for (const p of explosionParticles) {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    }
}


// Particles system for effects
const particles = [];

function createShipTrail() {
    particles.push({
        x: shipX,
        y: shipY + shipHeight / 2,
        size: 2 + Math.random() * 6,
        speedX: -1 - Math.random() * 2,
        speedY: (Math.random() - 0.5) * 2,
        life: 30 + Math.random() * 20,
        color: `rgba(${138 + Math.random() * 50}, ${3 + Math.random() * 20}, ${3 + Math.random() * 20}, ${0.3 + Math.random() * 0.5})`
    });
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life--;

        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }
}

function drawParticles() {
    particles.forEach(p => {
        ctx.globalAlpha = p.life / 50;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    });
}

// Draw background layers
function drawBackground() {
    if (!bgReady) return;

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const layer of bgLayers) {
        layer.x -= backgroundSpeed * layer.speed; // Use `backgroundSpeed`
        if (layer.x < -canvas.width) {
            layer.x = 0;
        }

        for (const obj of layer.clouds) {
            obj.x -= backgroundSpeed * obj.depth; // Background scrolls separately
            if (obj.x < -obj.width) {
                obj.x = canvas.width + Math.random() * 100;
                obj.y = Math.random() * canvas.height;
            }

            let adjustedOpacity = obj.opacity * obj.depth;

            if (obj.type === "star") {
                ctx.fillStyle = `rgba(255, 255, 255, ${adjustedOpacity})`;
                ctx.beginPath();
                ctx.arc(obj.x, obj.y, obj.width / 6, 0, Math.PI * 2);
                ctx.fill();
            } else if (obj.type === "planet") {
                ctx.fillStyle = obj.color;
                ctx.globalAlpha = adjustedOpacity;
                ctx.beginPath();
                ctx.arc(obj.x, obj.y, obj.width / 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1.0;
            }
        }
    }
}

function slowDownTime() {
    obstacleSpeed *= 0.5; // Slow down time (reduce speed by half)
    backgroundSpeed *= .5;

    // Restore speed after 5 seconds
    setTimeout(() => {
    }, 5000);
}

function speedUpTime() {
    obstacleSpeed *= 1.3; // Slow down time (reduce speed by half)
    backgroundSpeed *= 1.3;

    // Restore speed after 5 seconds
    setTimeout(() => {
    }, 5000);
}

function explodeAllObstacles() {
    if (obstacles.length === 0) return;

    playSound("explosionAll", playerLevel);

    for (let i = obstacles.length - 1; i >= 0; i--) {
        let obstacle = obstacles[i];

        // Get obstacle position and size
        let explosionX = obstacle.x + obstacle.width / 2;
        let explosionY = obstacle.y + obstacle.height / 2;

        // Create explosion effect
        createExplosion(explosionX, explosionY);

        // Remove obstacle from game
        obstacles.splice(i, 1);
    }

}

const glowColors = ["#8a0303", "#8a0303", "purple", "cyan", "orange", "pink", "yellow"];
let currentGlowIndex = 0;

function changeGlow(glow = 10) {
    currentGlowIndex = (playerLevel - 1) % glowColors.length; // Cycle through colors
    setGlowEffect(glowColors[currentGlowIndex], glow);
}
