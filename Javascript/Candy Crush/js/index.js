var game;

playButton.addEventListener("click", () => {
  startScreen.style.display = "none";
  gameContainer.style.display = "block";
  backgroundMusic.play();
  playMusicButton.style.backgroundImage = "url(images/unmute.png)";
  game = new Game(100, 20, 8, 8);
});
