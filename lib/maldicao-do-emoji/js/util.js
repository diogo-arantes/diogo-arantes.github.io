// Check for collisions
function checkCollisions() {
    // 🚀 Adjusted hitbox: slightly smaller than the visible ship
    const shipHitbox = {
        left: shipX + 10,  // Offset for better accuracy
        right: shipX + shipWidth - 10,
        top: shipY + 5,
        bottom: shipY + shipHeight - 5
    };

    // ✅ Check collision with the Boss
    if (bossActive && currentBoss) {
        if (currentBoss.name === "circular") {
            // Loop through 5 orbiting emojis
            for (let i = 0; i < 5; i++) {
                let angle = bossAngle + (i * (Math.PI * 2 / 5));
                let bossX = currentBoss.x + Math.cos(angle) * bossRadius;
                let bossY = currentBoss.y + Math.sin(angle) * bossRadius;
                let bossSize = currentBoss.size * 0.7; // Adjust size for better collision

                // ✅ Collision check
                if (
                    shipHitbox.right > bossX - bossSize / 2 &&
                    shipHitbox.left < bossX + bossSize / 2 &&
                    shipHitbox.bottom > bossY - bossSize / 2 &&
                    shipHitbox.top < bossY + bossSize / 2
                ) {
                    mana -= 0.5; // Lose mana upon collision
                    if (mana <= 0) {
                        loseLife(); // If mana runs out, lose a life
                    }
                    updateManaBar();
                    playSound('scratching'); // Add a sound effect for damage
                    return;
                }
            }
        } else if (currentBoss.name === "still") {
            // Boss is one big emoji
            let bossSize = currentBoss.size * 3;
            let bossX = currentBoss.x;
            let bossY = currentBoss.y;

            // ✅ Collision check for still boss
            if (
                shipHitbox.right > bossX - bossSize / 2 &&
                shipHitbox.left < bossX + bossSize / 2 &&
                shipHitbox.bottom > bossY - bossSize / 2 &&
                shipHitbox.top < bossY + bossSize / 2
            ) {
                mana -= 0.5; // Lose mana upon collision
                if (mana <= 0) {
                    loseLife();
                }
                updateManaBar();
                playSound('scratching');
            }
        }
    }

    for (let i = bossRays.length - 1; i >= 0; i--) {
        let ray = bossRays[i];

        if (
            ray.x > shipHitbox.left &&
            ray.x < shipHitbox.right &&
            ray.y > shipHitbox.top &&
            ray.y < shipHitbox.bottom
        ) {
            mana -= 2; // Lose mana
            if (mana <= 0) {
                loseLife();
            }
            updateManaBar();
            playSound('scratching');
            bossRays.splice(i, 1); // Remove the ray
        }
    }

    // ✅ **Check obstacle collisions**
    for (const obstacle of obstacles) {
        if (obstacle.type === "emoji-block") {
            for (let row = 0; row < obstacle.rows; row++) {
                for (let col = 0; col < obstacle.pattern[row].length; col++) {
                    const emoji = obstacle.pattern[row][col];
                    if (emoji === "") continue; // Skip empty spaces

                    // More precise obstacle hitbox
                    const emojiHitbox = {
                        left: obstacle.x + col * obstacle.blockSize + 5,  // Reduce width sensitivity
                        right: obstacle.x + (col + 1) * obstacle.blockSize - 5,
                        top: obstacle.y + row * obstacle.blockSize + 5,   // Reduce height sensitivity
                        bottom: obstacle.y + (row + 1) * obstacle.blockSize - 5
                    };

                    // **Collision detection (Fixed)**
                    if (
                        !invincible &&
                        shipHitbox.right > emojiHitbox.left &&
                        shipHitbox.left < emojiHitbox.right &&
                        shipHitbox.bottom > emojiHitbox.top &&
                        shipHitbox.top < emojiHitbox.bottom
                    ) {
                        mana -= .3;
                        if (mana > .3) {
                            playSound('scratching')
                        }
                        updateManaBar();
                        shipFlicker = true;
                        return;
                    }
                }
            }
        }

        // ✅ **Check if obstacle has been passed (increase score)**
        if (!obstacle.passed && shipX > obstacle.x + obstacle.width) {
            obstacle.passed = true;
            score++;
            obstacleSpeed += 0.04; // Gradual difficulty increase
        }
    }

    // ✅ **Check for collectible pickups**
    for (let i = activeCollectibles.length - 1; i >= 0; i--) {
        const item = activeCollectibles[i];

        // Define the hitbox for the collectible item
        const itemHitbox = {
            left: item.x - item.size / 2,
            right: item.x + item.size / 2,
            top: item.y - item.size / 2,
            bottom: item.y + item.size / 2
        };

        // **Collision detection with the ship**
        if (
            shipHitbox.right > itemHitbox.left &&
            shipHitbox.left < itemHitbox.right &&
            shipHitbox.bottom > itemHitbox.top &&
            shipHitbox.top < itemHitbox.bottom
        ) {
            playSound("collect");
            score += item.points;

            inventory[item.emoji]++;
            activeCollectibles.splice(i, 1); // Remove collected item
            updateInventoryDisplay();
            checkLifeGain(); // ✅ Check if an extra life should be given

            // **Apply effects**
            if (item.emoji === "💀") {
                invincible = true;
                invincibleTimer = 2500;
                playSound("shield");

                // ✨ Boost the ship glow when collecting a drop
                shipGlow.radius = 35; // Temporarily increase glow
                setTimeout(() => { shipGlow.radius = 20; }, 500); // Reset after 500ms
            }

            if (item.emoji === "🐌") {
                slowDownTime();
            }

            if (item.emoji === "🌪") {
                speedUpTime();
            }

            if (item.emoji === "🔫") {
                inventory["🔫"]++;
                armor += 10; // Increase armor
                updateArmorBar();
                updateInventoryDisplay();
            }

            if (item.emoji === "💩") {
                currentAcceleration = slowAcceleration;
                slowMovementTimer = 1500;
            }

            if (item.emoji === "🔋") {
                mana = Math.min(mana + 30, maxMana); // Recupera 30 de mana sem ultrapassar o máximo
                updateManaBar();
            }

            if (item.emoji === "☢️") {
                explodeAllObstacles();
            }
        }
    }
}

