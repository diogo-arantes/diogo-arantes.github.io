const levelColors = [
    { ceiling: "#1a1a1a", floor: "#550505" }, // Nível 2: Pesadelos Rastejantes
    { ceiling: "#292929", floor: "#7a0c0c" }, // Nível 3: Horrores Cósmicos
    { ceiling: "#330d0d", floor: "#901919" }, // Nível 4: Portais para o Nada
    { ceiling: "#441515", floor: "#b32121" }, // Nível 5: Profundezas Infernais
    { ceiling: "#552222", floor: "#cc2929" }, // Nível 6: Pavor Supremo
    { ceiling: "#662a2a", floor: "#dd3030" }, // Nível 7: Ecos do Abismo
    { ceiling: "#702f2f", floor: "#e63939" }, // Nível 8: A Dança das Sombras
    { ceiling: "#7a3333", floor: "#ff4040" }, // Nível 9: Chamado dos Condenados
    { ceiling: "#833838", floor: "#ff4747" }, // Nível 10: A Presença Esquecida
    { ceiling: "#8d3d3d", floor: "#ff4f4f" }, // Nível 11: Murmúrios do Vazio
    { ceiling: "#974141", floor: "#ff5656" }, // Nível 12: O Ritual Profano
    { ceiling: "#a14646", floor: "#ff5e5e" }, // Nível 13: Visões de Outra Dimensão
    { ceiling: "#aa4b4b", floor: "#ff6666" }, // Nível 14: Os Sussurros da Escuridão
];

function updateManaBar() {
    let manaPercentage = (mana / maxMana) * 100;
    document.getElementById('mana-bar').style.width = `${manaPercentage}%`;

    // Se a mana acabou, o jogador perde uma vida
    if (mana <= 0) {
        loseLife();
        mana = maxMana; // Recupera a mana ao perder uma vida
    }
}

function updateArmorBar() {
    let armorPercentage = (armor / maxArmor) * 100;
    document.getElementById('armor-bar').style.width = `${armorPercentage}%`;
}

function updateLevelDisplay() {
    document.getElementById("level").textContent = `${playerLevel}`;
    document.getElementById("title").textContent = `${levelNames[playerLevel-1]}`;

    startBackgroundTransition();
}

function startBackgroundTransition() {
    previousBgLayers = [...bgLayers];
    createBackgroundLayers(); // Sets new bgLayers
    currentBgLayers = [...bgLayers];
    transitionProgress = 0;
    transitioning = true;
}

function updateTransition(deltaTime) {
    if (!transitioning) return;

    transitionProgress += deltaTime / transitionDuration;
    if (transitionProgress >= 1) {
        transitionProgress = 1;
        transitioning = false;
        previousBgLayers = [];
    }
}

function updateInventoryDisplay() {
    const inventoryDisplay = document.getElementById('inventory');
    inventoryDisplay.innerHTML = `
        💀 ${inventory["💀"]}
        💩 ${inventory["💩"]}
        🔫 ${inventory["🔫"]}
        🐌 ${inventory["🐌"]}
        ☢️ ${inventory["☢️"]}`
}

