const canvas = document.getElementById("sidebar-canvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let particles = [];

function Particle(x, y, vx, vy, radius) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.radius = radius;
}

Particle.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  ctx.fillStyle = "rgba(255,0,0,0.6)";
  ctx.shadowColor = "rgba(255,0,0,1)";
  ctx.shadowBlur = 12;
  ctx.fill();
};

function initParticles() {
  particles = [];
  for (let i = 0; i < 70; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const vx = Math.random() * 1 - 0.5;
    const vy = Math.random() * 1 - 0.5;
    const radius = 2;
    particles.push(new Particle(x, y, vx, vy, radius));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "lighter";

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    p.draw();

    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j];
      const dx = p.x - p2.x;
      const dy = p.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 140) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = "rgba(255,0,0," + (1 - dist / 140) + ")";
        ctx.lineWidth = 0.4;
        ctx.shadowBlur = 0;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

initParticles();
animate();

window.addEventListener("resize", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  initParticles();
});
