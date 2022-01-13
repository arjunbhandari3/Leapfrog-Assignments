class Candy {
  constructor(color, type, image, x, y, row, column, isMoving) {
    this.color = color;
    this.type = type;
    this.image = image;
    this.x = x;
    this.y = y;
    this.row = row;
    this.column = column;
    this.isMoving = isMoving;
  }

  // draw the candy on the canvas
  draw(context) {
    context.drawImage(this.image, this.x, this.y, CANDY_WIDTH, CANDY_HEIGHT);
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  resetPosition() {
    this.x = this.column * GRID_WIDTH + CANDY_PADDING;
    this.y = (7 - this.row) * GRID_HEIGHT + CANDY_PADDING;
  }

  isCandyAtDestination() {
    return this.y === (7 - this.row) * GRID_HEIGHT + CANDY_PADDING
      ? true
      : false;
  }

  // get a random candy
  getRandomCandy(type = "solid", color) {
    let candyColor = color;
    if (color == null) {
      let i = Math.floor(Math.random() * CANDY_COLORS.length);
      candyColor = CANDY_COLORS[i];
    }
    let candyImage = new Image();
    candyImage.src = CANDYTYPES[type][candyColor];
    candyImage.alt = `${type}-${candyColor}-candy`;
    candyImage.className = `${type}-${candyColor}-candy`;
    candyImage.height = CANDY_HEIGHT;
    candyImage.width = CANDY_WIDTH;

    return new Candy(candyColor, type, candyImage);
  }

  //check the points
  isPointContained(x, y) {
    if (
      x >= this.x &&
      x <= this.x + CANDY_WIDTH &&
      y >= this.y &&
      y <= this.y + CANDY_HEIGHT
    ) {
      return true;
    } else {
      return false;
    }
  }

  isValidMove() {
    //no-move case
    if (
      this.y <= (7 - this.row + 1) * GRID_HEIGHT &&
      this.y >= (7 - this.row) * GRID_HEIGHT &&
      this.x >= this.column * GRID_WIDTH &&
      this.x <= (this.column + 1) * GRID_WIDTH
    ) {
      return "no-move";
    }

    //check for vertical move
    if (
      this.x >= GRID_WIDTH * this.column &&
      this.x <= GRID_WIDTH * (this.column + 1)
    ) {
      if (
        this.y >= (7 - this.row - 1) * GRID_HEIGHT &&
        this.y <= (7 - this.row) * GRID_HEIGHT
      ) {
        return "up";
      }

      if (
        this.y + CANDY_HEIGHT >= (7 - this.row + 1) * GRID_HEIGHT &&
        this.y + CANDY_HEIGHT <= (7 - this.row + 2) * GRID_HEIGHT
      ) {
        return "down";
      }
    }

    // check for horizontal move
    if (
      this.y <= (7 - this.row + 1) * GRID_HEIGHT &&
      this.y >= (7 - this.row) * GRID_HEIGHT
    ) {
      if (
        this.x >= (this.column - 1) * GRID_WIDTH &&
        this.x <= this.column * GRID_WIDTH
      ) {
        return "left";
      }

      if (
        this.x + CANDY_WIDTH >= (this.column + 1) * GRID_WIDTH &&
        this.x + CANDY_WIDTH <= (this.column + 2) * GRID_WIDTH
      ) {
        return "right";
      }
    }

    return null;
  }
}
