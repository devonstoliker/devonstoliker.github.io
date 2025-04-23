window.backgroundAnimationStarted = false;

document.addEventListener('DOMContentLoaded', () => {
  window.backgroundAnimationStarted = true;

  const canvas = document.getElementById('sidebar-bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let w = canvas.width = canvas.offsetWidth;
  let h = canvas.height = canvas.offsetHeight;

  const opts = {
    count: 75,
    color: '255,0,0',
    radius: 2,
    maxDistance: 140,
    speed: 0.3
  };

  const particles = [];

  function Particle() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * opts.speed;
    this.vy = (Math.random() - 0.5) * opts.speed;
  }

  function update() {
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, opts.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${opts.color}, 0.8)`;
      ctx.shadowBlur = 12;
      ctx.shadowColor = `rgba(${opts.color}, 1)`;
      ctx.fill();
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < opts.maxDistance) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${opts.color}, ${(1 - dist / opts.maxDistance)})`;
          ctx.lineWidth = 0.4;
          ctx.shadowBlur = 0;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(update);
  }

  function init() {
    for (let i = 0; i < opts.count; i++) {
      particles.push(new Particle());
    }
    update();
  }

  window.addEventListener('resize', () => {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  });

  init();
});
