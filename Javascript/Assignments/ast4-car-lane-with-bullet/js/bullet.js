class Bullet {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.car = parentElement.getElementsByClassName("player-car")[0];
    this.carPositionY = this.car.offsetTop;
    this.carPositionX = this.car.offsetLeft;
    this.bulletSpeed = 1;
    this.isBulletDestroyed = false;
    this.createBullet();
  }

  createBullet() {
    this.bulletElement = document.createElement("div");
    this.bulletElement.classList.add("bullet");
    this.bulletElement.style.position = "absolute";
    this.bulletOffsetPositionX = 35;
    this.xPosition = this.carPositionX + this.bulletOffsetPositionX;
    this.bulletElement.style.left = this.xPosition + "px";
    this.yPosition = this.carPositionY;
    this.bulletElement.style.top = this.yPosition + "px";
    this.parentElement.appendChild(this.bulletElement);
  }

  move() {
    this.yPosition -= this.bulletSpeed;

    this.draw();
    this.checkBullet();
  }

  checkBullet() {
    this.height = this.bulletElement.offsetHeight;
    if (-this.yPosition > this.height) {
      this.isBulletDestroyed = true;
      this.bulletElement.remove();
    }
  }

  draw() {
    this.bulletElement.style.top = this.yPosition + "px";
  }

  checkCollision(opponent) {
    this.width = this.bulletElement.offsetWidth;
    return (
      this.xPosition < opponent.xPosition + opponent.width &&
      this.xPosition + this.width > opponent.xPosition &&
      this.yPosition < opponent.yPosition + opponent.height &&
      this.yPosition + this.height > opponent.yPosition
    );
  }
}
