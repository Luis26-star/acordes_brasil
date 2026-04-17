// js/player.js

const voices = ["soprano", "alto", "tenor", "bass"];
const STORAGE = "https://DEIN-PROJEKT.supabase.co/storage/v1/object/public/audio";
let currentSong = "canto_de_ossanha";
let loopActive = false;
let loopStart = 0;
let loopEnd = 0;
let updateInterval = null;

// Format Time Funktion
function formatTime(sec) {
    if (isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

// Progress Update
export function updateProgress() {
    const bar = document.getElementById("progressFill");
    const ref = document.getElementById("soprano");
    const currentTimeSpan = document.getElementById("currentTime");
    const durationSpan = document.getElementById("duration");
    
    if (updateInterval) clearInterval(updateInterval);
    
    updateInterval = setInterval(() => {
        if (ref && ref.duration && !isNaN(ref.duration)) {
            const p = (ref.currentTime / ref.duration) * 100;
            bar.style.width = p + "%";
            currentTimeSpan.innerText = formatTime(ref.currentTime);
            durationSpan.innerText = formatTime(ref.duration);
        }
    }, 200);
}

// ========== INIT PLAYER (MIT VERBESSERTEM LOOP) ==========
export function initPlayer() {
    voices.forEach(v => {
        const a = document.getElementById(v);
        if (a) {
            a.src = `${STORAGE}/${currentSong}/${v}.mp3`;
            
            // ð¥ VERBESSERTER LOOP CODE ð¥
            a.ontimeupdate = () => {
                if (loopActive && a.currentTime >= loopEnd) {
                    a.currentTime = loopStart;
                }
            };
            
            a.onerror = () => {
                document.getElementById("statusMsg").innerText = "â ï¸ Audio fehlt: " + v;
            };
        }
    });
    updateProgress();
}

// Change Song
export function changeSong(song) {
    currentSong = song;
    voices.forEach(v => {
        const a = document.getElementById(v);
        if (a) {
            a.pause();
            a.src = `${STORAGE}/${song}/${v}.mp3`;
            a.load();
        }
    });
    document.getElementById("statusMsg").innerHTML = `â Song gewechselt`;
}

// Play All
export function playAll() {
    const ref = document.getElementById("soprano");
    if (!ref) return;
    const t = ref.currentTime;
    voices.forEach(v => {
        const a = document.getElementById(v);
        if (a) {
            a.currentTime = t;
            a.play().catch(e => {
                document.getElementById("statusMsg").innerHTML = "â ï¸ Bitte zuerst interagieren";
            });
        }
    });
}

// Stop All
export function stopAll() {
    voices.forEach(v => {
        const a = document.getElementById(v);
        if (a) {
            a.pause();
            a.currentTime = 0;
        }
    });
    loopActive = false;
    document.getElementById("statusMsg").innerHTML = "â¹ Gestoppt";
}

// Play Single Voice
export function playVoice(v) {
    stopAll();
    const a = document.getElementById(v);
    if (a) {
        a.play().catch(e => {
            document.getElementById("statusMsg").innerHTML = "â ï¸ Bitte zuerst interagieren";
        });
    }
    const names = { soprano: "Sopran", alto: "Alt", tenor: "Tenor", bass: "Bass" };
    document.getElementById("statusMsg").innerHTML = `ðµ Spielt: ${names[v]}`;
}

// Set Tempo
export function setTempo(val) {
    const tempo = parseFloat(val);
    document.getElementById("tempoValue").innerText = tempo.toFixed(2) + "x";
    voices.forEach(v => {
        const a = document.getElementById(v);
        if (a) a.playbackRate = tempo;
    });
}

// Start Loop
export function startLoop(start, end) {
    loopStart = parseFloat(start);
    loopEnd = parseFloat(end);
    if (isNaN(loopStart) || isNaN(loopEnd) || loopStart >= loopEnd) {
        document.getElementById("statusMsg").innerHTML = "â ï¸ UngÃ¼ltige Loop-Werte";
        return;
    }
    loopActive = true;
    document.getElementById("statusMsg").innerHTML = `ð Loop: ${loopStart}s â ${loopEnd}s`;
}

// Stop Loop
export function stopLoop() {
    loopActive = false;
    document.getElementById("statusMsg").innerHTML = "â¹ Loop gestoppt";
}

// Seek Progress
export function seekProgress(event) {
    const bar = document.getElementById("progressBarContainer");
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percent = x / rect.width;
    const ref = document.getElementById("soprano");
    if (ref && ref.duration && !isNaN(ref.duration)) {
        const newTime = percent * ref.duration;
        voices.forEach(v => {
            const a = document.getElementById(v);
            if (a) a.currentTime = newTime;
        });
    }
}
