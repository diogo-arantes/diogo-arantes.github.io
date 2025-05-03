let lastFrameTime = performance.now();

function gameLoop() {
    const now = performance.now();
    const deltaTime = now - lastFrameTime;
    lastFrameTime = now;
    if (gameOver) return;

    if (!isExploding) {
        updateGame();
        updateShooting();
        updateBoss();
    }
    updateExplosion();

    drawBackground(deltaTime);
    draw();

    requestAnimationFrame(gameLoop);
}