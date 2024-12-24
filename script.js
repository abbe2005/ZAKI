// script.js
const countdownDate = new Date("January 5, 2025 00:00:00").getTime();

document.addEventListener('DOMContentLoaded', function() {
    // Music Configuration
    const music = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');

    // Initially hide the music toggle button
    musicToggle.style.display = 'block';
    musicToggle.textContent = '▶️ Play Music';

    // Prevent autoplay
    music.volume = 0.3;
    music.pause();

    // Music Toggle Functionality
    musicToggle.addEventListener('click', function() {
        if (music.paused) {
            music.play();
            musicToggle.textContent = '🎵 Playing';
        } else {
            music.pause();
            musicToggle.textContent = '🔇 Paused';
        }
    });
});

const countdownFunction = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the respective elements
    document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;

    // If the countdown is over, display a message
    if (distance < 0) {
        clearInterval(countdownFunction);
        document.querySelector(".countdown").innerHTML = "EXPIRED";
    }
}, 1000);