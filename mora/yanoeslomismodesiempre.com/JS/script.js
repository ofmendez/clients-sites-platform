const viewport = document.querySelector('.viewport');
const wrapper = document.querySelector('.image-wrapper');
const responsiveBox = document.querySelector('.responsive-box');
const hotspots = document.querySelectorAll('.media-hotspot');
const initialFocusHotspot = document.querySelector('.media-hotspot--video');

let isDragging = false;
let didMove = false;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;
let lastX = 0;
let lastY = 0;
let velocityX = 0;
let velocityY = 0;
let inertiaFrame;

function clamp(val, min, max) {
  return Math.max(min, Math.min(val, max));
}

function updateTransform() {
  wrapper.style.transform = `translate(${currentX}px, ${currentY}px)`;
}

function getBounds() {
  const viewportRect = viewport.getBoundingClientRect();
  const contentRect = responsiveBox.getBoundingClientRect();

  const maxX = 0;
  const maxY = 0;
  const minX = viewportRect.width - contentRect.width;
  const minY = viewportRect.height - contentRect.height;

  return { minX, maxX, minY, maxY };
}

function centerOnElement(element) {
  if (!element) return;

  const bounds = getBounds();
  const viewportRect = viewport.getBoundingClientRect();
  const hotspotRect = element.getBoundingClientRect();

  const hotspotCenterX = hotspotRect.left + hotspotRect.width / 2;
  const hotspotCenterY = hotspotRect.top + hotspotRect.height / 2;

  const viewportCenterX = viewportRect.width / 2;
  const viewportCenterY = viewportRect.height / 2;

  let targetX = currentX + (viewportCenterX - hotspotCenterX);
  let targetY = currentY + (viewportCenterY - hotspotCenterY);

  currentX = clamp(targetX, bounds.minX, bounds.maxX);
  currentY = clamp(targetY, bounds.minY, bounds.maxY);

  updateTransform();
}

function centerImage() {
  const bounds = getBounds();
  const viewportRect = viewport.getBoundingClientRect();

  currentX = (bounds.minX + bounds.maxX) / 2;
  currentY = (bounds.minY + bounds.maxY) / 2;
  updateTransform();

  if (viewportRect.width <= 768 && initialFocusHotspot) {
    centerOnElement(initialFocusHotspot);
  }
}

function enableHotspots() {
  hotspots.forEach(h => {
    h.style.pointerEvents = 'auto';
  });
}

function disableHotspots() {
  hotspots.forEach(h => {
    h.style.pointerEvents = 'none';
  });
}

function stopInertia() {
  cancelAnimationFrame(inertiaFrame);
}

function startInertia() {
  const friction = 0.95;
  const minVelocity = 0.5;

  function animate() {
    velocityX *= friction;
    velocityY *= friction;

    if (Math.abs(velocityX) < minVelocity && Math.abs(velocityY) < minVelocity) {
      cancelAnimationFrame(inertiaFrame);
      return;
    }

    const bounds = getBounds();
    currentX = clamp(currentX + velocityX, bounds.minX, bounds.maxX);
    currentY = clamp(currentY + velocityY, bounds.minY, bounds.maxY);

    updateTransform();
    inertiaFrame = requestAnimationFrame(animate);
  }

  inertiaFrame = requestAnimationFrame(animate);
}

window.addEventListener('load', centerImage);
window.addEventListener('resize', centerImage);

wrapper.addEventListener('dragstart', e => e.preventDefault());
viewport.addEventListener('dragstart', e => e.preventDefault());

viewport.addEventListener('mousedown', (e) => {
  e.preventDefault();
  stopInertia();
  isDragging = true;
  didMove = false;

  startX = e.clientX - currentX;
  startY = e.clientY - currentY;
  lastX = e.clientX;
  lastY = e.clientY;

  document.body.classList.add('dragging');
});

window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  velocityX = e.clientX - lastX;
  velocityY = e.clientY - lastY;
  lastX = e.clientX;
  lastY = e.clientY;

  const dx = Math.abs(velocityX);
  const dy = Math.abs(velocityY);

  if (dx > 3 || dy > 3) {
    didMove = true;
    disableHotspots();
  }

  const bounds = getBounds();
  currentX = clamp(e.clientX - startX, bounds.minX, bounds.maxX);
  currentY = clamp(e.clientY - startY, bounds.minY, bounds.maxY);

  updateTransform();
});

window.addEventListener('mouseup', () => {
  isDragging = false;
  document.body.classList.remove('dragging');

  if (!didMove) return;

  enableHotspots();
  startInertia();
});

viewport.addEventListener('touchstart', (e) => {
  const isHotspot = e.target.closest('.media-hotspot');
  if (!isHotspot) {
    e.preventDefault();
  }

  stopInertia();
  isDragging = true;
  didMove = false;

  const touch = e.touches[0];
  startX = touch.clientX - currentX;
  startY = touch.clientY - currentY;
  lastX = touch.clientX;
  lastY = touch.clientY;
}, { passive: false });

