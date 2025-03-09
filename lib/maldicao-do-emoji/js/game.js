// 🎮 Game Elements (DOM)
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const gameOverScoreDisplay = document.getElementById('game-over-score');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');

// 📌 Set Canvas Size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 📱 Device Detection
const isMobile = /iPhone|iPad|Android|Mobile/i.test(navigator.userAgent);

const levelNames = [
    "Começo Sobrenatural",
    "Pesadelos Rastejantes",
    "Horrores Cósmicos",
    "Portais para o Nada",
    "Profundezas Infernais",
    "Pavor Supremo",
    "Ecos do Abismo",
    "A Dança das Sombras",
    "Chamado dos Condenados",
    "A Presença Esquecida",
    "Murmúrios do Vazio",
    "O Ritual Profano",
    "Visões de Outra Dimensão",
    "Os Sussurros da Escuridão",
];

// 🚀 Game State
let playerLevel = 1;
let gameStarted = false;
let gameOver = false;
let gameTime = 0;
let score = 0;
let lastObstacleTime = 0;
let lastCollectibleTime = 0;

// ❤️ Player State
let lives = 3;
let isHit = false;
let hitTimer = 0;
let isExploding = false;
let shipFlicker = false;
let flickerCount = 0;

// 🛠 Ship Properties
const shipWidth = 80
const shipHeight = 40;
let shipX = canvas.width * 0.2
let shipY = canvas.height / 2;
let shipVelocity = 0
let shipXVelocity = 0;
const shipAcceleration = 0.3
const shipFriction = 0.9;
const fastSpeedThreshold = 6000;

// ⚡ Power-ups & Energy
let maxMana = 100
let mana = 0;
let maxArmor = 100
let armor = 0;
let invincible = false
let invincibleTimer = 0;
let canShoot = false
let laserActive = false
let laserBeam = null;
let bullets = []
let laserCooldown = false
let shootTimer = 0;
const bulletSpeed = 10;
const bulletSize = 7;

// 🎯 Speed & Difficulty
const mobileSpeedFactor = isMobile ? 0.5 : 1.0;
let backgroundSpeed = 3 * mobileSpeedFactor;
let obstacleSpeed = 0.5 * mobileSpeedFactor;
let collectibleSpeed = 0.8 * mobileSpeedFactor;
let normalAcceleration = 0.3, slowAcceleration = 0.1;
let currentAcceleration = normalAcceleration;
let slowMovementTimer = 0;

// 🌎 Environment
let groundLevel = canvas.height * 1;
let ceilingLevel = canvas.height * 0.1;
const normalGravity = 0.3;
const mobileGravity = 0.15;
let gravity = isMobile ? mobileGravity : normalGravity;

// 🔄 Objects & Obstacles
let obstacles = [];
let stalactites = [];
let nextStalactiteTime = gameTime + Math.floor(Math.random() * 1000) + 2000;

// 🎨 Graphics & Effects
let bgLayers = [];
const numLayers = 4;
let bgReady = false;
const shipGlow = { radius: 20, opacity: 0.5, color: '#8a0303' };
let transitioning = false;
let transitionProgress = 0;
const transitionDuration = 2000; // Transition over 2 seconds
let previousBgLayers = [];
let currentBgLayers = [];


let obstaclesPassed = 0;
let bossActive = false;
let currentBoss = null;
let bossHits = 0;
let bossAngle = 0;
let bossRadius = 100;
let bossIndex = 0;
let bossRays = []; // Store boss rays
let bossShootInterval = 100; // Adjust time between shots
let lastBossShotTime = 0;

let nextCollectibleTime = gameTime + Math.floor(Math.random() * 500) + 300; // Initial random delay

// Start the game
startButton.addEventListener('click', () => startGame());

// Restart the game
restartButton.addEventListener('click', () => restartGame());

function restartGame() {
    // 🚫 Stop any ongoing animations
    cancelAnimationFrame(gameLoop);

    // 🛑 Hide Game Over screen
    gameOverScreen.style.display = 'none';

    // 🎮 Reset Game State
    playerLevel = 1;
    gameStarted = true;
    gameOver = false;
    bossActive = false;
    currentBoss = null; // Ensure boss is removed
    isExploding = false;
    isHit = false;
    flickerCount = 0;
    gameTime = 0;
    lastObstacleTime = 0;

    // 🚀 Reset Ship Position & Movement
    shipX = canvas.width * 0.2;
    shipY = canvas.height / 2;
    shipVelocity = 0;
    shipXVelocity = 0;

    // ⚡ Reset Game Mechanics
    backgroundSpeed = 5 * mobileSpeedFactor;
    obstacleSpeed = 1 * mobileSpeedFactor;
    collectibleSpeed = 1 * mobileSpeedFactor;
    normalAcceleration = 0.3;
    slowAcceleration = 0.1;
    currentAcceleration = normalAcceleration;
    slowMovementTimer = 0;

    // 🛡️ Reset Player Stats
    score = 0;
    lives = 5;
    invincible = false;
    invincibleTimer = 0;
    inventory = { "💀": 0, "💩": 0, "🔫": 0, "🐌": 0, "☢️": 0 };

    // 🚧 Clear Obstacles & Collectibles
    obstacles = [];
    activeCollectibles = [];
    bossRays = [];
    bullets = [];

    // 🎭 Reset UI Elements
    scoreDisplay.textContent = `Score\n${score}`;
    document.getElementById('lives').innerHTML = `❤️ ${lives}`;
    updateLevelDisplay();
    updateManaBar();
    updateArmorBar();
    updateInventoryDisplay();

    // 🎨 Reset Background
    createBackgroundLayers();

    changeGlow(0)

    // ▶️ Restart the Game Loop
    requestAnimationFrame(gameLoop);
}

