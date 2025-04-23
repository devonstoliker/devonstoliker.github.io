/* background.js */
/* Elegant, flowing mesh animation adapted from MachtWeb (https://codepen.io/machtweb/pen/mxXgNq) */
/* This version contains only canvas logic and is designed to run behind the sidebar */

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('sidebar-canvas');
  const ctx = canvas.getContext('2d');

  let w, h;
  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  const opts = {
    len: 50,
    speed: 0.2,
    size: 2,
    lineWidth: 0.4,
    color: 'rgba(100, 116, 139, 0.4)' // Slate grey tone
  };

  const dots = [];

  function Dot() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * opts.speed;
    this.vy = (Math.random() - 0.5) * opts.speed;
  }

  for (let i = 0; i < opts.len; i++) {
    dots.push(new Dot());
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // draw links
    for (let i = 0; i < opts.len; i++) {
      for (let j = i + 1; j < opts.len; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = opts.color;
          ctx.lineWidth = opts.lineWidth;
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.stroke();
        }
      }
    }

    // draw dots
    for (let i = 0; i < opts.len; i++) {
      const p = dots[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, opts.size, 0, 2 * Math.PI);
      ctx.fillStyle = opts.color;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      // bounce
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    }

    requestAnimationFrame(draw);
  }

  draw();
});
