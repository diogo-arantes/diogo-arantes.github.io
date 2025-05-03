const bosses = [
    { emoji: "🐍", name: 'still', hits: 5, size: 100 },
    { emoji: "🧟‍♀️", name: 'circular', hits: 7, size: 100 },
    { emoji: "👹", name: 'still', hits: 9, size: 100 },
    { emoji: "☠️", name: 'circular', hits: 7, size: 100 },
    { emoji: "👁️", name: 'circular', hits: 9, size: 100 },
    { emoji: "⚰️", name: 'still', hits: 9, size: 100 },
];

function spawnBoss() {
    if (bossIndex >= bosses.length) {
        bossIndex = 0; // Loop back to the first boss if all are defeated
    }

    bossActive = true;
    backgroundSpeed = 0.4;
    obstacleSpeed = 0.4;

    // ✅ Start the boss off-screen on the right
    currentBoss = {
        ...bosses[bossIndex],
        x: canvas.width + 100, // Start off-screen
        y: canvas.height / 2,
        size: 100,
        movingToCenter: true // Flag for movement
    };

    bossHits = currentBoss.hits;
    updateArmorBar();

    playSound('boss')
}

function drawBoss() {
    if (!bossActive || !currentBoss) return; // Skip drawing if boss is removed

    ctx.font = `${currentBoss.size * 1.5}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if (currentBoss.name === "circular") {
        for (let i = 0; i < 5; i++) {
            let angle = bossAngle + (i * (Math.PI * 2 / 5));
            let bossX = currentBoss.x + Math.cos(angle) * bossRadius;
            let bossY = currentBoss.y + Math.sin(angle) * bossRadius;
            ctx.fillText(currentBoss.emoji, bossX, bossY);
        }
        bossAngle += 0.01;
    } else if (currentBoss.name === "still") {
        ctx.font = `${currentBoss.size * 4}px Arial`;
        ctx.fillText(currentBoss.emoji, currentBoss.x, currentBoss.y);
    }
    changeGlow()
}

function updateBoss() {
    if (!bossActive || !currentBoss) return;

    if (currentBoss.movingToCenter) {
        let speed = 4; // Adjust speed as needed
        currentBoss.x -= speed;

        // ✅ Stop movement when reaching the center
        if (currentBoss.x <= canvas.width / 2) {
            currentBoss.x = canvas.width / 2; // Ensure exact position
            currentBoss.movingToCenter = false; // Stop movement
        }
    }
}

function hitBoss() {
    if (bossActive && bossHits > 0) {
        bossHits--;
        playSound("explosion", playerLevel);
        createExplosion(currentBoss.x, currentBoss.y);

        if (bossHits <= 0) {
            bossActive = false;
            playSound("explosionAll", playerLevel);
            backgroundSpeed = 5;
            obstacleSpeed = 1;
            createExplosion(currentBoss.x, currentBoss.y);
            bossIndex++;

            stopSound('boss')

            // 🔥 Level Up and Change Emoji Set
            playerLevel++;
            updateLevelDisplay();

            stopAllMusic()
            startMusic(playerLevel)

            // Reset Obstacles to Ensure the New Level's Emoji Set is Used
            obstacles = [];
        }
    }
}

function spawnBossRays() {
    if (!bossActive || !currentBoss) return;

    let numRays = 5; // Number of rays
    for (let i = 0; i < numRays; i++) {
        // Calculate base direction to the ship
        let dx = shipX - currentBoss.x;
        let dy = shipY - currentBoss.y;
        let baseAngle = Math.atan2(dy, dx); // Direction to the ship

        // Add randomness (chaotic effect)
        let randomOffset = (Math.random() - 0.5) * Math.PI / 3; // Adds up to ±30° deviation
        let chaoticAngle = baseAngle + randomOffset;

        let speed = 3 + Math.random() * 3; // Speed between 3 and 6

        let newRay = {
            x: currentBoss.x,
            y: currentBoss.y,
            angle: chaoticAngle,  // Now fires in a more chaotic way
            speed: speed,
            size: 6
        };

        bossRays.push(newRay);
    }
}

function drawBossRays() {
    for (let ray of bossRays) {
        ctx.beginPath();
        ctx.arc(ray.x, ray.y, ray.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, ${50 + Math.random() * 100}, 50, 1)`;

        // Apply the dynamically changing glow effect
        setGlowEffect(glowColors[currentGlowIndex], 20);

        ctx.fill();
    }
}

function updateBossRays() {
    for (let i = bossRays.length - 1; i >= 0; i--) {
        let ray = bossRays[i];

        // Move in the direction of the chaotic angle
        ray.x += Math.cos(ray.angle) * ray.speed;
        ray.y += Math.sin(ray.angle) * ray.speed;

        // Remove rays if they go off-screen
        if (ray.x < -10 || ray.y < -10 || ray.x > canvas.width + 10 || ray.y > canvas.height + 10) {
            bossRays.splice(i, 1);
        }
    }
}