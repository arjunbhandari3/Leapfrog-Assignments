// Mute Unmute Background Music
playMusicButton.addEventListener("click", () => {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    playMusicButton.style.backgroundImage = "url(images/unmute.png)";
  } else {
    backgroundMusic.pause();
    playMusicButton.style.backgroundImage = "url(images/mute.png)";
  }
});
