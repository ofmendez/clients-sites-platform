(function () {
  const desktopVideo = document.getElementById("videoDesktop");
  const mobileVideo = document.getElementById("videoMobile");
  const fallback = document.getElementById("heroFallback");
  const breakpoint = 767;
  const PLAY_TIMEOUT = 1200;

  function isMobile() {
    return (
      window.innerWidth <= breakpoint ||
      (
        window.matchMedia("(orientation: portrait)").matches &&
        window.matchMedia("(hover: none) and (pointer: coarse)").matches
      )
    );
  }

  function getActiveVideo() {
    return isMobile() ? mobileVideo : desktopVideo;
  }

  function getInactiveVideo() {
    return isMobile() ? desktopVideo : mobileVideo;
  }

  function showFallback() {
    fallback.style.display = "block";

    if (desktopVideo) {
      desktopVideo.style.display = "none";
      desktopVideo.pause();
    }

    if (mobileVideo) {
      mobileVideo.style.display = "none";
      mobileVideo.pause();
    }
  }

  function showVideo(video) {
    fallback.style.display = "none";
    video.style.display = "block";
  }

  function prepareVideos() {
    const activeVideo = getActiveVideo();
    const inactiveVideo = getInactiveVideo();

    if (inactiveVideo) {
      inactiveVideo.pause();
      inactiveVideo.style.display = "none";
    }

    if (activeVideo) {
      activeVideo.style.display = "none";
      activeVideo.muted = true;
      activeVideo.playsInline = true;
      activeVideo.setAttribute("muted", "");
      activeVideo.setAttribute("playsinline", "");
      activeVideo.setAttribute("webkit-playsinline", "");
    }

    fallback.style.display = "block";
  }

  async function attemptPlayback() {
    const activeVideo = getActiveVideo();
    if (!activeVideo) return;

    prepareVideos();

    let timeoutHit = false;

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        timeoutHit = true;
        reject(new Error("Video playback timeout"));
      }, PLAY_TIMEOUT);
    });

    const playPromise = activeVideo.play();

    if (!playPromise || typeof playPromise.then !== "function") {
      showFallback();
      return;
    }

    try {
      await Promise.race([playPromise, timeoutPromise]);

      if (!timeoutHit && !activeVideo.paused && !activeVideo.ended) {
        showVideo(activeVideo);
      } else {
        showFallback();
      }
    } catch (error) {
      showFallback();
    }
  }

  function handleVisibilityChange() {
    if (!document.hidden) {
      attemptPlayback();
    }
  }

  [desktopVideo, mobileVideo].forEach((video) => {
    if (!video) return;

    video.addEventListener("playing", () => {
      if (video === getActiveVideo()) {
        showVideo(video);
      }
    });

    video.addEventListener("error", () => {
      if (video === getActiveVideo()) {
        showFallback();
      }
    });

    video.addEventListener("stalled", () => {
      if (video === getActiveVideo()) {
        showFallback();
      }
    });

    video.addEventListener("suspend", () => {
      if (video === getActiveVideo() && video.currentTime === 0) {
        showFallback();
      }
    });
  });

  window.addEventListener("load", attemptPlayback);
  window.addEventListener("resize", attemptPlayback);
  window.addEventListener("orientationchange", attemptPlayback);
  document.addEventListener("visibilitychange", handleVisibilityChange);
})();