function updateGame() {
    if (!gameStarted || gameOver || isHit) return;

    gameTime++;

    updateShooting();

    handleInput();

    if (invincible) {
        invincibleTimer--;
        if (invincibleTimer <= 0) {
            invincible = false;
        }
    }

    // Move ship vertically
    shipVelocity += gravity;
    shipVelocity *= 0.6;
    shipY += shipVelocity;

    // Limit ship velocity
    if (shipVelocity > 10) shipVelocity = 10;
    if (shipVelocity < -10) shipVelocity = -10;

    // Apply friction to smooth horizontal movement
    shipXVelocity *= shipFriction;
    shipX += shipXVelocity;

    // Prevent out-of-bounds movement
    if (shipX < 0) shipX = 0;
    if (shipX > canvas.width - shipWidth) shipX = canvas.width - shipWidth;
    if (shipY < ceilingLevel) shipY = ceilingLevel;
    if (shipY > groundLevel - shipHeight) shipY = groundLevel - shipHeight;

    // Add ship trail particles
    if (gameTime % 2 === 0) {
        createShipTrail();
    }

    updateStalactites();

    if (gameTime >= nextStalactiteTime) {
        createStalactite();
        nextStalactiteTime = gameTime + Math.floor(Math.random() * 1000) + 2000; // Next spawn in 800-1800 frames
    }

     // 🚀 **Check High Speed for Ghost Sound Effect**
    if (gameTime > fastSpeedThreshold) {
        playSound("ghost", playerLevel);
    }

    updateParticles();

    if (bossActive && gameTime - lastBossShotTime > bossShootInterval) {
        spawnBossRays();
        lastBossShotTime = gameTime;
    }

    updateBossRays();

    // Move obstacles using `obstacleSpeed`
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= obstacleSpeed;
        if (obstacles[i].x < -obstacles[i].width) {
            obstacles.splice(i, 1);
        }
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= obstacleSpeed;
        if (obstacles[i].x < -obstacles[i].width) {
            obstacles.splice(i, 1);
            obstaclesPassed++;
            if (obstaclesPassed % 20 == 0) {
                spawnBoss();
            }
        }
    }

    // Move collectibles using `obstacleSpeed`
    for (let i = activeCollectibles.length - 1; i >= 0; i--) {
        activeCollectibles[i].x -= obstacleSpeed;
        if (activeCollectibles[i].x < -50) {
            activeCollectibles.splice(i, 1);
        }
    }

    // Spawn collectibles occasionally
    if (gameTime >= nextCollectibleTime) {
        createCollectible();
        nextCollectibleTime = gameTime + Math.floor(Math.random() * 500) + 300; // Set next spawn
    }


    // Adjust the spawn frequency based on obstacle speed
    let obstacleSpawnRate = Math.max(80, 200 - obstacleSpeed * 20);
    // Faster speed = more frequent obstacles, but never less than 80 frames apart

    // Spawn obstacles dynamically
    if (gameTime - lastObstacleTime > obstacleSpawnRate) {
        createObstacle();
        lastObstacleTime = gameTime;
    }

    // Reduce shooting timer
    if (canShoot && shootTimer > 0) {
        shootTimer--;
        if (shootTimer <= 0) {
            canShoot = false;
        }
    }

    if (slowMovementTimer > 0) {
        slowMovementTimer--;
        if (slowMovementTimer <= 0) {
            currentAcceleration = normalAcceleration;
        }
    }

    checkCollisions();

    // Update UI
    scoreDisplay.innerHTML = `Score\n${score}`;
    document.getElementById('lives').innerHTML = `❤️ ${lives}`;
}


// Main draw function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground();        // Draw the background layers
    drawObstacles();         // Draw obstacles
    drawStalactites();       // Draw stalactites
    drawParticles();         // Draw particles
    drawCollectibles();      // Draw collectibles

    if (!isHit) drawShip();  // Draw ship if not hit
    drawBoss();              // Draw boss if active
    drawBossRays();          // Draw boss rays
    drawBullets();           // Draw bullets
    drawLaser();             // Draw laser
    drawExplosion();         // Draw explosions
}


function startGame() {
    if (isMobile) requestFullScreen();
    startScreen.style.display = 'none';
    gameOverScreen.style.display = 'none'; // Hide Game Over screen if visible
    gameStarted = true;
    startMusic(playerLevel);
    createBackgroundLayers();
    updateLevelDisplay()
    gameLoop();
}

function checkLifeGain() {
    let inventorySum = Object.values(inventory).reduce((sum, value) => sum + value, 0);

    if (inventorySum > 0 && inventorySum % 15 === 0) {
        lives++;
        playSound('life', playerLevel)
        document.getElementById('lives').innerHTML = `❤️ ${lives}`;
    }
}

// Handle game over
function handleGameOver() {
    if (gameOver) {
        gameOverScreen.style.display = 'flex';
        gameOverScreen.style.fontSize = 40;
        gameOverScoreDisplay.textContent = score;
    }
}

window.addEventListener("load", () => {
    document.body.addEventListener("click", function playStartupSound() {
        // Play initial sounds
        startMusic(playerLevel);
        playSound('startup', playerLevel);

        // Play another sound after 5 seconds
        setTimeout(() => {
            playSound('explosionAll', playerLevel); // Replace 'risada' with any sound you prefer
        }, 6000);

        document.body.removeEventListener("click", playStartupSound); // Remove listener after playing
    });
});