const hero = document.querySelector(".hero");
const video = document.getElementById("bgVideo");

const isMobile = window.matchMedia("(max-width: 768px)").matches;

video.src = isMobile
  ? "Assets/Video/bg-mobile.mp4"
  : "Assets/Video/bg-desktop.mp4";

let fallbackLocked = true;

function showFallback() {
  hero.classList.remove("video-ready");
  hero.classList.add("video-failed");
  fallbackLocked = true;
}

function hideFallback() {
  hero.classList.remove("video-failed");
  hero.classList.add("video-ready");
  fallbackLocked = false;
}

async function tryPlayVideo() {
  try {
    video.muted = true;
    video.playsInline = true;

    const playPromise = video.play();

    if (playPromise !== undefined) {
      await playPromise;
    }

    hideFallback();
  } catch (error) {
    showFallback();
  }
}

video.addEventListener("playing", hideFallback);

video.addEventListener("pause", () => {
  if (fallbackLocked || video.currentTime < 0.2) {
    showFallback();
  }
});

video.addEventListener("error", showFallback);
video.addEventListener("stalled", showFallback);
video.addEventListener("suspend", () => {
  if (!video.currentTime) showFallback();
});

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    tryPlayVideo();
  }
});

window.addEventListener("pageshow", tryPlayVideo);

tryPlayVideo();