"use strict";

class Carousel {
  constructor(id) {
    this.id = id;
    this.position = 0;
    this.trackMeter = 0;
    this.infinityLoop = false;
  }
  init() {
    this.cacheDom();
    this.bindEvent();
    this.render();
  }
  cacheDom() {
    this.arr = document.querySelectorAll(".carousel__slide");
    this.container = document.querySelector(`#${this.id} > div`);
    this.block = this.container.parentElement;
    this.track = this.container.firstElementChild;
    this.slide = this.track.firstElementChild;
  }
  bindEvent() {
    // window.addEventListener("resize", this.render.bind(this));
    this.block.addEventListener("click", this.moveSlide.bind(this));
  }
  render(val) {

    if (val === undefined || val instanceof Object) {

      if (this.infinityLoop === true) {
        this.track.style.width = `${this.calcTrack() * 2}px`;

        // cloning array of slides
        this.arr.forEach(item => {
          const clone = item.cloneNode(true);
          this.track.appendChild(clone);
        });

        this.updatedList = document.querySelectorAll(".carousel__slide");
        this.updatedList[0].classList.add("current-slide");
        this.updatedList[0].setAttribute("aria-hidden", false);

        this.updatedList.forEach((item, index) => {
          item.setAttribute("data-index", `${index + 1}`);
        });

      } else {
        this.track.style.width = `${this.calcTrack()}px`;
        this.slide.classList.add("current-slide");
        this.slide.setAttribute("aria-hidden", false);

        this.arr.forEach((item, index) => {
          item.setAttribute("data-index", `${index + 1}`);
        });
      }


    } else {
      // shifting slides
      this.track.style.transform = `translateX(${val}px)`;
    }

    // restore container height
    setInterval(() => {
      this.container.style.height = `${this.track.getBoundingClientRect().height}px`;
    }, 10);
  }
  calcStep() {
    const slideMargin = parseFloat(window.getComputedStyle(this.slide).marginRight);
    const containerWidth = this.container.getBoundingClientRect().width;
    const step = containerWidth + slideMargin;
    return step;
  }
  calcTrack() {
    const trackWidth = this.calcStep() * this.arr.length;
    return trackWidth;
  }
  calcIndex(i) {
    if (i == this.arr.length) {}
  }
  moveSlide(e) {

    if (e.target.classList.contains("carousel__btn")) {
      const currTarget = document.querySelector("li.current-slide");

      if (this.infinityLoop === false) {

        // left btn
        if (e.target.classList.contains("left")) {

          if (currTarget.getAttribute("data-index") != 1) {
            this.hideActive();

            currTarget.previousElementSibling.classList.add("current-slide");
            currTarget.previousElementSibling.setAttribute("aria-hidden", false);
            this.position += this.calcStep();
          }
        }

        // right btn
        if (e.target.classList.contains("right")) {

          if (currTarget.getAttribute("data-index") != this.arr.length) {
            this.hideActive();

            currTarget.nextElementSibling.classList.add("current-slide");
            currTarget.nextElementSibling.setAttribute("aria-hidden", false);
            this.position -= this.calcStep();
          }
        }

        this.render(this.position);

      } else {

        this.updatedList.forEach(item => {
          item.classList.remove("current-slide");
          item.setAttribute("aria-hidden", true);
        });

        // left btn
        if (e.target.classList.contains("left")) {

          if (currTarget.getAttribute("data-index") == 1) {
            this.trackMeter -= this.calcTrack();
            this.track.style.left = `${this.trackMeter}px`;
            this.updatedList[this.arr.length - 1].classList.add("current-slide");
            this.updatedList[this.arr.length - 1].setAttribute("aria-hidden", false);

          } else {
            currTarget.previousElementSibling.classList.add("current-slide");
            currTarget.previousElementSibling.setAttribute("aria-hidden", false);
          }

          this.position += this.calcStep();
        }

        // right btn
        if (e.target.classList.contains("right")) {

          if (currTarget.getAttribute("data-index") == this.updatedList.length) {
            this.trackMeter += this.calcTrack();
            this.track.style.left = `${this.trackMeter}px`;
            this.updatedList[this.updatedList.length - this.arr.length].classList.add("current-slide");
            this.updatedList[this.updatedList.length - this.arr.length].setAttribute("aria-hidden", false);

          } else {
            currTarget.nextElementSibling.classList.add("current-slide");
            currTarget.nextElementSibling.setAttribute("aria-hidden", false);
          }

          this.position -= this.calcStep();
        }

        this.render(this.position);
      }
    }
  }
  hideActive() {
    this.arr.forEach(item => {
      item.classList.remove("current-slide");
      item.setAttribute("aria-hidden", true);
    });
  }
}


// function carouselInit() {
const myCarousel = new Carousel("my-slider");
myCarousel.init();
myCarousel
// return { in: myCarousel.init
// }
// }
// const slider = carouselInit();