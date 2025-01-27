"use strict";
const components = document.querySelectorAll(".component");
const inputs = document.querySelectorAll(".input");
const form1 = document.querySelectorAll("#form--1");
const heroSection = document.querySelector(".hero--section");
const section6 = document.querySelector(".section--6");
const nav = document.querySelector(".navigationbar");
const home = document.querySelector(".home");
const bookingBtn = document.querySelector(".btn--booking");
const allSections = document.querySelectorAll(".section");
const textX = document.querySelector(".text--revealX");
const textY = document.querySelectorAll(".text--revealY");
const overview = document.querySelector(".overview");


//////////////////////////////screen loading///////////////////////

document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = document.querySelector("#loading--screen");
  const mainContent = document.querySelector("#main--content");

  setTimeout(() => {
    loadingScreen.classList.add("fade-out");

    loadingScreen.addEventListener("transitionend", function () {
      loadingScreen.style.display = "none";
      mainContent.classList.remove("hidden");
    });
  }, 2000);
});


//////////////////////////////observer nav///////////////////////

setTimeout(() => {
  const navHeight = nav.getBoundingClientRect().height;
  const heroSectionHeight = heroSection.getBoundingClientRect().height
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${heroSectionHeight-navHeight}px`,
});
headerObserver.observe(heroSection);
}, 5000); 

//////////////////////////////formChange///////////////////////

const formChange = function () {
  components.forEach((component, i) => {
    component.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest(".component");
      const formNum = +e.target.dataset.num;

      inputs.forEach((form) => {
        form.classList.add("form--hidden");
        form.classList.add("form--active");
      });

      document.querySelectorAll(`#form--${formNum}`).forEach((form) => {
        form.classList.remove("form--hidden");
      });

      components.forEach((comp) => {
        comp.classList.remove("active");
      });

      btn.classList.add("active");
    });
  });
};
formChange();

//////////////////////////////observer section///////////////////////

const revealSetion = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) entry.target.classList.add("section--hidden");
    else entry.target.classList.remove("section--hidden");
  });
};

const sectionObserver = new IntersectionObserver(revealSetion, {
  root: null,
  threshold: 0.1,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//////////////////////////////observer text///////////////////////

const revealTextX = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) entry.target.classList.add("text--hidden--X");
    else entry.target.classList.remove("text--hidden--X");
  });
};

const textXObserver = new IntersectionObserver(revealTextX, {
  root: null,
  threshold: 0.15,
});

textXObserver.observe(textX);
textX.classList.add("text--hidden--X");

//////////////////////////////observer text///////////////////////

const revealTextY = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) entry.target.classList.add("text--hidden--Y");
    else entry.target.classList.remove("text--hidden--Y");
  });
};

const textYObserver = new IntersectionObserver(revealTextY, {
  root: null,
  threshold: 0.2,
});

textY.forEach((text) => {
  textYObserver.observe(text);
  text.classList.add("text--hidden--Y");
});

//////////////////////////////initial form///////////////////////

const init = function () {
  inputs.forEach((form) => {
    form.classList.add("form--hidden");
    form.classList.add("form--active");
  });
  form1.forEach((form) => {
    form.classList.remove("form--hidden");
    form.classList.add("form--active");
  });
};
init();

//////////////////////////////slider///////////////////////

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnRight = document.querySelector(".btn--right");
  const btnLeft = document.querySelector(".btn--left");
  const maxSlide = slides.length;
  let curSlide = 0;
  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);
};
slider();

//////////////////////////////scrollto///////////////////////

home.addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

bookingBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const navHeight = nav.getBoundingClientRect().height;
  const sectionTop = section6.offsetTop
  console.log(sectionTop)
  window.scrollTo({
    top: sectionTop-navHeight,
    behavior: "smooth",
  });
});