const carouselContainer = document.querySelector(".carousel-container");
const carouselImageWrapper = document.querySelector(".carousel-images-wrapper");
const images = document.getElementsByTagName("img");
const numberOfImages = carouselImageWrapper.children.length;

const IMAGE_WIDTH = 600;
const IMAGE_HEIGHT = 400;
const step = 30;
let dx = 0;
let imageIndex = 0;

carouselContainer.style.width = `${IMAGE_WIDTH}px`;
carouselContainer.style.height = `${IMAGE_HEIGHT}px`;
carouselContainer.style.position = `relative`;
carouselContainer.style.margin = "auto";
carouselContainer.style.overflow = `hidden`;
carouselImageWrapper.style.position = "relative";

for (let i = 0; i < numberOfImages; i++) {
  images[i].style.position = "absolute";
  images[i].style.width = `${IMAGE_WIDTH}px`;
  images[i].style.height = `${IMAGE_HEIGHT}px`;
  images[i].style.top = "0px";
  images[i].style.left = `${i * IMAGE_WIDTH}px`;
  images[i].style.border = "1px solid black";
}

const indicatorDots = document.createElement("div");
carouselContainer.appendChild(indicatorDots);
indicatorDots.className = "indicator-dots-wrapper";
indicatorDots.style.position = "absolute";

for (let i = 0; i < numberOfImages; i++) {
  const indicatorDot = document.createElement("div");
  indicatorDots.appendChild(indicatorDot);

  indicatorDot.className = "indicator-dot";
  indicatorDot.style.cursor = "pointer";
  indicatorDot.style.width = "20px";
  indicatorDot.style.height = "20px";
  indicatorDot.style.bottom = "5px";
  indicatorDot.style.borderRadius = "50%";
  indicatorDot.style.backgroundColor = "black";
  indicatorDot.style.margin = "5px";
  indicatorDot.style.cursor = "pointer";
  indicatorDot.style.display = "inline-block";

  indicatorDots.style.top = `${
    IMAGE_HEIGHT - parseInt(indicatorDot.style.width) * 2
  }px`;
  indicatorDots.style.left = `${
    IMAGE_WIDTH / 2 -
    numberOfImages *
      (parseInt(indicatorDot.style.width) - parseInt(indicatorDot.style.margin))
  }px`;

  indicatorDot.addEventListener("click", () => {
    var timer = setInterval(() => {
      if (imageIndex === i) {
        clearInterval(timer);
      } else if (imageIndex > i) {
        dx -= step;
        carouselImageWrapper.style.left = `-${dx}px`;

        if (dx <= i * IMAGE_WIDTH) {
          clearInterval(timer);
          imageIndex = i;
          setActiveIndicatorDot();
        }
      } else {
        dx += step;
        carouselImageWrapper.style.left = `-${dx}px`;
        if (dx >= i * IMAGE_WIDTH) {
          clearInterval(timer);
          imageIndex = i;
          setActiveIndicatorDot();
        }
      }
    }, 17);
  });
}

function setActiveIndicatorDot() {
  for (let indicatorDot of indicatorDots.children) {
    indicatorDot.style.backgroundColor = "black";
  }
  indicatorDots.children[imageIndex].style.backgroundColor = "white";
}

setActiveIndicatorDot();

let leftArrow = document.createElement("div");
carouselContainer.appendChild(leftArrow);
leftArrow.id = "left-arrow";
leftArrow.className = "arrow";
leftArrow.innerHTML = "&#10094;";
leftArrow.style.position = "absolute";
leftArrow.style.top = "50%";
leftArrow.style.left = "0px";

let rightArrow = document.createElement("div");
carouselContainer.appendChild(rightArrow);
rightArrow.id = "right-arrow";
rightArrow.className = "arrow";
rightArrow.innerHTML = "&#10095;";
rightArrow.style.top = "50%";
rightArrow.style.right = "0px";

let arrows = document.querySelectorAll(".arrow");
arrows.forEach((arrow) => {
  arrow.style.position = "absolute";
  arrow.style.transform = "translateY(-50%)";
  arrow.style.cursor = "pointer";
  arrow.style.fontSize = "50px";
  arrow.style.color = "white";
  arrow.style.zIndex = "1";
  arrow.style.backgroundColor = "black";
  arrow.style.opacity = "0.8";
  arrow.style.padding = "10px";
});

leftArrow.addEventListener("click", () => {
  var prevTimer;

  imageIndex--;
  if (imageIndex < 0) {
    imageIndex = numberOfImages - 1;
    prevTimer = setInterval(() => {
      dx += step;
      carouselImageWrapper.style.left = `${dx}px`;

      if (dx >= imageIndex * IMAGE_WIDTH) {
        clearInterval(prevTimer);
        setActiveIndicatorDot();
      }
    }, 1);
  } else {
    prevTimer = setInterval(() => {
      carouselImageWrapper.style.left = `-${dx}px`;
      dx -= step;
      if (dx < imageIndex * IMAGE_WIDTH) {
        clearInterval(prevTimer);
        setActiveIndicatorDot();
      }
    }, 15);
  }
});

rightArrow.addEventListener("click", () => {
  var nextTimer;
  imageIndex++;
  if (imageIndex === numberOfImages) {
    imageIndex = 0;

    nextTimer = setInterval(() => {
      dx -= step;
      carouselImageWrapper.style.left = `-${dx}px`;

      if (dx < imageIndex * IMAGE_WIDTH) {
        clearInterval(nextTimer);
        setActiveIndicatorDot();
      }
    }, 1);
  } else {
    nextTimer = setInterval(() => {
      carouselImageWrapper.style.left = `-${dx}px`;
      dx += step;

      if (dx > imageIndex * IMAGE_WIDTH) {
        clearInterval(nextTimer);
        setActiveIndicatorDot();
      }
    }, 15);
  }
});

carouselContainer.addEventListener("mouseover", () => {
  document.querySelectorAll(".arrow").forEach((arrow) => {
    arrow.style.display = "block";
  });
});

carouselContainer.addEventListener("mouseout", () => {
  document.querySelectorAll(".arrow").forEach((arrow) => {
    arrow.style.display = "none";
  });
});
