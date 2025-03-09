// Draw the ship with a glow effect
function drawShip() {
    if (isExploding) return;
    if (isHit && shipFlicker) {
        flickerCount++;
        if (flickerCount % 6 < 3) {
            isHit = false;
            return;
        }
    }

    // 🚀 **Define Armor Colors**
    let shipBaseColor = canShoot ? "#444" : "#8B0000"; // Gunmetal Gray when armed
    let armorBorderColor = canShoot ? "#AAA" : "#FF6347"; // Brighter outline
    let energyColor = canShoot ? "cyan" : "red"; // Blue glow when armed

    // 🌟 **Ship Glow Effect**
    ctx.beginPath();
    ctx.arc(shipX + shipWidth / 2, shipY + shipHeight / 2, shipGlow.radius, 0, Math.PI * 2);
    const glowGradient = ctx.createRadialGradient(
        shipX + shipWidth / 2, shipY + shipHeight / 2, 0,
        shipX + shipWidth / 2, shipY + shipHeight / 2, shipGlow.radius
    );
    glowGradient.addColorStop(0, `rgba(${canShoot ? '0,255,255' : '255,50,50'}, 0.8)`);
    glowGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = glowGradient;
    ctx.fill();

    // 🚀 **Main Ship Body**
    ctx.fillStyle = shipBaseColor;
    ctx.strokeStyle = armorBorderColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(shipX, shipY + shipHeight / 2);
    ctx.lineTo(shipX + shipWidth * 0.3, shipY + shipHeight * 0.2);
    ctx.lineTo(shipX + shipWidth * 0.8, shipY + shipHeight * 0.2);
    ctx.lineTo(shipX + shipWidth, shipY + shipHeight / 2);
    ctx.lineTo(shipX + shipWidth * 0.8, shipY + shipHeight * 0.8);
    ctx.lineTo(shipX + shipWidth * 0.3, shipY + shipHeight * 0.8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 🛡️ **Armor Plating (Metallic Highlights)**
    ctx.strokeStyle = "#DDD"; // Light metallic effect
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(shipX + shipWidth * 0.3, shipY + shipHeight * 0.2);
    ctx.lineTo(shipX + shipWidth * 0.3, shipY + shipHeight * 0.8);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(shipX + shipWidth * 0.6, shipY + shipHeight * 0.3);
    ctx.lineTo(shipX + shipWidth * 0.6, shipY + shipHeight * 0.7);
    ctx.stroke();

    // 🔥 **Energy Core (Glowing Center)**
    let coreGradient = ctx.createRadialGradient(
        shipX + shipWidth * 0.45, shipY + shipHeight * 0.5, 0,
        shipX + shipWidth * 0.45, shipY + shipHeight * 0.5, shipHeight * 0.15
    );
    coreGradient.addColorStop(0, "white");
    coreGradient.addColorStop(1, energyColor);
    ctx.fillStyle = coreGradient;
    ctx.beginPath();
    ctx.arc(shipX + shipWidth * 0.45, shipY + shipHeight * 0.5, shipHeight * 0.15, 0, Math.PI * 2);
    ctx.fill();

    // 🎇 **Invincible Mode Glow Effect**
    if (invincible) {
        let invincibleGlow = ctx.createRadialGradient(
            shipX + shipWidth / 2, shipY + shipHeight / 2, 10,
            shipX + shipWidth / 2, shipY + shipHeight / 2, 50
        );
        invincibleGlow.addColorStop(0, "rgba(255, 255, 255, 0.8)");
        invincibleGlow.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = invincibleGlow;
        ctx.beginPath();
        ctx.arc(shipX + shipWidth / 2, shipY + shipHeight / 2, 40, 0, Math.PI * 2);
        ctx.fill();
    }

    // **EXTRA ARMOR (When Shooting is Enabled)**
    if (inventory['🔫'] < 4 && armor > 0) {
        ctx.fillStyle = "#666"; // Darker metallic armor
        ctx.strokeStyle = "#BBB";
        ctx.lineWidth = 2;

        // **Side Armor**
        ctx.fillRect(shipX + 5, shipY + 5, 15, shipHeight - 10);
        ctx.fillRect(shipX + shipWidth - 20, shipY + 5, 15, shipHeight - 10);

        // **Side Cannons**
        ctx.fillStyle = "#333";
        ctx.fillRect(shipX + shipWidth * 0.1, shipY + shipHeight * 0.2, 10, 20);
        ctx.fillRect(shipX + shipWidth * 0.1, shipY + shipHeight * 0.6, 10, 20);
        ctx.fillRect(shipX + shipWidth * 0.9 - 10, shipY + shipHeight * 0.2, 10, 20);
        ctx.fillRect(shipX + shipWidth * 0.9 - 10, shipY + shipHeight * 0.6, 10, 20);

        // **Glowing Vents & Weapon Ports**
        ctx.fillStyle = "rgba(0, 255, 255, 0.7)";
        ctx.fillRect(shipX + shipWidth * 0.35, shipY + shipHeight * 0.1, 8, 4);
        ctx.fillRect(shipX + shipWidth * 0.35, shipY + shipHeight * 0.85, 8, 4);
        ctx.fillRect(shipX + shipWidth * 0.6, shipY + shipHeight * 0.1, 8, 4);
        ctx.fillRect(shipX + shipWidth * 0.6, shipY + shipHeight * 0.85, 8, 4);
    }
    else if (inventory['🔫'] >= 4 && armor > 0) {
        ctx.strokeStyle = "cyan";
        ctx.lineWidth = 4;

        // **Energy Lines on Wings**
        ctx.beginPath();
        ctx.moveTo(shipX + shipWidth * 0.2, shipY + shipHeight * 0.1);
        ctx.lineTo(shipX + shipWidth * 0.8, shipY + shipHeight * 0.1);
        ctx.moveTo(shipX + shipWidth * 0.2, shipY + shipHeight * 0.9);
        ctx.lineTo(shipX + shipWidth * 0.8, shipY + shipHeight * 0.9);
        ctx.stroke();

        // **Outer Glow**
        let laserGlow = ctx.createRadialGradient(
            shipX + shipWidth / 2, shipY + shipHeight / 2, 20,
            shipX + shipWidth / 2, shipY + shipHeight / 2, 60
        );
        laserGlow.addColorStop(0, "rgba(0, 255, 255, 0.9)");
        laserGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = laserGlow;
        ctx.beginPath();
        ctx.arc(shipX + shipWidth / 2, shipY + shipHeight / 2, 50, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Shoot function
function shoot() {
    if (armor <= 0) return

    if (inventory["🔫"] >= 3) {
        activateLaserMode();
    } else if (inventory["🔫"] > 0) {
        bullets.push({
            x: shipX + shipWidth,
            y: shipY + shipHeight / 2,
            size: 8,
            speed: 10
        });
        armor--;
        playSound("shoot");
    }
}

let laserDamageInterval = 200; // Laser will apply damage every 200ms
let lastLaserDamageTime = 0; // Track the last time damage was applied

// Update bullets
function updateShooting() {
    // Handle Bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].x += bulletSpeed;

        if (bullets[i].x > canvas.width) {
            bullets.splice(i, 1);
            continue;
        }

        // Bullet Collision with Boss
        if (bossActive && currentBoss) {
            if (checkBossCollision(bullets[i].x, bullets[i].y, bullets[i].size)) {
                bullets.splice(i, 1); // Remove bullet upon hit
                hitBoss();
                return;
            }
        }

        // Bullet Collision with Obstacles
        checkBulletObstacleCollision(bullets[i], i);
    }

    // Handle Laser Beam
    if (laserBeam) {
        laserBeam.x += laserBeam.speed;

        // ✅ If the laser is off-screen, remove it and stop further processing.
        if (laserBeam.x > canvas.width) {
            laserBeam = null;
            return;
        }

        // ✅ Laser Collision with Boss (every laserDamageInterval)
        if (bossActive && currentBoss && (performance.now() - lastLaserDamageTime > laserDamageInterval)) {
            if (checkBossCollision(laserBeam.x + laserBeam.width / 2, laserBeam.y, 10)) {
                hitBoss();
                createExplosion(currentBoss.x, currentBoss.y);
                lastLaserDamageTime = performance.now();
            }
        }

        // ✅ Destroy obstacles with laser
        destroyObstaclesWithLaser();
    }
}

function checkBossCollision(x, y, size) {
    if (currentBoss.name === "circular") {
        for (let j = 0; j < 5; j++) {
            let angle = bossAngle + (j * (Math.PI * 2 / 5));
            let bossX = currentBoss.x + Math.cos(angle) * bossRadius;
            let bossY = currentBoss.y + Math.sin(angle) * bossRadius;
            let bossSize = currentBoss.size * 0.7;

            if (
                x + size > bossX - bossSize / 2 &&
                x < bossX + bossSize / 2 &&
                y > bossY - bossSize / 2 &&
                y < bossY + bossSize / 2
            ) {
                return true;
            }
        }
    } else if (currentBoss.name === "still") {
        let bossSize = currentBoss.size * 3;
        let bossX = currentBoss.x;
        let bossY = currentBoss.y;

        if (
            x + size > bossX - bossSize / 2 &&
            x < bossX + bossSize / 2 &&
            y > bossY - bossSize / 2 &&
            y < bossY + bossSize / 2
        ) {
            return true;
        }
    }
    return false;
}

function checkBulletObstacleCollision(bullet, bulletIndex) {
    for (let j = obstacles.length - 1; j >= 0; j--) {
        let obstacle = obstacles[j];

        if (obstacle.type === "emoji-block") {
            for (let row = 0; row < obstacle.rows; row++) {
                for (let col = 0; col < obstacle.pattern[row].length; col++) {
                    let emoji = obstacle.pattern[row][col];
                    if (emoji === "") continue;

                    let emojiX = obstacle.x + col * obstacle.blockSize;
                    let emojiY = obstacle.y + row * obstacle.blockSize;

                    if (
                        bullet.x + bullet.size > emojiX &&
                        bullet.x < emojiX + obstacle.blockSize &&
                        bullet.y > emojiY &&
                        bullet.y < emojiY + obstacle.blockSize
                    ) {
                        obstacle.pattern[row][col] = ""; // Remove emoji
                        bullets.splice(bulletIndex, 1);
                        score += 1;
                        armor -= 1;
                        updateArmorBar();
                        return;
                    }
                }
            }
        }
    }
}


// Draw bullets
function drawBullets() {
    ctx.fillStyle = "yellow";
    for (let bullet of bullets) {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function activateLaserMode() {
    if (laserCooldown || armor < 2) return;

    laserActive = true;
    laserCooldown = true;
    playSound("laser");

    armor -= 2;
    if (armor < 0) armor = 0;
    updateArmorBar();

    laserBeam = {
        x: shipX + shipWidth,
        y: shipY + shipHeight / 2,
        width: canvas.width - (shipX + shipWidth),
        speed: 5,
        duration: 1000,
        startTime: performance.now(),
        hasHitBoss: false // Track if boss has been hit in this activation
    };

    setTimeout(() => {
        laserActive = false;
        laserBeam = null;
        setTimeout(() => {
            laserCooldown = false;
        }, 100);
    }, laserBeam.duration);
}

function drawLaser() {
    if (!laserBeam) return;

    let beamThickness = 8; // Core thickness
    let glowThickness = 18; // Glow thickness

    // **Core Laser Beam**
    ctx.globalAlpha = 0.9;
    ctx.strokeStyle = "rgba(0, 255, 255, 1)"; // Intense cyan core
    ctx.lineWidth = beamThickness;
    ctx.beginPath();
    ctx.moveTo(laserBeam.x, laserBeam.y);
    ctx.lineTo(laserBeam.x + laserBeam.width, laserBeam.y); // Use laserBeam.width
    ctx.stroke();

    // **Outer Glow**
    ctx.globalAlpha = 0.4;
    ctx.strokeStyle = "rgba(0, 255, 255, 0.6)";
    ctx.lineWidth = glowThickness;
    ctx.beginPath();
    ctx.moveTo(laserBeam.x, laserBeam.y);
    ctx.lineTo(laserBeam.x + laserBeam.width, laserBeam.y);
    ctx.stroke();

    // **Flickering Effect**
    if (Math.random() > 0.5) {
        ctx.globalAlpha = 0.2;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        ctx.lineWidth = glowThickness + 4;
        ctx.beginPath();
        ctx.moveTo(laserBeam.x, laserBeam.y);
        ctx.lineTo(laserBeam.x + laserBeam.width, laserBeam.y);
        ctx.stroke();
    }

    ctx.globalAlpha = 1; // Reset alpha
}

function destroyObstaclesWithLaser() {
    if (!laserBeam) return;

    for (let i = obstacles.length - 1; i >= 0; i--) {
        let obstacle = obstacles[i];

        if (
            laserBeam.x < obstacle.x + obstacle.width &&
            laserBeam.x + laserBeam.width > obstacle.x &&
            laserBeam.y > obstacle.y &&
            laserBeam.y < obstacle.y + obstacle.height
        ) {
            createExplosion(obstacle.x + obstacle.width / 2, obstacle.y + obstacle.height / 2);
            obstacles.splice(i, 1);
            armor -= 2;
            if (armor < 0) armor = 0;
            updateArmorBar();
        }
    }
}