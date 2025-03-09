// 🔊 Sound Effects & Music
const sounds = {
    sounds: {
        startup: { audio: new Audio("assets/audio/startup.mp3"), volume: 0.8 },
        risada: { audio: new Audio("assets/audio/laugh1.mp3"), volume: 0.5 },
        ghost: { audio: new Audio("assets/audio/ghost.mp3"), volume: 0.6 },
        shoot: { audio: new Audio("assets/audio/shoot.mp3"), volume: 0.7 },
        laser: { audio: new Audio("assets/audio/laser.mp3"), volume: 0.9 },
        explosion: { audio: new Audio("assets/audio/explosion.mp3"), volume: 0.8 },
        explosionAll: { audio: new Audio("assets/audio/explosion-all.mp3"), volume: 0.9 },
        collect: { audio: new Audio("assets/audio/collect.mp3"), volume: 0.7 },
        shield: { audio: new Audio("assets/audio/shield.mp3"), volume: 0.6 },
        life: { audio: new Audio("assets/audio/life.mp3"), volume: 0.8 },
        loseLife: { audio: new Audio("assets/audio/lose-life.mp3"), volume: 0.9 },
        scratching: { audio: new Audio("assets/audio/scratching.mp3"), volume: 0.4 },
        gameover: { audio: new Audio("assets/audio/gameover.mp3"), volume: 0.9 },
        boss: { audio: new Audio("assets/audio/boss.mp3"), volume: 1 },
    },
    level1: {
        music1: { audio: new Audio("assets/audio/bg1-1.mp3"), volume: 0.35 },
        music2: { audio: new Audio("assets/audio/bg1-2.mp3"), volume: 0.3 },
        music3: { audio: new Audio("assets/audio/bg1-3.mp3"), volume: 0.5 },
    },
    level2: {
        music1: { audio: new Audio("assets/audio/bg2-1.mp3"), volume: 0.35 },
        music2: { audio: new Audio("assets/audio/bg2-2.mp3"), volume: 1 },
        music3: { audio: new Audio("assets/audio/bg2-3.mp3"), volume: 0.5 },
    },
    level3: {
        music1: { audio: new Audio("assets/audio/bg3-1.mp3"), volume: 0.35 },
        music2: { audio: new Audio("assets/audio/bg3-2.mp3"), volume: 0.3 },
        music3: { audio: new Audio("assets/audio/bg3-3.mp3"), volume: 0.25 },
    },
    level4: {
        music1: { audio: new Audio("assets/audio/bg4-1.mp3"), volume: 0.35 },
        music2: { audio: new Audio("assets/audio/bg4-2.mp3"), volume: 0.2 },
        music3: { audio: new Audio("assets/audio/bg4-3.mp3"), volume: 0.5 },
    }
};

// 🎵 Configure Looping & Volume
Object.entries(sounds).forEach(([key, level]) => {
    Object.entries(level).forEach(([soundKey, soundObj]) => {
        const audio = soundObj.audio;
        audio.loop = ['music1', 'music2', 'music3'].includes(soundKey);
        audio.volume = soundObj.volume;
    });
});

// 🚀 Play Background Music for the Current Level
function startMusic(level = 1) {
    stopAllMusic(); // Ensure no overlap
    const currentSounds = sounds[`level${level}`];
    if (!currentSounds) return;

    currentSounds.music1?.audio.play();
    currentSounds.music2?.audio.play();
    currentSounds.music3?.audio.play();
}

// ⏹️ Stop All Background Music
function stopAllMusic() {
    Object.entries(sounds).forEach(([key, level]) => {
        Object.entries(level).forEach(([soundKey, soundObj]) => {
            const audio = soundObj.audio;
            audio.loop = ['music1', 'music2', 'music3'].includes(soundKey);
            audio.volume = soundObj.volume;
        });
    });
}

// 🔫 Play Sound Effects (Global Sounds)
function playSound(sound, level = 1) {
    const levelSounds = sounds[`level${level}`];
    const globalSounds = sounds.sounds;

    const playAudio = (soundObj) => {
        soundObj.audio.currentTime = 0;
        soundObj.audio.play();
    };

    if (globalSounds[sound]) {
        playAudio(globalSounds[sound]);
    } else if (levelSounds?.[sound]) {
        playAudio(levelSounds[sound]);
    }
}

// 🔇 Stop a Specific Sound (Global or Level-Specific)
function stopSound(sound, level = 1) {
    const levelSounds = sounds[`level${level}`];
    const globalSounds = sounds.sounds;

    const stopAudio = (soundObj) => {
        soundObj.audio.pause();
        soundObj.audio.currentTime = 0;
    };

    if (globalSounds[sound]) {
        stopAudio(globalSounds[sound]);
    } else if (levelSounds?.[sound]) {
        stopAudio(levelSounds[sound]);
    }
}