// script.js
const countdownDate = new Date("January 5, 2025 00:00:00").getTime();



document.addEventListener('DOMContentLoaded', function() {
    // Music Configuration
    const music = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');

    // Autoplay with User Interaction
    function initMusic() {
        music.volume = 0.3; // Soft volume
        music.play().catch(error => {
            console.log('Autoplay prevented', error);
            // Fallback: Add user interaction requirement
            musicToggle.style.display = 'block';
        });
    }

    // Music Toggle Functionality
    musicToggle.addEventListener('click', function() {
        if (music.paused) {
            music.play();
            musicToggle.textContent = '🎵 Pause Music';
        } else {
            music.pause();
            musicToggle.textContent = '🔇 Play Music';
        }
    });

    // Autoplay on Page Load
    window.addEventListener('click', function() {
        initMusic();
        // Remove this event listener after first interaction
        this.removeEventListener('click', arguments.callee);
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