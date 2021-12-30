class Game {
  constructor() {
    this.container = document.getElementById("container");
    this.gameScreen = document.getElementById("game");
    this.getReady = document.getElementById("get-ready");
    this.final = document.getElementById("final");
    this.medal = document.getElementById("medal");
    this.scorePointD = document.getElementById("score-point");
    this.highScoreD = document.getElementById("high-score");
    this.playButton = document.getElementById("play");

    this.final.style.display = "none";
    this.gameScreen.style.backgroundPositionY = "500px";
    this.gameScreen.style.backgroundPositionX = "0px";
    this.getReady.style.background = "url('../images/message.png') no-repeat";
  }

  initialize() {
    document.addEventListener("click", handleEvent);
    document.addEventListener("keyup", (evt) =>
      evt.keyCode === 32 ? handleEvent(evt) : ""
    );

    function handleEvent(e) {
      if (e || e.keyCode === 32) {
        switch (playingState) {
          case "menu":
            release = true;
            playingState = "game";
            break;
          case "game":
            bird.fall(-0.05);
            break;
        }
      }
    }
    this.playButton.addEventListener("click", () => {
      if (playingState == "menu") {
        bird.fall(-0.05);
        playingState = "game";
        release = true;
      } else if (playingState == "gameover") {
        bird.bird.style.display = "block";
        score = 0;
        scoreElement.innerText = "";
        playingState = "menu";
      }
    });
  }

  bgAnimate(changebg) {
    bird.fall(0.1);
    this.getReady.style.display = "none";
    parseInt(this.gameScreen.style.backgroundPositionX) >= 1000
      ? (this.gameScreen.style.backgroundPositionX = "0px")
      : (this.gameScreen.style.backgroundPositionX =
          parseInt(this.gameScreen.style.backgroundPositionX) + 3 + "px");
  }

  collision(bird, pipes) {
    var birdprop = {
      x: 70,
      y: parseInt(bird.bird.style.top),
      width: 40,
      height: 40,
    };
    var topprop = {
      x: parseInt(pipes.pipes.style.left),
      y: parseInt(pipes.topPipe.style.top),
      width: 52,
      height: 300,
    };
    var bottomprop = {
      x: parseInt(pipes.pipes.style.left),
      y: parseInt(pipes.bottomPipe.style.top),
      width: 52,
      height: 300,
    };

    if (
      (birdprop.x < topprop.x + topprop.width &&
        birdprop.x + birdprop.width > topprop.x &&
        birdprop.y < topprop.y + topprop.height &&
        birdprop.y + birdprop.height > topprop.y) ||
      (birdprop.x < bottomprop.x + bottomprop.width &&
        birdprop.x + birdprop.width > bottomprop.x &&
        birdprop.y < bottomprop.y + bottomprop.height &&
        birdprop.y + birdprop.height > bottomprop.y)
    ) {
      this.gameOver();
    }
  }

  show() {
    if (playingState == "menu") {
      this.getReady.style.display = "block";
      this.getReady.style.background = "url('images/message.png') no-repeat";
      this.final.style.display = "none";
    }

    if (playingState == "gameover") {
      if (score > 49) {
        this.medal.style.background = "url('images/gold.png') no-repeat";
        this.medal.style.backgroundSize = "contain";
      } else if (score > 24) {
        this.medal.style.background = "url('images/silver.png') no-repeat";
        this.medal.style.backgroundSize = "contain";
      }
      bird.bird.style.top = "250px";
      this.scorePointD.innerText = score;
      this.highScoreD.innerText = highScore;
      this.getReady.style.display = "block";
      this.final.style.display = "block";
      this.getReady.style.background = "none";
      pipesCount.forEach((pipe) => {
        pipe.pipes.remove();
      });
      pipesCount = [];
    }
  }

  gameOver() {
    bird.bird.className = "normal";
    bird.bird.style.display = "none";
    this.playButton.style.display = "block";
    playingState = "gameover";
  }
}

let score = 0;
let highScore = localStorage.getItem("score") || 0;
let step = 2;
let start;
let playingState = "menu";
let pipesCount = [];
let release = true;
let maxPipe = 3;
let backgroundImages = [
  "url('../images/background-day.png')",
  "url('../images/background-night.png')",
];
let scoreElement = document.getElementById("score");
let gameContainer = new Game();
gameContainer.initialize();
let bird = new Bird();

let game = () => {
  window.requestAnimationFrame(game);

  if (playingState == "game") {
    let howMany = document.getElementById("pipes").childElementCount;

    if (howMany < maxPipe) {
      for (var i = 0; i < maxPipe - pipesCount.length; i++) {
        pipesCount.push(new Pipes());
      }
    }

    pipesCount.forEach((pipe) => {
      if (release) {
        if (!pipe.ready) {
          release = false;
          pipe.render();
        }
      }
      if (pipe.ready) {
        pipe.move();
        gameContainer.collision(bird, pipe);
      }
    });
    gameContainer.bgAnimate("toggle");
  } else if (playingState == "menu" || playingState == "gameover") {
    gameContainer.show();
  }
};

game();
