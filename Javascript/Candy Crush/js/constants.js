// HTML elements constants

//start screen elements
const startContainer = document.getElementById("start-container");
const startScreen = document.getElementById("start-screen");
const startBackground = document.getElementById("start-background");
const playButton = document.getElementById("play");

// game screen elements
const gameContainer = document.getElementById("game-container");
const playMusicButton = document.getElementById("play-music");
const gameOverScreen = document.getElementById("game-over-screen");
const retryButton = document.getElementById("retry");
const levelCompleted = document.getElementById("level-completed-screen");
const nextButton = document.getElementById("next");

// game info elements
const moveBoard = document.getElementById("move-container");
const timeBoard = document.getElementById("time-container");
const scoreContainer = document.getElementById("score");
const movesContainer = document.getElementById("moves");
const targetContainer = document.getElementById("target");
const highScoreContainer = document.getElementById("high-score");
const timeLeftContainer = document.querySelector("#time-left span");
const levelHeader = document.querySelector("#level-header span");

// audio elements
const backgroundMusic = document.getElementById("background-music");
const gameOverMusic = document.getElementById("game-over-music");
const levelCompletedMusic = document.getElementById("level-completed-music");
const sweetMusic = document.getElementById("sweet-music");
const tastyMusic = document.getElementById("tasty-music");
const divineMusic = document.getElementById("divine-music");
const deliciousMusic = document.getElementById("delicious-music");
const dropMusic = document.getElementById("drop-music");
const swapMusic = document.getElementById("swap-music");

// Grid and Candy Constants
const CANDY_WIDTH = 45;
const CANDY_HEIGHT = 45;
const GRID_WIDTH = 60;
const GRID_HEIGHT = 60;
const CANDY_PADDING = 8;
const CANDY_SPEED = 30;

const CANDY_COLORS = ["red", "green", "blue", "yellow", "purple", "orange"];
const CANDYTYPES = {
  solid: {
    red: "images/red.png",
    green: "images/green.png",
    blue: "images/blue.png",
    yellow: "images/yellow.png",
    purple: "images/purple.png",
    orange: "images/orange.png",
  },
  horizontalStriped: {
    red: "../images/red-striped-horizontal.png",
    green: "../images/green-striped-horizontal.png",
    blue: "../images/blue-striped-horizontal.png",
    yellow: "../images/yellow-striped-horizontal.png",
    purple: "../images/purple-striped-horizontal.png",
    orange: "../images/orange-striped-horizontal.png",
  },
  verticalStriped: {
    red: "../images/red-striped-vertical.png",
    green: "../images/green-striped-vertical.png",
    blue: "../images/blue-striped-vertical.png",
    yellow: "../images/yellow-striped-vertical.png",
    purple: "../images/purple-striped-vertical.png",
    orange: "../images/orange-striped-vertical.png",
  },
  wrapped: {
    red: "../images/red-wrapped.png",
    green: "../images/green-wrapped.png",
    blue: "../images/blue-wrapped.png",
    yellow: "../images/yellow-wrapped.png",
    purple: "../images/purple-wrapped.png",
    orange: "../images/orange-wrapped.png",
  },
  color_bomb: {
    bomb: "../images/bomb.png",
  },
};

const DIRECTIONS = ["up", "down", "left", "right"];
const MOVES = ["vertical", "horizontal"];
