/* background.js */
/* Adaptation of Reinhard Lange's 'Particles Network Test | WIP' for sidebar only */
/* This version uses glowing red particles with soft connecting lines */

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('sidebar-canvas');
  const ctx = canvas.getContext('2d');

  let width, height;
  const dots = [];
  const maxDistance = 120;
  const dotCount = 60;

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  function createDot() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: 1.8 + Math.random() * 1.5
    };
  }

  function initDots() {
    dots.length = 0;
    for (let i = 0; i < dotCount; i++) {
      dots.push(createDot());
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // draw dots
    dots.forEach(dot => {
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.radius, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(255, 85, 85, 0.7)'; // red glow
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(255, 0, 0, 0.8)';
      ctx.fill();
    });

    // draw lines
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = `rgba(255, 0, 0, ${1 - dist / maxDistance})`;
          ctx.lineWidth = 0.3;
          ctx.shadowBlur = 0;
          ctx.stroke();
        }
      }
    }
  }

  function update() {
    dots.forEach(dot => {
      dot.x += dot.vx;
      dot.y += dot.vy;

      // bounce on edges
      if (dot.x < 0 || dot.x > width) dot.vx *= -1;
      if (dot.y < 0 || dot.y > height) dot.vy *= -1;
    });
  }

  function animate() {
    draw();
    update();
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resize();
    initDots();
  });

  resize();
  initDots();
  animate();
});
