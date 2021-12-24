var parent = document.getElementById("container");

parent.style.width = "650px";
parent.style.height = "650px";
parent.style.border = "1px solid black";
parent.style.position = "relative";
parent.style.margin = "50px 200px";

class Ball {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;

    this.ball = document.createElement("div");

    this.ball.style.backgroundColor = this.color;
    this.ball.style.width = "50px";
    this.ball.style.height = "50px";
    this.ball.style.borderRadius = "25px";
    this.ball.style.position = "absolute";
    this.ball.style.top = this.y / 2 + "px";
    this.ball.style.left = this.x / 2 + "px";

    var top = parseInt(this.ball.style.top);
    var direction = "down";

    setInterval(() => {
      parent.appendChild(this.ball);
      if (direction === "down") {
        top += 8;
        this.ball.style.top = top + "px";
        if (
          top >=
          parseInt(parent.style.height) - parseInt(this.ball.style.height)
        ) {
          direction = "up";
        }
      } else {
        top -= 8;
        this.ball.style.top = top + "px";
        if (top <= 0) direction = "down";
      }
    }, 10);
  }
}

new Ball(50, 0, "blue");
new Ball(200, 100, "red");
new Ball(400, 400, "green");
new Ball(600, 300, "yellow");
new Ball(800, 500, "purple");
new Ball(1000, 200, "orange");
