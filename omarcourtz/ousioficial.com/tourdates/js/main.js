document.body.classList.remove("popup-open");

function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false); // no rechazamos, solo devolvemos false
    img.src = src;
  });
}

function hideLoader() {
  document.body.classList.add("is-loaded");
}

// seguridad: si algo falla, en 1.2s igual se quita
setTimeout(hideLoader, 1200);

window.addEventListener("load", async () => {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const bgSrc = isMobile ? "assets/bg-mobile.webp" : "assets/bg-desktop.webp";
  const coverSrc = "assets/BannerOC.webp";

  await Promise.all([
    preloadImage(bgSrc),
    preloadImage(coverSrc)
  ]);

  hideLoader();
});


/* =========================================================
   WORLD TOUR UPDATES POPUP
========================================================= */

(() => {
  const popup = document.getElementById("tourPopup");

  if (!popup) return;

  const closeButtons = popup.querySelectorAll("[data-popup-close]");
  const subscribeButton = popup.querySelector("[data-popup-subscribe]");

  const storageKey = "omarTourPopupLastSeen";
  const ONE_DAY = 24 * 60 * 60 * 1000;

  function canShowPopup() {
    const lastSeen = localStorage.getItem(storageKey);

    if (!lastSeen) {
      return true;
    }

    const elapsedTime = Date.now() - Number(lastSeen);

    return elapsedTime >= ONE_DAY;
  }

  function openPopup() {
    if (!canShowPopup()) return;

    popup.classList.add("is-visible");
    popup.setAttribute("aria-hidden", "false");
    document.body.classList.add("popup-open");
  }

  function closePopup() {
    popup.classList.remove("is-visible");
    popup.setAttribute("aria-hidden", "true");
    document.body.classList.remove("popup-open");

    localStorage.setItem(storageKey, Date.now().toString());
  }

  closeButtons.forEach((button) => {
    button.addEventListener("click", closePopup);
  });

  subscribeButton?.addEventListener("click", () => {
    localStorage.setItem(storageKey, Date.now().toString());

    popup.classList.remove("is-visible");
    popup.setAttribute("aria-hidden", "true");
    document.body.classList.remove("popup-open");
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      popup.classList.contains("is-visible")
    ) {
      closePopup();
    }
  });

  window.addEventListener("load", () => {
    window.setTimeout(openPopup, 1500);
  });
})();


/* =========================================================
   SMOOTH SHRINKING STICKY TOUR HERO
========================================================= */

(() => {
  const hero = document.querySelector(".tour-hero-sticky");

  if (!hero) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let currentProgress = 0;
  let targetProgress = 0;
  let animationFrame = null;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function lerp(start, end, progress) {
    return start + (end - start) * progress;
  }

  function setHeroStyles(progress) {
    const isMobile = window.innerWidth <= 768;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let startWidth;
    let endWidth;

    let startHeight;
    let endHeight;

    let startPaddingTop;
    let endPaddingTop;

    let startPaddingBottom;
    let endPaddingBottom;

    let startMargin;
    let endMargin;

    if (isMobile) {
      startWidth = viewportWidth * 0.86;
      endWidth = viewportWidth * 0.68;

      startHeight = viewportHeight * 0.40;
      endHeight = Math.max(165, viewportHeight * 0.23);

      startPaddingTop = 16;
      endPaddingTop = 6;

      startPaddingBottom = 22;
      endPaddingBottom = 12;

      startMargin = 15;
      endMargin = 10;
    } else {
      startWidth = Math.min(1200, viewportWidth * 0.92);

      endWidth =
        startWidth -
        Math.min(360, viewportWidth * 0.22);

      startHeight = viewportHeight * 0.45;
      endHeight = Math.max(190, viewportHeight * 0.25);

      startPaddingTop = 50;
      endPaddingTop = 22;

      startPaddingBottom = 34;
      endPaddingBottom = 16;

      startMargin = 22;
      endMargin = 14;
    }

    const artWidth = lerp(
      startWidth,
      endWidth,
      progress
    );

    const artHeight = lerp(
      startHeight,
      endHeight,
      progress
    );

    const paddingTop = lerp(
      startPaddingTop,
      endPaddingTop,
      progress
    );

    const paddingBottom = lerp(
      startPaddingBottom,
      endPaddingBottom,
      progress
    );

    const artMargin = lerp(
      startMargin,
      endMargin,
      progress
    );

    const tabsScale = isMobile
      ? lerp(1, 0.965, progress)
      : lerp(1, 0.94, progress);

    const tabsPadding = lerp(5, 4, progress);

    const tabHeight = isMobile
      ? lerp(viewportWidth * 0.11, viewportWidth * 0.10, progress)
      : lerp(48, 43, progress);

    const tabFontSize = isMobile
      ? lerp(viewportWidth * 0.05, viewportWidth * 0.047, progress)
      : lerp(25, 23, progress);

    const tabMinWidth = lerp(160, 145, progress);

    hero.style.setProperty(
      "--hero-art-width",
      `${artWidth}px`
    );

    hero.style.setProperty(
      "--hero-art-height",
      `${artHeight}px`
    );

    hero.style.setProperty(
      "--hero-padding-top",
      `${paddingTop}px`
    );

    hero.style.setProperty(
      "--hero-padding-bottom",
      `${paddingBottom}px`
    );

    hero.style.setProperty(
      "--hero-art-margin",
      `${artMargin}px`
    );

    hero.style.setProperty(
      "--tabs-scale",
      tabsScale.toFixed(4)
    );

    hero.style.setProperty(
      "--tabs-padding",
      `${tabsPadding}px`
    );

    hero.style.setProperty(
      "--tab-height",
      `${tabHeight}px`
    );

    hero.style.setProperty(
      "--tab-font-size",
      `${tabFontSize}px`
    );

    hero.style.setProperty(
      "--tab-min-width",
      `${tabMinWidth}px`
    );

    const shadowOpacity = lerp(0, 0.28, progress);
    const shadowY = lerp(0, 20, progress);
    const shadowBlur = lerp(0, 50, progress);

    
  }

  function animateHero() {
    const difference =
      targetProgress - currentProgress;

    currentProgress += difference * 0.12;

    if (Math.abs(difference) < 0.001) {
      currentProgress = targetProgress;
    }

    setHeroStyles(currentProgress);

    if (currentProgress !== targetProgress) {
      animationFrame =
        window.requestAnimationFrame(animateHero);
    } else {
      animationFrame = null;
    }
  }

  function updateTargetProgress() {
    const isMobile = window.innerWidth <= 768;
    const animationDistance = isMobile ? 240 : 360;

    targetProgress = clamp(
      window.scrollY / animationDistance,
      0,
      1
    );

    if (!animationFrame) {
      animationFrame =
        window.requestAnimationFrame(animateHero);
    }
  }

  function initializeHero() {
    if (reduceMotion.matches) {
      currentProgress = 1;
      targetProgress = 1;
      setHeroStyles(1);
      return;
    }

    updateTargetProgress();

    window.addEventListener(
      "scroll",
      updateTargetProgress,
      { passive: true }
    );

    window.addEventListener("resize", () => {
      setHeroStyles(currentProgress);
      updateTargetProgress();
    });
  }

  initializeHero();
})();