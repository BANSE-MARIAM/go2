const playBtn = document.getElementById('playBtn');
const audio = new Audio('song.mp3');
const progress = document.querySelector('.progress');

playBtn.addEventListener('click', () => {
if (audio.paused) {
audio.play();
playBtn.textContent = 'Pause';
} else {
audio.pause();
playBtn.textContent = 'Play';
}
});

audio.addEventListener('timeupdate', () => {
progress.value = (audio.currentTime / audio.duration) * 100;
});

progress.addEventListener('input', () => {
audio.currentTime = (progress.value / 100) * audio.duration;
});

