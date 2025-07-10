
    const marker = document.querySelector('#marker');
    const sound = document.querySelector('#shibaSound');
    const toggleBtn = document.querySelector('#toggleBtn');

    const shibas = [
      document.querySelector('#shiba0-wrapper'),
      document.querySelector('#shiba2-wrapper'),
      document.querySelector('#shiba3-wrapper'),
      document.querySelector('#shiba4-wrapper')
    ];

    const total = shibas.length;
    const radius = 0.4;
    const speed = 0.005;
    let angle = 0;
    let rotating = true;

    function animateCircle() {
      if (!rotating) return;
      angle -= speed;

      for (let i = 0; i < total; i++) {
        const offset = (Math.PI * 2 / total) * i;
        const currentAngle = angle + offset;
        const x = radius * Math.cos(currentAngle);
        const z = radius * Math.sin(currentAngle);
        const rotY = THREE.Math.radToDeg(Math.atan2(x, z));
        shibas[i].setAttribute('position', `${x} 0 ${z}`);
        shibas[i].setAttribute('rotation', `0 ${rotY} 0`);
      }

      requestAnimationFrame(animateCircle);
    }

    marker.addEventListener('markerFound', () => {
      sound.play();
      if (rotating) animateCircle();
    });

    toggleBtn.addEventListener('click', () => {
      rotating = !rotating;
      toggleBtn.textContent = rotating ? 'Stop Rotasi' : 'Mulai Rotasi';
      if (rotating) animateCircle();
    });