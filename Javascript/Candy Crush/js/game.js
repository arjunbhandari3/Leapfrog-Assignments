class Game {
  constructor(target, moves, rows, columns, mode) {
    this.target = target;
    this.moves = moves;
    this.rows = rows;
    this.columns = columns;
    this.mode = mode;
    this.level;

    this.initGame();
  }

  // initialize the game
  initGame() {
    this.level = new Level(
      this.target,
      this.moves,
      this.rows,
      this.columns,
      this.mode
    );
    this.level.initLevel();
    this.board = new Board(
      this.rows,
      this.columns,
      this.moves,
      this.target,
      this.gameCompleted,
      this.gameOver,
      this.mode,
      this.level.level
    );
    this.eventListeners();
  }

  // event listeners
  eventListeners() {
    // toggle background music [mute/unmute]
    playMusicButton.addEventListener(
      "click",
      this.toggleBackgroundMusic.bind(this)
    );

    retryButton.addEventListener("click", () => {
      this.nextScreen();
      gameOverMusic.pause();
      backgroundMusic.play();
    });

    nextButton.addEventListener("click", () => {
      this.nextScreen();
      levelCompletedMusic.pause();
      backgroundMusic.play();
    });
  }

  // toggle background Music
  toggleBackgroundMusic() {
    if (backgroundMusic.paused) {
      backgroundMusic.play();
      playMusicButton.style.backgroundImage = "url(images/unmute.png)";
    } else {
      backgroundMusic.pause();
      playMusicButton.style.backgroundImage = "url(images/mute.png)";
    }
  }

  gameOver() {
    gameOverScreen.style.display = "block";
    backgroundMusic.pause();
    gameOverMusic.play();
  }

  gameCompleted() {
    levelCompleted.style.display = "block";
    backgroundMusic.pause();
    levelCompletedMusic.play();
    localStorage.setItem("candy-crush-level-completed", this.level.level);
  }

  nextScreen() {
    startScreen.style.display = "block";
    gameOverScreen.style.display = "none";
    levelCompleted.style.display = "none";
    gameContainer.style.display = "none";
  }
}
