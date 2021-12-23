var container = document.getElementById("container");

container.style.width = "600px";
container.style.height = "600px";
container.style.background = "#ececec";
container.style.position = "relative";
container.style.margin = "50px 200px";

function plot(x, y) {
  var point = document.createElement("div");
  container.appendChild(point);

  point.style.width = "12px";
  point.style.height = "12px";

  point.style.top = y + "px";
  point.style.left = x + "px";

  point.style.background = "blue";

  point.style.position = "absolute";
  point.style.borderRadius = "50%";

  point.addEventListener("click", (e) => {
    e.preventDefault();

    point.style.background = "red";
    point.style.width = "24px";
    point.style.height = "24px";
  });

  point.addEventListener("dblclick", (e) => {
    e.preventDefault();

    point.style.background = "blue";
    point.style.width = "12px";
    point.style.height = "12px";
  });

  point.addEventListener("mouseover", (e) => {
    e.preventDefault();

    point.style.background = "purple";
    point.style.width = "24px";
    point.style.height = "24px";
  });
}

var points = [
  { x: 10, y: 20 },
  { x: 40, y: 40 },
  { x: 60, y: 20 },
  { x: 100, y: 50 },
  { x: 150, y: 80 },
  { x: 180, y: 100 },
  { x: 200, y: 150 },
  { x: 300, y: 200 },
];

points.forEach((item) => {
  plot(item.x, item.y);
});
