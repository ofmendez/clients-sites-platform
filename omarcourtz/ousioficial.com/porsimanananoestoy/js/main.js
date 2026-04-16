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

let userUnmuted = false;

// 1) Lista de videos (pon aquí los IDs en el orden de la playlist)
const VIDEOS = [
  { id: "B8eZ9PhdwP8", title: "OUTRO"},
  { id: "Glk0MDu2c24", title: "EL MUNDO SE VA A ACABAR"},
  { id: "AhdNGNlT0GE", title: "FOREVER TU GANTEL"},
  { id: "T-Tg1rhLOzw", title: "L a k e n o s h i"},
  { id: "ZSV5sC8wPqk", title: "VAMOaCOCHI"},
  { id: "wTNQbiPip_E", title: "SUSU"},
  { id: "bCxIIl1-HXw", title: "SIRENA"},
  { id: "xKhdixybmO4", title: "GANTEL y BELLAKz"},
  { id: "WWnGEai-Oag", title: "SI ESTÁS CON ALGUIEN"},
  { id: "61o7toHAJOg", title: "Dulces SueñoZzz"},
  { id: "5JqHbeq-v1E", title: "$UELTA GATITA $UELTA"},
  { id: "Qno3EvQIp34", title: "WHAT U NEED? (SexPlaylist 2)"},
  { id: "nONFnjR5VFI", title: "WO OH OH"},
  { id: "slmRkI1xAqk", title: "KOKO"},
  { id: "DsFYcJD9Y0k", title: "Comernos"},
  { id: "IczJJ76vJCA", title: "SKY"},
  { id: "h1mQkpo5q_8", title: "MOONLIGHT"},
  { id: "YXQJRvf1oRs", title: "POR SI MAÑANA NO ESTOY"}
];

let player;
let currentIndex = 0;

// 2) Thumbnails UI
function renderThumbs() {
  const wrap = document.getElementById("yt-thumbs");
  if (!wrap) return;

  wrap.innerHTML = VIDEOS.map((v, i) => {
    const thumb = `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;
    const title = v.title || `Video ${i + 1}`;
    return `
      <button class="yt-thumb ${i === 0 ? "is-active" : ""}" data-index="${i}" aria-label="Reproducir ${title}">
        <img src="${thumb}" alt="${title}">
      </button>
    `;
  }).join("");

  wrap.addEventListener("click", (e) => {
    const btn = e.target.closest(".yt-thumb");
    if (!btn) return;
    const idx = Number(btn.dataset.index);
    playIndex(idx, true);
  });
}

function setActiveThumb(idx) {
  document.querySelectorAll(".yt-thumb").forEach((el, i) => {
    el.classList.toggle("is-active", i === idx);
  });
}

// 3) Reproducir por índice
function playIndex(idx, shouldPlay) {
  if (!VIDEOS[idx]) return;
  currentIndex = idx;

  setActiveThumb(idx);

  if (player && typeof player.loadVideoById === "function") {
    player.loadVideoById(VIDEOS[idx].id);

if (!userUnmuted) {
  player.mute();
} else {
  player.unMute();
}

if (shouldPlay) player.playVideo();

  }
}

// 4) YouTube Iframe API
function loadYouTubeAPI() {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) return resolve();

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    window.onYouTubeIframeAPIReady = () => resolve();
    document.head.appendChild(tag);
  });
}

async function initYouTube() {
  if (!VIDEOS.length) {
    console.warn("No hay VIDEOS configurados. Agrega IDs en el array VIDEOS.");
    return;
  }

  renderThumbs();
  await loadYouTubeAPI();

  player = new YT.Player("yt-player", {
    videoId: VIDEOS[0].id,
    playerVars: {
      autoplay: 1,
      controls: 1,
      playsinline: 1,
      mute: 1,
      rel: 0,
      modestbranding: 1,
      iv_load_policy: 3
    },
    events: {
      onReady: (e) => {
        // Autoplay real: mute + play (algunos móviles igual pueden bloquearlo)
        e.target.mute();
        e.target.playVideo();
      },
    onStateChange: (e) => {

  // si el video está reproduciendo, revisamos si está mute o no
  if (e.data === YT.PlayerState.PLAYING) {
    if (!player.isMuted()) {
      userUnmuted = true;
    }
  }

  // Cuando termina: siguiente video
  if (e.data === YT.PlayerState.ENDED) {
    const next = (currentIndex + 1) % VIDEOS.length;
    playIndex(next, true);
  }
}

    }
  });
}

// Inicia cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", initYouTube);
