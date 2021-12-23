var boxWidth = 650;
var ballWidth = 50;

var parent = document.getElementById("container");
parent.style.width = boxWidth + "px";
parent.style.height = boxWidth + "px";
parent.style.border = "1px solid black";
parent.style.position = "relative";
parent.style.margin = "50px 200px";

var child = document.createElement("div");

parent.appendChild(child);

child.style.background = "blue";
child.style.width = ballWidth + "px";
child.style.height = ballWidth + "px";
child.style.borderRadius = ballWidth / 2 + "px";
child.style.position = "absolute";
child.style.top = boxWidth / 2 + "px";
child.style.left = boxWidth / 2 + "px";

function bounce() {
  var top = 200;
  var direction = "down";

  setInterval(() => {
    if (direction === "down") {
      top += 8;
      child.style.top = top + "px";
      if (top >= boxWidth - ballWidth) direction = "up";
    } else {
      top -= 8;
      child.style.top = top + "px";
      if (top <= 0) direction = "down";
    }
  }, 10);
}

bounce();
