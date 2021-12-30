class Pipes {
  constructor() {
    this.pipesArea = document.getElementById("pipes");
    let pipes = document.createElement("div");
    pipes.classList.add("pipes");
    this.pipesArea.appendChild(pipes);

    let topPipe = document.createElement("div");
    topPipe.classList.add("top-pipe");
    pipes.appendChild(topPipe);

    let bottomPipe = document.createElement("div");
    bottomPipe.classList.add("bottom-pipe");
    pipes.appendChild(bottomPipe);

    this.pipes = pipes;
    this.topPipe = topPipe;
    this.bottomPipe = bottomPipe;
    this.pipes.style.display = "none";
    this.ready = false;
    this.callanother = false;
    this.point = false;
  }
  render() {
    let randomPipePosition = Math.floor(Math.random() * 200 - 200);
    this.ready = true;
    this.pipes.style.left = "500px";
    this.topPipe.style.transform = "rotate(180deg)";
    this.topPipe.style.top = randomPipePosition + "px";
    this.bottomPipe.style.top = parseInt(this.topPipe.style.top) + 420 + "px";
    this.bottomPipe.style.height =
      500 - parseInt(this.bottomPipe.style.top) + "px";
    this.pipes.style.display = "block";
  }

  move() {
    this.pipes.style.left = parseInt(this.pipes.style.left) - step + "px";
    if (parseInt(this.pipes.style.left) < -60) {
      this.pipes.remove();
      pipesCount.shift();
    }

    if (parseInt(this.pipes.style.left) < 300 && !this.callanother) {
      release = true;
      this.callanother = true;
    }

    if (parseInt(this.pipes.style.left) < 90 && !this.point) {
      score += 1;
      scoreElement.innerText = score;
      this.point = true;
      if (score > highScore) {
        localStorage.setItem("score", score);
      }
    }
  }
}
