var game;

playButton.addEventListener("click", () => {
  startScreen.style.display = "none";
  playButton.style.display = "none";
  levelScreen.style.display = "block";
  gameContainer.style.display = "none";
  backgroundMusic.play();

  // Game(target, moves, rows, columns)
  game = new Game(150, 20, 8, 8, "move");
});
