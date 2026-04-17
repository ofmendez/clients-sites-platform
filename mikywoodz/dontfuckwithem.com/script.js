let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: "aF0kyi4R3oU",
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 1,
      rel: 0,
      playsinline: 1,
      modestbranding: 1,
      loop: 1,
      playlist: "aF0kyi4R3oU"
    },
    events: {
      onReady: onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  event.target.mute();
  event.target.playVideo();
}