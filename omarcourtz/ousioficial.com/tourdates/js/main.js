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