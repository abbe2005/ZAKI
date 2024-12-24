document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('dynamic-background');
    const ctx = canvas.getContext('2d');
    const modeToggle = document.getElementById('mode-toggle');

    // Resize canvas to window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Particles Array
    const particles = [];

    // Determine Time of Day
    function detectTimeOfDay() {
        const hour = new Date().getHours();
        const isNightTime = hour < 6 || hour >= 18;
        document.body.classList.toggle('night-mode', isNightTime);
        return isNightTime;
    }

    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = detectTimeOfDay() 
                ? `rgba(255, 255, 255, ${Math.random() * 0.5})` 
                : `rgba(0, 0, 0, ${Math.random() * 0.2})`;
        }

        update(mouseX, mouseY) {
            // Mouse interaction
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 50) {
                // Move away from the mouse cursor
                this.x -= dx * 0.1; // Move in the opposite direction
                this.y -= dy * 0.1; // Move in the opposite direction
            }

            this.x += this.speedX;
            this.y += this.speedY;

            // Wrap around screen
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    // Initialize Particles
    function initParticles() {
        particles.length = 0;
        const particleCount = Math.floor(canvas.width * canvas.height / 5000);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    // Animation Loop
    let mouseX = 0, mouseY = 0;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update(mouseX, mouseY);
            particle.draw();
        });

        requestAnimationFrame(animate);
    }

    // Mouse Move Tracking
    canvas.addEventListener('mousemove', (event) => {
        mouseX = event.clientX; // Capture mouse X position
        mouseY = event.clientY; // Capture mouse Y position
    });

    // Initial Setup
    detectTimeOfDay();
    initParticles();
    animate();
});