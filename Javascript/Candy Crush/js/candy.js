class Candy {
  constructor(color, type, image, x, y, row, column, isMoving, direction) {
    this.color = color;
    this.type = type;
    this.image = image;
    this.x = x;
    this.y = y;
    this.row = row;
    this.column = column;
    this.isMoving = isMoving;
    this.direction = direction;
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y, CANDY_WIDTH, CANDY_HEIGHT);
  }
}