// Create background layers
function createBackgroundLayers() {
    bgLayers = []; // Clear previous layers

    // Colors for different levels
    const levelEffects = {
        1: { // 🌌 Outer Space
            type: "space",
            starColors: ["#ffffff", "#aaaaaa", "#888888"],
            planetColors: [
                "#0a0a1a", // Almost black with a faint blue
                "#1a0a0a", // Very dark red-black
                "#0a1a0a", // Very dark green-black
                "#0d0d1f", // Dark shadowy indigo
                "#1f0d0d", // Deep shadowy red
                "#0d1f0d"  // Muted dark forest green
            ]
        },
        2: { // ☁️ Entering Atmosphere
            type: "atmosphere",
            cloudColors: ["rgba(255, 100, 100, 0.3)", "rgba(200, 200, 200, 0.3)", "rgba(150, 150, 150, 0.2)"],
            fireColors: ["rgba(255, 50, 50, 0.5)", "rgba(255, 100, 0, 0.4)"]
        },
        3: { // 🌲 Deep Forest
            type: "forest",
            treeColors: ["#0d0a0a", "#1a0d0d", "#0d1a0d", "#102010", "#1a1414"],
            mistColors: ["rgba(40, 0, 0, 0.15)", "rgba(0, 40, 0, 0.1)", "rgba(20, 10, 10, 0.08)", "rgba(10, 10, 10, 0.05)"]
        }
    };

    const currentLevel = Math.min(playerLevel, 3);
    const effect = levelEffects[currentLevel];

    for (let i = 0; i < numLayers; i++) {
        const layer = {
            speed: 0.2 + i * 0.1,
            objects: []
        };

        if (effect.type === "space") {
            // ✨ Stars
            for (let j = 0; j < 50; j++) {
                layer.objects.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 1,
                    color: effect.starColors[Math.floor(Math.random() * effect.starColors.length)],
                    type: "star"
                });
            }

            // 🪐 Planets
            for (let j = 0; j < 3; j++) {
                layer.objects.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 100 + 50,
                    color: effect.planetColors[Math.floor(Math.random() * effect.planetColors.length)],
                    type: "planet"
                });
            }

        } else if (effect.type === "atmosphere") {
            // ☁️ Clouds
            for (let j = 0; j < 15; j++) {
                layer.objects.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    width: 100 + Math.random() * 200,
                    height: 50 + Math.random() * 100,
                    color: effect.cloudColors[Math.floor(Math.random() * effect.cloudColors.length)],
                    type: "cloud"
                });
            }

            // 🔥 Fire Particles
            for (let j = 0; j < 20; j++) {
                layer.objects.push({
                    x: Math.random() * canvas.width,
                    y: groundLevel - Math.random() * 100,
                    size: 10 + Math.random() * 20,
                    color: effect.fireColors[Math.floor(Math.random() * effect.fireColors.length)],
                    type: "fire"
                });
            }

        } else if (effect.type === "forest") {
            // 🌲 Trees
            for (let j = 0; j < 15; j++) {
                layer.objects.push({
                    x: Math.random() * canvas.width,
                    y: groundLevel,
                    width: 60 + Math.random() * 80,
                    height: 150 + Math.random() * 200,
                    color: effect.treeColors[Math.floor(Math.random() * effect.treeColors.length)],
                    type: "tree"
                });
            }

            // 🌫️ Mist
            for (let j = 0; j < 5; j++) {
                layer.objects.push({
                    x: Math.random() * canvas.width,
                    y: ceilingLevel + Math.random() * (groundLevel - ceilingLevel - 100),
                    width: canvas.width,
                    height: 80 + Math.random() * 50,
                    color: effect.mistColors[Math.floor(Math.random() * effect.mistColors.length)],
                    type: "mist"
                });
            }
        }

        bgLayers.push(layer);
    }

    bgReady = true;
}

function drawBackground(deltaTime) {
    if (!bgReady) return;
    updateTransition(deltaTime);

    // Draw Previous Layer (fading out)
    if (transitioning && previousBgLayers.length) {
        drawLayerSet(previousBgLayers, 1 - transitionProgress);
    }

    // Draw Current Layer (fading in)
    drawLayerSet(currentBgLayers, transitioning ? transitionProgress : 1);

    // 🎨 Draw Top Overlay Layer for Depth Effect
    drawTopOverlayLayer();
}

function drawLayerSet(layers, opacity) {
    layers.forEach(layer => {
        layer.objects.forEach(obj => {
            ctx.save();
            ctx.globalAlpha = opacity;

            if (obj.type === "star" || obj.type === "planet") {
                ctx.fillStyle = obj.color;
                ctx.beginPath();
                ctx.arc(obj.x, obj.y, obj.size, 0, Math.PI * 2);
                ctx.fill();
            } else if (obj.type === "cloud" || obj.type === "mist") {
                ctx.fillStyle = obj.color;
                ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
            } else if (obj.type === "fire") {
                ctx.fillStyle = obj.color;
                ctx.beginPath();
                ctx.arc(obj.x, obj.y, obj.size, 0, Math.PI * 2);
                ctx.fill();
            } else if (obj.type === "tree") {
                ctx.fillStyle = obj.color;
                ctx.fillRect(obj.x, obj.y - obj.height, obj.width / 5, obj.height);
            }

            ctx.restore();

            obj.x -= layer.speed;
            if (obj.x + (obj.width || obj.size || 10) < 0) {
                obj.x = canvas.width + Math.random() * 100;
            }
        });
    });
}

function drawTopOverlayLayer() {
    ctx.save();

    // Create a simple dark overlay using linear gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "rgba(0, 0, 0, 0.0)"); // Slightly dark at the top
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)"); // Darker at the bottom

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.restore();
}


let prevLevelColor = { ceiling: '#0a0a0a', floor: '#350101' };
let currentLevelColor = levelColors[0];

function startGroundCeilingTransition() {
    prevLevelColor = { ...currentLevelColor };
    currentLevelColor = levelColors[Math.min(playerLevel - 1, levelColors.length - 1)];
}