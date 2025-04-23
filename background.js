/* background.js */
/* Full recreation of MachtWeb's red glowing network (CodePen: mxXgNq) adapted to sidebar */

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('sidebar-canvas');
  const ctx = canvas.getContext('2d');

  let width, height;
  const dots = [];
  const config = {
    dotCount: 75,
    maxDist: 100,
    dotRadius: 2,
    dotSpeed: 0.5,
    glowColor: '255, 0, 0' // Red glow
  };

  function resizeCanvas() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    initDots();
  });

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
      ctx.shadowBlur = 10;
      ctx.shadowColor = `rgba(${config.glowColor}, 1)`;
      ctx.fill();
    }
  }

  function drawLines() {
    ctx.lineWidth = 0.4;
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
    ctx.globalCompositeOperation = 'lighter'; // Key for luminous blending
    drawLines();
    drawDots();
    updateDots();
    requestAnimationFrame(animate);
  }

  resizeCanvas();
  initDots();
  animate();
});