// Set up resize handler
window.addEventListener('resize', () => {
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        groundLevel = canvas.height * 0.8;
        ceilingLevel = canvas.height * 0.2;

        if (/iPhone|iPad|Android|Mobile/i.test(navigator.userAgent)) {
            groundLevel = canvas.height * 0.95;
            ceilingLevel = canvas.height * 0.15;
        } else {
            groundLevel = canvas.height * 0.9;
            ceilingLevel = canvas.height * 0.1;
        }

        shipY = canvas.height / 2;
        gravity = /iPhone|iPad|Android|Mobile/i.test(navigator.userAgent) ? mobileGravity : normalGravity;
    }

    // Resize once on load & listen for screen changes
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    groundLevel = canvas.height * 0.8;
    ceilingLevel = canvas.height * 0.2;
    shipY = canvas.height / 2;
});

function requestFullScreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    }
}

function setGlowEffect(color, blurAmount = 7) {
    return
    ctx.shadowColor = color;
    ctx.shadowBlur = blurAmount;
}

function interpolateColor(color1, color2, factor) {
    let c1 = hexToRgb(color1);
    let c2 = hexToRgb(color2);

    let r = Math.round(c1.r + (c2.r - c1.r) * factor);
    let g = Math.round(c1.g + (c2.g - c1.g) * factor);
    let b = Math.round(c1.b + (c2.b - c1.b) * factor);

    return `rgb(${r},${g},${b})`;
}

function hexToRgb(hex) {
    hex = hex.replace("#", "");
    let bigint = parseInt(hex, 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

const rgbToHex = (r, g, b) => {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b)
        .toString(16)
        .slice(1)
        .padStart(6, '0')}`;
};

function lerpColor(a, b, amount) {
    const colorA = hexToRgb(a);
    const colorB = hexToRgb(b);

    // Safely interpolate and clamp to ensure no NaN or invalid values
    const r_ = Math.round(clamp(colorA.r + amount * (colorB.r - colorA.r), 0, 255));
    const g_ = Math.round(clamp(colorA.g + amount * (colorB.g - colorA.g), 0, 255));
    const b_ = Math.round(clamp(colorA.b + amount * (colorB.b - colorA.b), 0, 255));

    return rgbToHex(r_, g_, b_);
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, isNaN(value) ? 0 : value));
}
