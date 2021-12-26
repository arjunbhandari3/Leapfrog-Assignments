const IMAGE_WIDTH = 600;
const IMAGE_HEIGHT = 400;

class ImageCarousel {
  constructor(carouselContainer, transitionTime, holdTime) {
    this.carouselContainer = carouselContainer;
    this.transitionTime = transitionTime;
    this.holdTime = holdTime;

    this.carouselImageWrapper = this.carouselContainer.children;
    this.images = this.carouselImageWrapper[0].children;
    this.numberOfImages = this.images.length;

    this.carouselContainer.style.width = `${IMAGE_WIDTH}px`;
    this.carouselContainer.style.height = `${IMAGE_HEIGHT}px`;
    this.carouselContainer.style.position = `relative`;
    this.carouselContainer.style.margin = "auto";
    this.carouselContainer.style.overflow = `hidden`;
    this.carouselContainer.style.maxWidth = "100%";
    this.carouselImageWrapper[0].style.position = "relative";

    for (let i = 0; i < this.numberOfImages; i++) {
      this.images[i].style.position = "absolute";
      this.images[i].style.width = `${IMAGE_WIDTH}px`;
      this.images[i].style.height = `${IMAGE_HEIGHT}px`;
      this.images[i].style.top = "0px";
      this.images[i].style.left = `${i * IMAGE_WIDTH}px`;
      this.images[i].style.border = "1px solid black";
    }

    this.dx = 0;
    this.imageIndex = 0;

    this.indicatorDotWidth = 20;
    this.indicatorDotMargin = 5;

    this.intervalTime = 20;
    this.step = IMAGE_WIDTH / (this.transitionTime / this.intervalTime);

    this.indicatorDots = document.createElement("div");
    this.indicatorDots.setAttribute("class", "indicator-dots-wrapper");
    this.carouselContainer.appendChild(this.indicatorDots);
    this.indicatorDots.style.position = "absolute";
    this.indicatorDots.style.left = `${
      IMAGE_WIDTH / 2 -
      this.numberOfImages * (this.indicatorDotWidth - this.indicatorDotMargin)
    }px`;
    this.indicatorDots.style.bottom = "5%";

    for (let i = 0; i < this.numberOfImages; i++) {
      this.indicatorDots[i] = document.createElement("div");
      this.indicatorDots[i].className = "indicator-dot";
      this.indicatorDots[i].style.cursor = "pointer";
      this.indicatorDots[i].style.width = "20px";
      this.indicatorDots[i].style.height = "20px";
      this.indicatorDots[i].style.bottom = "5px";
      this.indicatorDots[i].style.borderRadius = "50%";
      this.indicatorDots[i].style.backgroundColor = "black";
      this.indicatorDots[i].style.margin = "5px";
      this.indicatorDots[i].style.display = "inline-block";
      this.indicatorDots.appendChild(this.indicatorDots[i]);

      this.indicatorDots[i].addEventListener("click", () => {
        clearInterval(this.slideInterval);

        if (this.imageIndex === i) {
          clearInterval(this.interval);
          this.slideShow();
        } else if (this.imageIndex > i) {
          this.interval = setInterval(() => {
            this.dx -= this.step;
            this.carouselImageWrapper[0].style.left = `-${this.dx}px`;

            if (this.dx <= i * IMAGE_WIDTH) {
              clearInterval(this.interval);
              this.imageIndex = i;
              this.setActiveIndicatorDot();
              this.slideShow();
            }
          }, this.intervalTime / (this.imageIndex - i));
        } else {
          this.interval = setInterval(() => {
            this.dx += this.step;
            this.carouselImageWrapper[0].style.left = `-${this.dx}px`;
            if (this.dx >= i * IMAGE_WIDTH) {
              clearInterval(this.interval);
              this.imageIndex = i;
              this.setActiveIndicatorDot();
              this.slideShow();
            }
          }, this.intervalTime / (i - this.imageIndex));
        }
      });
    }

    this.setActiveIndicatorDot();

    this.leftArrow = document.createElement("div");
    this.carouselContainer.appendChild(this.leftArrow);
    this.leftArrow.id = "left-arrow";
    this.leftArrow.className = "arrow";
    this.leftArrow.innerHTML = "&#10094;";
    this.leftArrow.style.position = "absolute";
    this.leftArrow.style.top = "50%";
    this.leftArrow.style.left = "0px";

    this.rightArrow = document.createElement("div");
    this.carouselContainer.appendChild(this.rightArrow);
    this.rightArrow.id = "right-arrow";
    this.rightArrow.className = "arrow";
    this.rightArrow.innerHTML = "&#10095;";
    this.rightArrow.style.top = "50%";
    this.rightArrow.style.right = "0px";

    this.arrows = document.querySelectorAll(".arrow");
    this.arrows.forEach((arrow) => {
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

    this.rightArrow.addEventListener("click", this.showNext.bind(this));
    this.leftArrow.addEventListener("click", this.showPrev.bind(this));
    this.slideShow();

    this.showResponsive();
    window.onresize = this.showResponsive.bind(this);
  }

  showResponsive() {
    const carouselContainers =
      document.getElementsByClassName("carousel-container");
    for (let carouselContainer of carouselContainers) {
      carouselContainer.style.height = `${this.images[0].offsetHeight}px`;
    }

    const indicatorDots = document.getElementsByClassName(
      "indicator-dots-wrapper"
    );
    for (let indicatorDot of indicatorDots) {
      indicatorDot.style.left = `${
        this.images[0].offsetWidth / 2 -
        this.numberOfImages * (this.indicatorDotWidth - this.indicatorDotMargin)
      }px`;
    }
  }

  setActiveIndicatorDot() {
    for (let indicatorDot of this.indicatorDots.children) {
      indicatorDot.style.backgroundColor = "black";
    }
    this.indicatorDots.children[this.imageIndex].style.backgroundColor =
      "white";
  }

  showNext() {
    this.imageIndex++;

    if (this.imageIndex === this.numberOfImages) {
      clearInterval(this.slideInterval);
      this.imageIndex = 0;
      this.interval = setInterval(() => {
        this.dx -= this.step;
        this.carouselImageWrapper[0].style.left = `-${this.dx}px`;
        if (this.dx < this.imageIndex * IMAGE_WIDTH) {
          clearInterval(this.interval);
          this.setActiveIndicatorDot();
          this.slideShow();
        }
      }, this.intervalTime / (this.numberOfImages - 1));
    } else {
      clearInterval(this.slideInterval);
      this.interval = setInterval(() => {
        this.carouselImageWrapper[0].style.left = `-${this.dx}px`;
        this.dx += this.step;

        if (this.dx > this.imageIndex * IMAGE_WIDTH) {
          clearInterval(this.interval);
          this.setActiveIndicatorDot();
          this.slideShow();
        }
      }, this.intervalTime);
    }
  }

  showPrev() {
    this.imageIndex--;
    if (this.imageIndex === -1) {
      this.imageIndex = this.numberOfImages - 1;
      this.interval = setInterval(() => {
        this.dx += this.step;
        this.carouselImageWrapper[0].style.left = `-${this.dx}px`;

        if (this.dx >= this.imageIndex * IMAGE_WIDTH) {
          clearInterval(this.interval);
          this.setActiveIndicatorDot();
        }
      }, this.intervalTime / (this.numberOfImages - 1));
    } else {
      this.interval = setInterval(() => {
        this.carouselImageWrapper[0].style.left = `-${this.dx}px`;
        this.dx -= this.step;

        if (this.dx < this.imageIndex * IMAGE_WIDTH) {
          clearInterval(this.interval);
          this.setActiveIndicatorDot();
        }
      }, this.intervalTime);
    }
  }
  slideShow() {
    this.slideInterval = setInterval(() => {
      this.showNext();
    }, this.holdTime);
  }
}

const carouselContainers =
  document.getElementsByClassName("carousel-container");

setTimeout(() => {
  new ImageCarousel(carouselContainers[0], 1000, 1000);
  new ImageCarousel(carouselContainers[1], 500, 2000);
}, 1200);
