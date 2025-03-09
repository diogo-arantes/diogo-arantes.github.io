function loseLife() {
    if (isHit) return; // Prevent multiple hits in a short time
    isHit = true;
    isExploding = true; // 🚨 Set exploding state to keep rendering

    playSound("explosion");

    lives--; // Subtract 1 life

    createExplosion(shipX + shipWidth / 2, shipY + shipHeight / 2); // Generate explosion effect

    // **Stop ship movement, obstacles, but keep explosion running**
    shipVelocity = 0;
    shipXVelocity = 0;
    mana = 0;

    setTimeout(() => {
        isExploding = false; // Stop explosion effect after delay
        if (lives > 0) {
            playSound("risada");
            restartAfterHit();
        } else {
            gameOver = true;
            playSound("gameover");
            gameOverScreen.style.display = 'flex';
            gameOverScreen.style.fontSize = 40;
            gameOverScoreDisplay.textContent = `${score}`;
        }

        mana = maxMana; // Reseta a mana ao perder uma vida
        armor = 0; // Reset armor
        inventory["🔫"] = 0;
        updateInventoryDisplay()
        updateArmorBar()
        updateManaBar();

    }, 2000); // 2-second delay before restarting
}

function restartAfterHit() {
    // Reset explosion state
    isHit = false;
    isExploding = false;

    // Reset ship position and movement
    shipY = canvas.height / 2;
    shipVelocity = 0;
    shipX = canvas.width * 0.2;
    shipXVelocity = 0;

    // Temporary invincibility after hit
    invincible = true;
    invincibleTimer = 600;

    inventory['🔫'] = 0

    canShoot = false;
    shootTimer = 0;
}