// Handle keyboard input
const keys = {};


let touchStartX = null;
let touchStartY = null;
let touchStartTime = null;
let isMoving = false; // Track if the user is swiping or tapping

window.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
        isMoving = false; // Reset movement state
    }
});

window.addEventListener("touchmove", (e) => {
    if (touchStartX === null || touchStartY === null) return;

    let touchX = e.touches[0].clientX;
    let touchY = e.touches[0].clientY;
    let deltaX = touchX - touchStartX;
    let deltaY = touchY - touchStartY;

    let movementThreshold = 10; // Lower threshold for smoother control
    let adjustedTouchSensitivity = currentAcceleration * 20; // Adjust movement strength

    // **Detect swipe movement in both directions**
    if (Math.abs(deltaX) > movementThreshold || Math.abs(deltaY) > movementThreshold) {
        isMoving = true; // Mark as a movement (not a tap)

        // **Allow diagonal movement naturally**
        shipXVelocity += (deltaX * adjustedTouchSensitivity) * 0.02;
        shipVelocity += (deltaY * adjustedTouchSensitivity) * 0.08;

        // **Update last touch position for smoother movement**
        touchStartX = touchX;
        touchStartY = touchY;
    }
});

window.addEventListener("touchend", (e) => {
    if (touchStartX === null || touchStartY === null) return;

    let touchEndX = e.changedTouches[0].clientX;
    let touchEndY = e.changedTouches[0].clientY;
    let touchEndTime = Date.now();

    let deltaX = touchEndX - touchStartX;
    let deltaY = touchEndY - touchStartY;
    let timeDiff = touchEndTime - touchStartTime;

    let tapThreshold = 120; // Max time for a tap (milliseconds)
    let minMovement = 20; // Ignore very small accidental movements

    // **Detect a tap (not a swipe) → SHOOT**
    if (!isMoving && timeDiff < tapThreshold && Math.abs(deltaX) < minMovement && Math.abs(deltaY) < minMovement) {
        shoot();
    }

    // Reset touch tracking
    touchStartX = null;
    touchStartY = null;
    touchStartTime = null;
});


window.addEventListener('keydown', e => {
    keys[e.key] = true;
});
window.addEventListener('keyup', e => {
    keys[e.key] = false;
});
window.addEventListener("keydown", (e) => {
    if (e.key === " " || e.code === "Space") {
        shoot();
    }
});

function handleInput() {
    if (keys['w'] || keys['W'] || keys['ArrowUp']) {
        shipVelocity -= currentAcceleration * 4;
    }
    if (keys['s'] || keys['S'] || keys['ArrowDown']) {
        shipVelocity += currentAcceleration * 2;
    }
    if (keys['a'] || keys['A'] || keys['ArrowLeft']) {
        shipXVelocity -= currentAcceleration * 1.2;
    }
    if (keys['d'] || keys['D'] || keys['ArrowRight']) {
        shipXVelocity += currentAcceleration;
    }
}