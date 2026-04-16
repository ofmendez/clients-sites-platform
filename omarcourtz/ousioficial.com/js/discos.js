
  (() => {
    const cards = document.querySelectorAll('.js-album');

    cards.forEach((card) => {
      const inner = card.querySelector('.album-card__inner');
      const isLeft = card.classList.contains('album-card--left');

      let hover = false;
      let currentX = 0;
      let currentY = 0;
      let targetX = 0;
      let targetY = 0;

      const baseY = isLeft ? 34 : -34;
      const hoverY = 0;

      function animate() {
        currentX += (targetX - currentX) * 0.12;
        currentY += (targetY - currentY) * 0.12;

        const activeBaseY = hover ? hoverY : baseY;
        const pushZ = hover ? 52 : 0;
        const scale = hover ? 1.035 : 1;

        inner.style.transform = `
          rotateY(${activeBaseY + currentY}deg)
          rotateX(${currentX}deg)
          rotateZ(0deg)
          translateZ(${pushZ}px)
          scale(${scale})
        `;

        requestAnimationFrame(animate);
      }

      card.addEventListener('mouseenter', () => {
        hover = true;
      });

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;

        const offsetX = px - 0.5;
        const offsetY = py - 0.5;

        /* tilt sutil */
        targetY = offsetX * 14;
        targetX = offsetY * -14;
      });

      card.addEventListener('mouseleave', () => {
        hover = false;
        targetX = 0;
        targetY = 0;
      });

      animate();
    });
  })();
