// HTML elements constants
const startScreen = document.getElementById("start-screen");
const startBackground = document.getElementById("start-background");
const playButton = document.getElementById("play");
const gameContainer = document.getElementById("game-container");
const backgroundMusic = document.getElementById("background-music");
const playMusicButton = document.getElementById("play-music");

// Grid and Candy Constants
const CANDY_WIDTH = 40;
const CANDY_HEIGHT = 40;
const GRID_WIDTH = 50;
const GRID_HEIGHT = 50;
const CANDY_PADDING = 5;

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
  bomb: "../images/bomb.png",
};
