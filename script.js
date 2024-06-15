const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const confetti = [];

function ConfettiParticle(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 5;
    this.speed = Math.random() * 3 + 1;
    this.angle = Math.random() * 360;
    this.colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffc0cb', '#ffefd5'];
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
}

ConfettiParticle.prototype.update = function() {
    this.y += this.speed;
    this.x += Math.sin(this.angle) * this.speed;
    if (this.y > canvas.height) {
        this.y = 0;
        this.x = Math.random() * canvas.width;
    }
};

ConfettiParticle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
};

function addConfetti() {
    for (let i = 0; i < 100; i++) {
        confetti.push(new ConfettiParticle(Math.random() * canvas.width, Math.random() * canvas.height));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < confetti.length; i++) {
        confetti[i].update();
        confetti[i].draw();
    }
    requestAnimationFrame(animate);
}

function showConfetti() {
    addConfetti();
    animate();
}

document.addEventListener('DOMContentLoaded', () => {
    showConfetti();
});
