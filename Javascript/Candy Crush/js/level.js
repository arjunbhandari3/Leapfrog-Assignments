class Level {
  constructor(target, moves, rows, columns, mode) {
    this.level = localStorage.getItem("candy-crush-level") ?? 1;
    this.target = target;
    this.moves = moves;
    this.rows = rows;
    this.columns = columns;
    this.mode = mode;
  }

  initLevel() {
    this.nextLevel();
    this.setTimeout();
  }

  setTimeout() {
    this.increase = setTimeout(() => {
      startScreen.style.display = "none";
      playButton.style.display = "none";
      // levelScreen.style.display = "none";
      gameContainer.style.display = "block";
    }, 1500);
  }

  nextLevel() {
    if (localStorage.getItem("candy-crush-level-completed") == this.level) {
      if (this.level <= 10) {
        this.level++;
      } else {
        this.level = 1;
      }
    }

    // levelContainer.innerHTML = this.level;
    this.setChangesToNextLevel();
    this.storeLevel();
  }

  setChangesToNextLevel() {
    this.target + 20;
    this.moves + 5;

    if (this.level % 3 === 0) {
      this.mode = "time";
    }
  }

  storeLevel() {
    localStorage.setItem("candy-crush-level", this.level);
  }
}
