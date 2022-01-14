var game;

playButton.addEventListener("click", () => {
  startScreen.style.display = "none";
  gameContainer.style.display = "block";
  backgroundMusic.play();

  // Game(target, moves, rows, columns)
  game = new Game(150, 20, 8, 8, "move");
});
