/* background.js */
/* Neural Drift – A distinctive animation of flowing neuron-like filaments behind the sidebar */
/* Uses bezier curves and pulses for a more unique neuroscientific aesthetic */

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("sidebar-canvas");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  class Filament {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.length = 80 + Math.random() * 60;
      this.angle = Math.random() * 2 * Math.PI;
      this.speed = 0.2 + Math.random() * 0.2;
      this.alpha = 0.2 + Math.random() * 0.3;
      this.cpOffset = 30 + Math.random() * 20;
    }

    update() {
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;

      // Bounce at edges
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }

    draw() {
      const endX = this.x + Math.cos(this.angle) * this.length;
      const endY = this.y + Math.sin(this.angle) * this.length;

      const cp1x = this.x + Math.cos(this.angle + 0.5) * this.cpOffset;
      const cp1y = this.y + Math.sin(this.angle + 0.5) * this.cpOffset;
      const cp2x = endX + Math.cos(this.angle - 0.5) * this.cpOffset;
      const cp2y = endY + Math.sin(this.angle - 0.5) * this.cpOffset;

      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
      ctx.strokeStyle = `rgba(100, 116, 139, ${this.alpha})`; // soft slate tone
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
  }

  const filaments = Array.from({ length: 40 }, () => new Filament());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const f of filaments) {
      f.update();
      f.draw();
    }

    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", () => {
    resizeCanvas();
  });

  resizeCanvas();
  animate();
});
