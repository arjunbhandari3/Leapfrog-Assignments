class Car {
  constructor(parentElement, carType) {
    this.parentElement = parentElement;
    this.laneWidth = 120;
    this.leftEndPositionX = 194;
    this.initalPosition = this.leftEndPositionX + this.laneWidth;
    this.xPosition = this.initalPosition;
    this.yPosition = 0;
    this.carType = carType;
    this.width = 100;
    this.height = 100;
    this.createCarElement();
  }

  createCarElement() {
    this.carElement = document.createElement("div");
    this.carElement.style.width = this.width + "px";
    this.carElement.style.height = this.height + "px";
    if (this.carType === "player") {
      this.createPlayerCar();
    } else {
      this.createOpponentCar();
    }
  }

  createPlayerCar() {
    this.carElement.classList.add("player-car");
    this.carElement.style.left = this.xPosition + "px";
    // this.yPosition = 464;
    this.yPosition = 600;
    this.carElement.style.top = this.yPosition + "px";
    this.carElement.style.background = "url(images/mycar.png) no-repeat";
    this.carElement.style.backgroundSize = "contain";
    this.parentElement.appendChild(this.carElement);
  }

  movePlayer(direction) {
    const endOfRoadOnLeft = this.initalPosition - this.laneWidth;
    const endOfRoadOnRight = this.initalPosition + this.laneWidth;

    this.carElement.style.transition = "all 0.5s";

    if (direction === 1 && this.xPosition < endOfRoadOnRight) {
      this.xPosition += this.laneWidth * direction;
    } else if (direction === -1 && this.xPosition > endOfRoadOnLeft) {
      this.xPosition += this.laneWidth * direction;
    }

    setTimeout(() => {
      this.carElement.style.transform = "rotate(0deg)";
    }, 200);

    this.carElement.style.left = this.xPosition + "px";
  }

  createOpponentCar() {
    this.carElement.classList.add("opponent-car");
    this.carElement.style.left = this.xPosition + "px";
    this.yPosition = -(this.carElement.offsetHeight + 10);
    this.carElement.style.top = this.yPosition + "px";
    this.carElement.style.background = "url(images/enemycar.png) no-repeat";
    this.carElement.style.backgroundSize = "contain";
    this.parentElement.appendChild(this.carElement);
    this.yPosition = -this.carElement.clientHeight + 5;
    this.drawOpponent();
  }

  moveOpponent() {
    this.yPosition += 8;
    this.drawOpponent();
  }

  drawOpponent() {
    this.carElement.style.top = this.yPosition + "px";
  }

  checkCollision(opponent) {
    return (
      this.xPosition < opponent.xPosition + opponent.width &&
      this.xPosition + this.width > opponent.xPosition &&
      this.yPosition < opponent.yPosition + opponent.height &&
      this.yPosition + this.height > opponent.yPosition
    );
  }
}
