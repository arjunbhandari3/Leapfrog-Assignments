class Board {
  constructor(
    rows,
    columns,
    moves,
    target,
    gameCompleted,
    gameOver,
    mode,
    level
  ) {
    this.rows = rows;
    this.columns = columns;
    this.candiesArray = [];
    this.direction;
    this.score = 0;
    this.highScore = localStorage.getItem("candy-crush-high-score") ?? 0;
    this.moves = moves;
    this.target = target;
    this.timeLeft = 10;
    this.offsetY = 0;
    this.offsetX = 0;
    this.isMoving = false;
    this.selectedCandy = null;
    this.gameCompleted = gameCompleted;
    this.gameOver = gameOver;
    this.mode = mode;
    this.level = level;

    this.initBoard();
  }

  //* init the board
  initBoard() {
    this.setCanvas();
    this.setValues();
    this.drawGrid();
    this.drawCandies();
    this.animateCandies();
    this.eventListeners();
    this.setBoard();
  }

  //* set the canvas and context
  setCanvas() {
    this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");
    this.canvas.width = this.columns * GRID_WIDTH;
    this.canvas.height = this.rows * GRID_HEIGHT;
    this.context.strokeStyle = "black";
    this.context.lineWidth = 0.2;
    this.canvasRect = this.canvas.getBoundingClientRect();
  }

  //* set values in the information containers
  setValues() {
    movesContainer.innerHTML = this.moves;
    targetContainer.innerHTML = this.target;
    scoreContainer.innerHTML = this.score;
    highScoreContainer.innerHTML = this.highScore;
    levelHeader.innerHTML = this.level;
    console.log(this.level);
  }

  //* clear the canvas
  clearCanvas() {
    this.context.clearRect(
      0,
      0,
      this.canvas.offsetWidth,
      this.canvas.offsetHeight
    );
  }

  //* draw the (rows * columns) grid
  drawGrid() {
    this.clearCanvas();
    for (let i = 0; i <= this.rows; i++) {
      const x = i * GRID_WIDTH;
      this.context.moveTo(x, 0);
      this.context.lineTo(x, this.canvas.height);

      const y = i * GRID_HEIGHT;
      this.context.moveTo(0, y);
      this.context.lineTo(this.canvas.width, y);
      this.context.stroke();
    }
  }

  //* draw candies on the canvas
  drawCandies() {
    for (let i = 0; i < this.rows; i++) {
      let column = [];
      for (let j = this.columns - 1; j >= 0; j--) {
        let candy = new Candy().getRandomCandy();
        candy.x = i * GRID_WIDTH + CANDY_PADDING;
        candy.y = j * GRID_HEIGHT + CANDY_PADDING;
        candy.image.id = `${7 - j}-${i}`;
        candy.row = 7 - j;
        candy.column = i;
        candy.isMoving = false;
        candy.image.onload = () => {
          candy.draw(this.context);
        };

        column.push(candy);
      }
      this.candiesArray.push(column);
    }
    console.log(this.candiesArray);
    // remove matched candies in the beginning
    new CheckMatches(this.candiesArray).clearMatchesUntilStable(
      this.score,
      true
    );
  }

  //* animate the canvas
  animateCandies() {
    this.drawGrid();
    this.candiesArray.forEach((column) => {
      column.forEach((candy) => {
        if (candy.isMoving) {
          if (!candy.isCandyAtDestination()) {
            candy.y = Math.min(
              candy.y + CANDY_SPEED,
              (7 - candy.row) * GRID_HEIGHT + CANDY_PADDING
            );
          } else {
            candy.isMoving = false;
          }
        }

        candy.draw(this.context);
      });
    });

    this.animationId = requestAnimationFrame(this.animateCandies.bind(this));
  }

  //* event listeners
  eventListeners() {
    document.addEventListener("mousedown", this.handleMouseDown.bind(this));
    document.addEventListener("mouseup", this.handleMouseUp.bind(this));
  }

  handleMouseDown(event) {
    let x = event.clientX - this.canvasRect.left;
    let y = event.clientY - this.canvasRect.top;

    let candy = this.checkCandyClick(x, y);
    if (candy !== null) {
      this.selectedCandy = candy;
      this.offsetX = x - this.selectedCandy.x;
      this.offsetY = y - this.selectedCandy.y;
      this.isMoving = true;
      document.addEventListener("mousemove", this.handleMouseMove.bind(this));
    }
  }

  checkCandyClick(x, y) {
    for (let column of this.candiesArray) {
      for (let candy of column) {
        if (candy.isPointContained(x, y)) {
          return candy;
        }
      }
    }
    return null;
  }

  //* detects the mouse movement on edge of the canvas
  checkBoardEdge() {
    return this.selectedCandy.x >= 0 &&
      this.selectedCandy.x <= this.canvas.offsetWidth - CANDY_WIDTH &&
      this.selectedCandy.y >= 0 &&
      this.selectedCandy.y <= this.canvas.offsetHeight - CANDY_HEIGHT
      ? true
      : false;
  }

  handleMouseMove(event) {
    if (this.isMoving) {
      let x = event.clientX - this.canvasRect.left;
      let y = event.clientY - this.canvasRect.top;
      console.log(event.clientX, event.clientY);

      // check for mouse movement for grid edge and moving candyMoving (row+_1, column+_1)
      if (
        !this.checkBoardEdge() ||
        this.selectedCandy.isValidMove(this.rows, this.columns) === false
      ) {
        this.isMoving = false;
        this.direction = "no-move";

        this.selectedCandy.resetPosition();
        document.removeEventListener(
          "mousemove",
          this.handleMouseMove.bind(this)
        );

        return;
      }

      // check for mouse movement for candy on grid with (row+_1, column+_1)
      let direction = this.selectedCandy.isValidMove(this.rows, this.columns);
      if (direction) {
        this.direction = direction;
        this.selectedCandy.setPosition(x - this.offsetX, y - this.offsetY);
      } else {
        document.removeEventListener(
          "mousemove",
          this.handleMouseMove.bind(this)
        );
      }
    }
  }

  handleMouseUp(event) {
    if (this.selectedCandy) {
      //get swapping candies or false
      let swapCandies = new Swap(
        this.selectedCandy,
        this.candiesArray
      ).swapCandies(this.direction);
      this.isMoving = false;
      this.offsetX = 0;
      this.offsetY = 0;
      document.removeEventListener(
        "mousemove",
        this.handleMouseMove.bind(this)
      );

      if (swapCandies) {
        let checkMatches = new CheckMatches(this.candiesArray);
        console.log(swapCandies);
        if (
          swapCandies[0].type === "color_bomb" ||
          swapCandies[1].type === "color_bomb"
        ) {
          checkMatches.handleColorBomb(
            swapCandies,
            this.score,
            this.updateScore.bind(this)
          );
        }
        checkMatches.clearMatchesUntilStable(
          this.score,
          false,
          this.updateScore.bind(this),
          this.onCandiesClear.bind(this)
        );
      } else {
        this.selectedCandy.resetPosition();
      }

      this.selectedCandy = null;
    }
  }

  onCandiesClear() {
    if (this.mode === "time") {
      this.updateTime();
    } else {
      this.updateMoves();
    }
  }

  updateHighScore() {
    if (this.score > this.highScore) {
      localStorage.setItem("candy-crush-high-score", this.score);
    }
    this.highScore = this.score;
  }

  updateScore(score) {
    this.score = score;
  }

  setBoard() {
    if (this.mode === "time") {
      timeBoard.style.display = "block";
      moveBoard.style.display = "none";
    } else {
      moveBoard.style.display = "block";
      timeBoard.style.display = "none";
    }
  }

  updateMoves() {
    this.moves -= 1;
    movesContainer.innerHTML = this.moves;
    if (this.moves <= 0) {
      if (this.target > this.score) {
        cancelAnimationFrame(this.animationId);
        this.updateHighScore();
        this.gameOver();
      }
    }
    if (this.score >= this.target) {
      cancelAnimationFrame(this.animationId);
      this.updateHighScore();
      this.gameCompleted();
    }
  }

  updateTime() {
    let timeInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        timeLeftContainer.innerHTML = this.timeLeft;
      }
      if (this.timeLeft <= 0) {
        if (this.target > this.score) {
          clearInterval(timeInterval);
          this.updateHighScore();
          this.gameOver();
        }
      }
      if (this.score >= this.target) {
        this.clearInterval(timeInterval);
        this.updateHighScore();
        this.gameCompleted();
      }
    }, 1000);
  }
}