window.addEventListener('touchmove', (e) => {
  if (!isDragging) return;

  const touch = e.touches[0];

  velocityX = touch.clientX - lastX;
  velocityY = touch.clientY - lastY;
  lastX = touch.clientX;
  lastY = touch.clientY;

  const dx = Math.abs(velocityX);
  const dy = Math.abs(velocityY);

  if (dx > 3 || dy > 3) {
    didMove = true;
    disableHotspots();
  }

  const bounds = getBounds();
  currentX = clamp(touch.clientX - startX, bounds.minX, bounds.maxX);
  currentY = clamp(touch.clientY - startY, bounds.minY, bounds.maxY);

  updateTransform();
}, { passive: true });

window.addEventListener('touchend', () => {
  isDragging = false;

  if (didMove) {
    enableHotspots();
    startInertia();
  }
});


/* =========================================================
   MENÚ DESPLEGABLE
========================================================= */
const bottomMenu = document.getElementById('bottomMenu');
const menuToggle = document.getElementById('menuToggle');
const menuPanel = document.getElementById('menuPanel');

if (bottomMenu && menuToggle && menuPanel) {
  function openMenu() {
    bottomMenu.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuPanel.setAttribute('aria-hidden', 'false');
  }

  function closeMenu() {
    bottomMenu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuPanel.setAttribute('aria-hidden', 'true');
  }

  function toggleMenu() {
    const isOpen = bottomMenu.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  menuPanel.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  document.addEventListener('click', (e) => {
    if (!bottomMenu.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });
}


/* =========================================================
   LOADER
========================================================= */
const loader = document.getElementById("loader");

if (loader) {
  const MIN_LOADER_TIME = 2200;
  const LOADER_FADE_TIME = 700;
  const loaderStartTime = performance.now();

  window.addEventListener("load", () => {
    const elapsed = performance.now() - loaderStartTime;
    const remaining = Math.max(0, MIN_LOADER_TIME - elapsed);

    setTimeout(() => {
  document.body.classList.add("page-ready");
  loader.classList.add("is-hidden");

  setTimeout(() => {
    loader.remove();
  }, LOADER_FADE_TIME);
}, remaining);
  });
}


document.body.classList.add('is-loaded');



/* =========================================================
   MYSTERY BOX INTERACTION
========================================================= */

const mysteryGroup = document.querySelector('.mystery-box-group');
const mysteryTrigger = document.querySelector('.mystery-trigger');
const mysteryVideo = document.getElementById('mysteryVideo');
const mysterySequence = document.getElementById('mysterySequence');

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

if (isSafari) {
  document.documentElement.classList.add('is-safari');
}

/* Secuencia WebP: Caja_00000.webp hasta Caja_00439.webp */
const totalFrames = 440;
const frameRate = 30;

let currentFrame = 0;
let sequenceInterval = null;
let mobileRedirectTimeout = null;

function getSequenceFrame(frame) {
  return `Images/mystery-sequence/Caja_${String(frame).padStart(5, '0')}.webp`;
}

function showSequenceFrame(frame) {
  if (!mysterySequence) return;
  mysterySequence.src = getSequenceFrame(frame);
}

function stopSequence() {
  clearInterval(sequenceInterval);
  sequenceInterval = null;
}

function resetSequence() {
  stopSequence();
  currentFrame = 0;
  showSequenceFrame(currentFrame);
}

function playSequence() {
  stopSequence();

  currentFrame = 0;
  showSequenceFrame(currentFrame);

  sequenceInterval = setInterval(() => {
    currentFrame++;

    if (currentFrame >= totalFrames - 1) {
      currentFrame = totalFrames - 1;
      showSequenceFrame(currentFrame);
      stopSequence();
      return;
    }

    showSequenceFrame(currentFrame);
  }, 1000 / frameRate);
}

function playMysteryAnimation() {
  if (isSafari) {
    playSequence();
  } else if (mysteryVideo) {
    mysteryVideo.currentTime = 0;
    mysteryVideo.play().catch(() => {});
  }
}

function resetMysteryAnimation() {
  if (isSafari) {
    resetSequence();
  } else if (mysteryVideo) {
    mysteryVideo.pause();
    mysteryVideo.currentTime = 0;
  }
}

if (mysteryGroup && mysteryTrigger) {
  const mysteryLink = mysteryTrigger.getAttribute('href');

  if (mysteryVideo) {
    mysteryVideo.pause();
    mysteryVideo.currentTime = 0;

    mysteryVideo.addEventListener('ended', () => {
      mysteryVideo.pause();
    });
  }

  resetSequence();

  if (!isTouchDevice) {
    mysteryTrigger.addEventListener('mouseenter', () => {
      clearTimeout(mobileRedirectTimeout);

      mysteryGroup.classList.add('is-hovering-mystery');

      playMysteryAnimation();
    });

    mysteryTrigger.addEventListener('mouseleave', () => {
      mysteryGroup.classList.remove('is-hovering-mystery');

      resetMysteryAnimation();
    });
  } else {
    mysteryTrigger.addEventListener('click', (e) => {
      e.preventDefault();

      clearTimeout(mobileRedirectTimeout);

      mysteryGroup.classList.add('is-hovering-mystery');

      playMysteryAnimation();

      mobileRedirectTimeout = setTimeout(() => {
        window.location.href = mysteryLink;
      }, 4000);
    });
  }
}