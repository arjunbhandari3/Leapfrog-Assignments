class Bird {
  constructor() {
    this.bird = document.getElementById("bird");
    this.bird.className = "normal";
    this.bird.style.top = "250px";
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.downStep = 1;
    this.upStep = 50;
    this.fallState = true;
  }

  fall(gravity) {
    this.bird.className = "going-down";
    this.gravitySpeed += gravity;
    if (Math.sign(gravity) == 1) {
      this.bird.style.top =
        parseInt(this.bird.style.top) + this.gravitySpeed + "px";
    } else {
      this.bird.className = "going-up";
      for (var i = 0; i < 10; i++) {
        this.bird.style.top =
          parseInt(this.bird.style.top) - 4 + this.gravity + "px";
      }
      this.gravitySpeed = 0;
    }

    if (parseInt(this.bird.style.top) > 500) {
      this.bird.className = "normal";
      bird.bird.style.display = "none";
      this.gravitySpeed = 0;
      playingState = "gameover";
    }
  }
}
