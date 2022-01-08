class Game {
  constructor(target, moves, rows, columns) {
    this.target = target;
    this.moves = moves;
    this.rows = rows;
    this.columns = columns;
    this.score = 0;
    this.candiesArray = [];

    this.initGame();
  }

  // initialize the game
  initGame() {
    this.setCanvas();
    this.setValues();
    this.drawGrid();
    this.drawCandies();
  }

  // set the canvas and context
  setCanvas() {
    this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");
    this.canvas.width = this.columns * GRID_WIDTH;
    this.canvas.height = this.rows * GRID_HEIGHT;
    this.context.strokeStyle = "violetred";
    this.context.lineWidth = 0.2;
    this.canvasRect = this.canvas.getBoundingClientRect();
  }

  setValues() {
    //get the info containers
    this.scoreContainer = document.getElementById("score");
    this.movesContainer = document.getElementById("moves");
    this.targetContainer = document.getElementById("target");

    //update the info containers
    this.movesContainer.innerHTML = this.moves;
    this.targetContainer.innerHTML = this.target;
    this.scoreContainer.innerHTML = this.score;
  }

  clearCanvas() {
    this.context.clearRect(
      0,
      0,
      this.canvas.offsetWidth,
      this.canvas.offsetHeight
    );
  }

  //draw the grid
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

  // get a random candy
  getRandomCandy(type = "solid") {
    let i = Math.floor(Math.random() * (CANDY_COLORS.length - 1));
    let candyColor = CANDY_COLORS[i];

    let candyImage = new Image();
    candyImage.src = CANDYTYPES[type][candyColor];
    candyImage.alt = `${type}-${candyColor}-candy`;
    candyImage.className = `${type}-${candyColor}-candy`;
    candyImage.height = CANDY_HEIGHT;
    candyImage.width = CANDY_WIDTH;

    let candy = new Candy(candyColor, type, candyImage);

    return candy;
  }

  // get the candy at a specific position
  drawCandies() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        let candy = this.getRandomCandy();
        candy.x = i * GRID_WIDTH + CANDY_PADDING;
        candy.y = j * GRID_HEIGHT + CANDY_PADDING;
        candy.image.id = `${i}-${j}`;
        candy.row = i;
        candy.column = j;
        candy.isMoving = false;
        candy.direction = "down";
        console.log(candy);
        this.candiesArray.push(candy);
        candy.image.onload = () => {
          candy.draw(this.context);
        };
      }
    }
  }
}
