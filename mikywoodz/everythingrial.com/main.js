const video = document.getElementById("heroVideo");
const hero = document.querySelector(".hero");
const fallback = document.getElementById("fallbackBg");

function isMobileScreen() {
  return window.matchMedia("(max-width: 768px)").matches;
}

function getVideoSrc() {
  return isMobileScreen()
    ? "assets/video/bg-mobile.mp4"
    : "assets/video/bg-desktop.mp4";
}

function getPosterSrc() {
  return isMobileScreen()
    ? "assets/img/bg-mobile.webp"
    : "assets/img/bg-desktop.webp";
}

function showFallback() {
  if (!hero) return;
  hero.classList.remove("video-ready");
}

function showVideo() {
  if (!hero || !video) return;

  if (!video.paused && video.readyState >= 2) {
    hero.classList.add("video-ready");
  }
}

function tryPlayVideo() {
  const playPromise = video.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        setTimeout(showVideo, 150);
      })
      .catch(showFallback);
  }
}

function loadHeroVideo() {
  if (!video || !hero || !fallback) return;

  const nextSrc = getVideoSrc();
  const nextPoster = getPosterSrc();

  if (video.getAttribute("src") !== nextSrc) {
    hero.classList.remove("video-ready");

    video.pause();
    video.setAttribute("poster", nextPoster);
    video.setAttribute("src", nextSrc);
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.load();

    tryPlayVideo();

    setTimeout(() => {
      if (video.paused || video.readyState < 2) {
        showFallback();
      } else {
        showVideo();
      }
    }, 1800);
  }
}

if (video && hero && fallback) {
  loadHeroVideo();

  video.addEventListener("playing", showVideo);
  video.addEventListener("play", showVideo);
  video.addEventListener("canplay", showVideo);
  video.addEventListener("timeupdate", showVideo);
  video.addEventListener("error", showFallback);
  video.addEventListener("stalled", showFallback);

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      tryPlayVideo();
      setTimeout(showVideo, 300);
    }
  });

  window.addEventListener("resize", loadHeroVideo);
}