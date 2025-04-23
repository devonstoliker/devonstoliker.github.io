/* background.js */
/* MachtWeb-inspired red glow particle mesh using #sidebar-bg-canvas */

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('sidebar-bg-canvas');
  if (!canvas) return; // Ensure canvas exists before continuing

  const ctx = canvas.getContext('2d');

  let width, height;
  const dots = [];
  const config = {
    dotCount: 75,
    maxDist: 100,
    dotRadius: 2,
    dotSpeed: 0.5,
    glowColor: '255, 0, 0' // Red
  };

  function resizeCanvas() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  function initDots() {
    dots.length = 0;
    for (let i = 0; i < config.dotCount; i++) {
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * config.dotSpeed,
        vy: (Math.random() - 0.5) * config.dotSpeed
      });
    }
  }

  function drawDots() {
    for (const d of dots) {
      ctx.beginPath();
      ctx.arc(d.x, d.y, config.dotRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${config.glowColor}, 0.8)`;
      ctx.shadowBlur = 15;
      ctx.shadowColor = `rgba(${config.glowColor}, 1)`;
      ctx.fill();
    }
  }

  function drawLines() {
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < config.maxDist) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = `rgba(${config.glowColor}, ${1 - dist / config.maxDist})`;
          ctx.lineWidth = 0.4;
          ctx.shadowBlur = 0;
          ctx.stroke();
        }
      }
    }
  }

  function updateDots() {
    for (const d of dots) {
      d.x += d.vx;
      d.y += d.vy;

      if (d.x < 0 || d.x > width) d.vx *= -1;
      if (d.y < 0 || d.y > height) d.vy *= -1;
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'lighter'; // Required for glow
    drawLines();
    drawDots();
    updateDots();
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    initDots();
  });

  resizeCanvas();
  initDots();
  animate();
});
