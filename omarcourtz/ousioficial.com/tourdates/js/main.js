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

  function getLastSeen() {
    try {
      return Number(localStorage.getItem(storageKey)) || 0;
    } catch (error) {
      console.warn("No se pudo leer localStorage:", error);
      return 0;
    }
  }

  function saveLastSeen() {
    try {
      localStorage.setItem(storageKey, Date.now().toString());
    } catch (error) {
      console.warn("No se pudo guardar en localStorage:", error);
    }
  }

  function canShowPopup() {
    const lastSeen = getLastSeen();

    if (!lastSeen) return true;

    return Date.now() - lastSeen >= ONE_DAY;
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

    saveLastSeen();
  }

  closeButtons.forEach((button) => {
    button.addEventListener("click", closePopup);
  });

  subscribeButton?.addEventListener("click", closePopup);

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      popup.classList.contains("is-visible")
    ) {
      closePopup();
    }
  });

  window.setTimeout(openPopup, 1500);
})();