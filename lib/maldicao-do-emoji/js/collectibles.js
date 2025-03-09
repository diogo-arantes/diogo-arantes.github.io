// 🏆 Collectibles & Inventory
let activeCollectibles = [];
let inventory = { "💀": 0, "💩": 0, "🔫": 0, "🐌": 0, "☢️": 0 };
const collectibles = [
    { emoji: "💀", name: "skull", points: 5, spawnRate: 0.6 },
    { emoji: "💩", name: "ring", points: 10, spawnRate: 0.4 },
    { emoji: "🔫", name: "gun", points: 15, spawnRate: 0.7 },
    { emoji: "🐌", name: "time", points: 10, spawnRate: 0.7 },
    { emoji: "☢️", name: "radiation", points: 10, spawnRate: 0.6 },
    { emoji: "🌪", name: "speedup", points: 0, spawnRate: 0.4 },
    { emoji: "🔋", name: "battery", points: 100, spawnRate: 0.3 },
];

function drawCollectibles() {
    ctx.font = "25px Arial";  // Increased font size for visibility
    if (isMobile) ctx.font = "35px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (const item of activeCollectibles) {
        if (!item.collected) {
            ctx.fillStyle = "white"; // Ensure high contrast for visibility
            ctx.fillText(item.emoji, item.x, item.y);
        }
    }
}

function createCollectible() {
    // Filter only items that **pass the probability check**
    let availableItems = collectibles.filter(item => Math.random() < item.spawnRate);

    if (availableItems.length === 0) return; // If no items pass, don't spawn anything

    let item = availableItems[Math.floor(Math.random() * availableItems.length)];
    let size = 25;
    let yPos = Math.random() * (groundLevel - ceilingLevel - size) + ceilingLevel;

    activeCollectibles.push({
        emoji: item.emoji,
        name: item.name,
        points: item.points,
        x: canvas.width,
        y: yPos,
        size: size,
        collected: false
    });
}