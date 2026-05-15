const video = document.getElementById("bgVideo");
const fallback = document.getElementById("videoFallback");
const videoWrapper = document.querySelector(".video-wrapper");

const desktopVideo = "assets/videos/bailemos-desktop.mp4";
const mobileVideo = "assets/videos/bailemos-mobile.mp4";

function showFallback() {
  videoWrapper.classList.add("video-failed");
  fallback.classList.remove("hidden");
}

function hideFallback() {
  videoWrapper.classList.remove("video-failed");
  fallback.classList.add("hidden");
}

function setVideoSource() {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const selectedVideo = isMobile ? mobileVideo : desktopVideo;

  if (video.getAttribute("src") !== selectedVideo) {
    video.setAttribute("src", selectedVideo);
    video.load();
  }

  const playPromise = video.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        hideFallback();
      })
      .catch(() => {
        showFallback();
      });
  }

  setTimeout(() => {
    if (video.paused || video.currentTime < 0.1) {
      showFallback();
    }
  }, 1600);
}

video.addEventListener("playing", hideFallback);

video.addEventListener("timeupdate", () => {
  if (video.currentTime > 0.1) {
    hideFallback();
  }
});

video.addEventListener("error", showFallback);

setVideoSource();

window.addEventListener("resize", setVideoSource);