const releaseDate = new Date("2026-05-21T20:00:00-04:00").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function pad(number) {
  return String(number).padStart(2, "0");
}

function updateCountdown() {
  const now = new Date().getTime();
  const distance = releaseDate - now;

  if (distance <= 0) {
    daysEl.textContent = "00D";
    hoursEl.textContent = "00H";
    minutesEl.textContent = "00M";
    secondsEl.textContent = "00S";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  daysEl.textContent = `${pad(days)}D`;
  hoursEl.textContent = `${pad(hours)}H`;
  minutesEl.textContent = `${pad(minutes)}M`;
  secondsEl.textContent = `${pad(seconds)}S`;
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* AUDIO INTERACTIVO */

const audios = {
  topboy: document.getElementById("audio-topboy"),
  sech: document.getElementById("audio-sech"),
  myke: document.getElementById("audio-myke"),
  eladio: document.getElementById("audio-eladio"),
};

let activeArtist = null;

function stopAllAudios() {
  Object.values(audios).forEach((audio) => {
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  });

  document.querySelectorAll(".artist").forEach((artist) => {
    artist.classList.remove("is-active");
  });
}

function playArtistAudio(artistName) {
  const selectedAudio = audios[artistName];
  if (!selectedAudio) return;

  stopAllAudios();

  activeArtist = artistName;
  selectedAudio.currentTime = 0;
  selectedAudio.play();

  document.querySelectorAll(`[data-artist="${artistName}"]`).forEach((item) => {
    if (item.classList.contains("artist")) {
      item.classList.add("is-active");
    }
  });
}

const artistLabels = {
  topboy: "Top Boy",
  sech: "Sech",
  myke: "Myke Towers",
  eladio: "Eladio Carrión",
};

document.querySelectorAll("[data-artist]").forEach((item) => {
  item.addEventListener("click", () => {
    const artistName = item.dataset.artist;

    playArtistAudio(artistName);

    if (typeof gtag === "function") {
      gtag("event", "artist_click", {
        artist_name: artistLabels[artistName] || artistName,
        artist_slug: artistName,
        page_section: "interactive_artists"
      });
    }
  });
});