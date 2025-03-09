// 🔊 Sound Effects & Music
const sounds = {
    startup: new Audio("assets/audio/startup.mp3"),
    music1: new Audio("assets/audio/background-layer-0.mp3"),
    music2: new Audio("assets/audio/background-layer-1.mp3"),
    music3: new Audio("assets/audio/background-layer-2.mp3"),
    risada: new Audio("assets/audio/risada-do-mal.mp3"),
    ghost: new Audio("assets/audio/ghost.mp3"),
    shoot: new Audio("assets/audio/shoot.mp3"),
    laser: new Audio("assets/audio/laser.mp3"),
    explosion: new Audio("assets/audio/explosion.mp3"),
    explosionAll: new Audio("assets/audio/explosion-all.mp3"),
    collect: new Audio("assets/audio/collect.mp3"),
    shield: new Audio("assets/audio/shield.mp3"),
    life: new Audio("assets/audio/life.mp3"),
    loseLife: new Audio("assets/audio/lose-life.mp3"),
    scratching: new Audio("assets/audio/scratching.mp3"),
    gameover: new Audio("assets/audio/gameover.mp3")
};

// 🎵 Configure Looping & Volume
Object.values(sounds).forEach(sound => (sound.loop = false));
sounds.music1.loop = sounds.music2.loop = sounds.music3.loop = true;
sounds.music1.volume = 0.3;
sounds.music2.volume = 0.2;
sounds.music3.volume = 0.4;

// 🚀 Play Background Music when the game starts
function startMusic() {
    sounds.music2.play();
    sounds.music3.play();
}

// 🔫 Play Sound Effects
function playSound(sound) {
    if (sounds[sound]) {
        sounds[sound].currentTime = 0; // Reset to allow rapid triggers
        sounds[sound].play();
    }
}