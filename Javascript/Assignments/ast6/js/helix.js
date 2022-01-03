const OFFSET = 50;

class Helix {
  constructor(container, rows, columns, radius) {
    this.container = document.getElementById(container);
    this.container.style.textAlign = "center";

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.style.padding = "10px";
    this.canvas.style.backgroundColor = "#043a4a";
    this.canvas.width = rows * radius * 2;
    this.canvas.height = 2 * OFFSET + columns * 2 * radius;

    this.container.appendChild(this.canvas);

    this.rows = rows;
    this.columns = columns;
    this.radius = radius;
    this.angle = 0;
    this.max_angle = 360;
    this.timer = 5;
    this.angleOffset = this.max_angle / this.rows;
    this.colors = [
      "#FF4500",
      "#FF4500",
      "#FF4500",
      "#FF6346",
      "#FF6346",
      "#FF6346",
      "#FF7F50",
      "#FF7F50",
      "#FF7F50",
    ];
  }

  draw() {
    this.ctx.fillStyle = "#043a4a";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        let currentAngleOffset = i * this.angleOffset;
        let xCenter = i * this.radius * 2 + this.radius;
        let yCenterOffset = OFFSET + this.radius + 2 * this.radius * j;

        // first helix
        this.ctx.beginPath();
        this.ctx.arc(
          xCenter,
          yCenterOffset +
            OFFSET * Math.sin(toRadian(180 + this.angle + currentAngleOffset)),
          (this.radius / 2) *
            (1 + Math.cos(toRadian(180 + this.angle + currentAngleOffset))),
          0,
          this.max_angle
        );
        this.ctx.fillStyle = this.colors[j % this.colors.length];
        this.ctx.fill();

        // second helix
        this.ctx.beginPath();
        this.ctx.arc(
          xCenter,
          yCenterOffset +
            OFFSET * Math.sin(toRadian(this.angle + currentAngleOffset)),
          (this.radius / 2) *
            (1 + Math.cos(toRadian(this.angle + currentAngleOffset))),
          0,
          this.max_angle
        );
        this.ctx.fillStyle = this.colors[j % this.colors.length];
        this.ctx.fill();
      }
    }

    this.angle = (this.angle + 1) % this.max_angle;
  }

  animate() {
    setInterval(this.draw.bind(this), this.timer);
  }
}

let helix = new Helix("helix-container", 20, 15, 10);

helix.animate();
