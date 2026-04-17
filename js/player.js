export function updateProgress() {
    const bar = document.getElementById("progressFill");
    const ref = document.getElementById("soprano");
    if (updateInterval) clearInterval(updateInterval);
    updateInterval = setInterval(() => {
        if (ref && ref.duration && !isNaN(ref.duration)) {
            const p = (ref.currentTime / ref.duration) * 100;
            bar.style.width = p + "%";
            document.getElementById("currentTime").innerText = formatTime(ref.currentTime);
        }
    }, 200);
}
