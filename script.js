"use strict";
const section6 = document.querySelector(".section--6");
const home = document.querySelector(".home");
const allSections = document.querySelectorAll(".section");
const textX = document.querySelector(".text--revealX");
const textY = document.querySelectorAll(".text--revealY");
const overview = document.querySelector(".overview");
const inputs = document.querySelectorAll(".input");
const formBtn = document.querySelectorAll(".btn--next");
const form1 = document.querySelectorAll(".form--1");
const form2 = document.querySelectorAll(".form--2");
const form3 = document.querySelectorAll(".form--3");
const form4 = document.querySelectorAll(".form--4");
const btnNext1 = document.querySelector(".btn--next--1");
const btnNext2 = document.querySelector(".btn--next--2");
const btnNext3 = document.querySelector(".btn--next--3");
const btnNext4 = document.querySelector(".btn--next--4");
const formConfirm = document.querySelector(".form--confirm");
const overlay = document.querySelector(".overlay");
//////////////////////////////screen loading///////////////////////

window.addEventListener("load", function () {
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
const sentinel = document.querySelector(".sentinel");
const heroSection = document.querySelector(".hero--section");
const nav = document.querySelector(".navigationbar");

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
});
headerObserver.observe(sentinel);

//////////////////////////////observer section///////////////////////

const revealSetion = function (entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) entry.target.classList.add("section--hidden");
    else entry.target.classList.remove("section--hidden");
  });
};

const sectionObserver = new IntersectionObserver(revealSetion, {
  root: null,
  threshold: 0.1,
  rootMargin: "100px",
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

const revealTextY = function (entries) {
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

//////////////////////////////slider///////////////////////

const slider = function () {
  const container = document.querySelector(".section--3");
  let slides = document.querySelectorAll(".slide");
  const btnRight = document.querySelector(".btn--right");
  const btnLeft = document.querySelector(".btn--left");

  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[3].cloneNode(true);
  firstClone.classList.add("clone");
  lastClone.classList.add("clone");
  container.insertBefore(firstClone, btnRight);
  container.insertBefore(lastClone, container.firstElementChild);

  slides = document.querySelectorAll(".slide");
  const maxSlide = slides.length;
  let curSlide = 1;

  slides.forEach((slide) => {
    slide.style.transition = "transform 0.5s ease";
  });

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  goToSlide(curSlide);

  const nextSlide = function () {
    curSlide++;
    goToSlide(curSlide);

    if (curSlide === maxSlide - 1) {
      slides[maxSlide - 1].addEventListener(
        "transitionend",
        function handler() {
          slides.forEach((slide) => (slide.style.transition = "none"));
          curSlide = 1;
          goToSlide(curSlide);
          console.log(container.offsetWidth);
          void container.offsetWidth;

          slides.forEach(
            (slide) => (slide.style.transition = "transform 0.5s ease")
          );
          slides[maxSlide - 1].removeEventListener("transitionend", handler);
        }
      );
    }
  };

  const prevSlide = function () {
    curSlide--;
    goToSlide(curSlide);
    if (curSlide === 0) {
      slides[1].addEventListener("transitionend", function handler() {
        slides.forEach((slide) => (slide.style.transition = "none"));
        curSlide = 4;
        goToSlide(curSlide);
        void container.offsetWidth;

        slides.forEach(
          (slide) => (slide.style.transition = "transform 0.5s ease")
        );
        slides[1].removeEventListener("transitionend", handler);
      });
    }
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

const bookingBtn = document.querySelector(".btn--booking");
bookingBtn.addEventListener("click", function (e) {
  e.preventDefault();

  let navHeight = nav.getBoundingClientRect().height;
  console.log(navHeight);
  const sectionTop = section6.offsetTop;
  // console.log(sectionTop - navHeight);

  if (nav.classList.contains("sticky")) {
    window.scrollTo({
      top: sectionTop - navHeight,
      behavior: "smooth",
    });
    console.log(sectionTop - navHeight);
  } else {
    navHeight += 81;
    window.scrollTo({
      top: sectionTop - navHeight,
      behavior: "smooth",
    });
    console.log(sectionTop - navHeight);
  }
  console.log(navHeight);
});

//////////////////////////////initial form///////////////////////

const init = function () {
  const btn = document.querySelector(".component--1");
  inputs.forEach((form) => {
    form.classList.add("form--hidden");
  });
  formBtn.forEach((btn) => btn.classList.add("form--hidden"));
  form1.forEach((form) => {
    form.classList.remove("form--hidden");
    form.classList.add("form--active");
  });
  btn.classList.add("active");
};
init();

//////////////////////////////initial nextBtn///////////////////////

formBtn.forEach((btn) => (btn.disabled = true));

//////////////////////////////form validation///////////////////////

const isValidChineseName = function (name) {
  return /^[\u4e00-\u9fa5]{2,4}$/.test(name);
};
const isValidEmail = function (email) {
  return /^[A-Za-z0-9]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(
    email
  );
};

inputs.forEach((input) => {
  input.addEventListener("input", function () {
    ///////////////////////////form1 validation////////////////////

    const name = document.querySelector(".input--1");
    const phone = document.querySelector(".input--2");
    const birthYear = document.querySelector(".input--4");
    const people = document.querySelector(".input--6");
    const mail = document.querySelector(".input--7");
    const formComplete1 = [0, 0, 0, 0, 0];

    if (!isValidChineseName(name.value)) {
      name.style.backgroundColor = "#bb000073";
      formComplete1[0] = 1;
    } else {
      formComplete1[0] = 0;
      name.style.backgroundColor = "transparent";
    }

    if (phone.value === "") {
      phone.style.backgroundColor = "#bb000073";
      formComplete1[1] = 1;
    } else if (isNaN(phone.value)) {
      formComplete1[1] = 1;
      phone.style.backgroundColor = "#bb000073";
    } else if (phone.value.length !== 10 || !phone.value.startsWith("09")) {
      formComplete1[1] = 1;
      phone.style.backgroundColor = "#bb000073";
    } else {
      formComplete1[1] = 0;
      phone.style.backgroundColor = "transparent";
    }

    let currentYear = new Date().getFullYear();
    if (birthYear.value === "") {
      birthYear.style.backgroundColor = "#bb000073";
      formComplete1[2] = 1;
    } else if (isNaN(birthYear.value)) {
      birthYear.style.backgroundColor = "#bb000073";
      formComplete1[2] = 1;
    } else if (birthYear.value < 1911 || birthYear.value > currentYear) {
      birthYear.style.backgroundColor = "#bb000073";
      formComplete1[2] = 1;
    } else {
      formComplete1[2] = 0;
      birthYear.style.backgroundColor = "transparent";
    }

    if (people.value === "") {
      people.style.backgroundColor = "#bb000073";
      formComplete1[3] = 1;
    } else if (people.value <= 0) {
      people.style.backgroundColor = "#bb000073";
      formComplete1[3] = 1;
    } else {
      formComplete1[3] = 0;
      people.style.backgroundColor = "transparent";
    }

    if (mail.value !== "" && !isValidEmail(mail.value)) {
      mail.style.backgroundColor = "#bb000073";
      formComplete1[4] = 1;
    } else if (mail.value === "") {
      mail.style.backgroundColor = "#bb000073";
      formComplete1[4] = 1;
    } else {
      formComplete1[4] = 0;
      mail.style.backgroundColor = "transparent";
    }

    if (formComplete1.every((key) => key === 0)) {
      btnNext1.disabled = false;
    } else {
      btnNext1.disabled = true;
    }

    ///////////////////////////form2 validation////////////////////

    const name2 = document.querySelector(".input--8");
    const phone2 = document.querySelector(".input--9");
    const plan = document.querySelector(".input--11");
    const people2 = document.querySelector(".input--12");
    const mail2 = document.querySelector(".input--13");
    const company = document.querySelector(".input--14");
    const formComplete2 = [0, 0, 0, 0, 0, 0];

    if (!isValidChineseName(name2.value)) {
      name2.style.backgroundColor = "#bb000073";
      formComplete2[0] = 1;
    } else {
      name2.style.backgroundColor = "transparent";
      formComplete2[0] = 0;
    }

    if (phone2.value === "") {
      phone2.style.backgroundColor = "#bb000073";
      formComplete2[1] = 1;
    } else if (isNaN(phone2.value)) {
      phone2.style.backgroundColor = "#bb000073";
      formComplete2[1] = 1;
    } else if (phone2.value.length !== 10 || !phone2.value.startsWith("09")) {
      phone2.style.backgroundColor = "#bb000073";
      formComplete2[1] = 1;
    } else {
      phone2.style.backgroundColor = "transparent";
      formComplete2[1] = 0;
    }

    if (plan.value === "") {
      plan.style.backgroundColor = "#bb000073";
      formComplete2[2] = 1;
    } else {
      plan.style.backgroundColor = "transparent";
      formComplete2[2] = 0;
    }

    if (people2.value === "") {
      people2.style.backgroundColor = "#bb000073";
      formComplete2[3] = 1;
    } else if (people2.value <= 0) {
      people2.style.backgroundColor = "#bb000073";
      formComplete2[3] = 1;
    } else {
      people2.style.backgroundColor = "transparent";
      formComplete2[3] = 0;
    }

    if (mail2.value !== "" && !isValidEmail(mail2.value)) {
      mail2.style.backgroundColor = "#bb000073";
      formComplete2[4] = 1;
    } else if (mail2.value === "") {
      mail2.style.backgroundColor = "#bb000073";
      formComplete2[4] = 1;
    } else {
      mail2.style.backgroundColor = "transparent";
      formComplete2[4] = 0;
    }

    if (company.value === "") {
      company.style.backgroundColor = "#bb000073";
      formComplete2[5] = 1;
    } else {
      company.style.backgroundColor = "transparent";
      formComplete2[5] = 0;
    }

    if (formComplete2.every((key) => key === 0)) {
      btnNext2.disabled = false;
    } else {
      btnNext2.disabled = true;
    }

    ///////////////////////////form3 validation////////////////////

    const name3 = document.querySelector(".input--15");
    const phone3 = document.querySelector(".input--16");
    const people3 = document.querySelector(".input--18");
    const mail3 = document.querySelector(".input--19");
    const formComplete3 = [0, 0, 0, 0];

    if (!isValidChineseName(name3.value)) {
      name3.style.backgroundColor = "#bb000073";
      formComplete3[0] = 1;
    } else {
      formComplete3[0] = 0;
      name3.style.backgroundColor = "transparent";
    }

    if (phone3.value === "") {
      phone3.style.backgroundColor = "#bb000073";
      formComplete3[1] = 1;
    } else if (isNaN(phone3.value)) {
      formComplete3[1] = 1;
      phone3.style.backgroundColor = "#bb000073";
    } else if (phone3.value.length !== 10 || !phone3.value.startsWith("09")) {
      formComplete3[1] = 1;
      phone3.style.backgroundColor = "#bb000073";
    } else {
      formComplete3[1] = 0;
      phone3.style.backgroundColor = "transparent";
    }

    if (people3.value === "") {
      people3.style.backgroundColor = "#bb000073";
      formComplete3[2] = 1;
    } else if (people3.value <= 0) {
      people3.style.backgroundColor = "#bb000073";
      formComplete3[2] = 1;
    } else {
      formComplete3[2] = 0;
      people3.style.backgroundColor = "transparent";
    }

    if (mail3.value !== "" && !isValidEmail(mail3.value)) {
      mail3.style.backgroundColor = "#bb000073";
      formComplete3[3] = 1;
    } else if (mail3.value === "") {
      mail3.style.backgroundColor = "#bb000073";
      formComplete3[3] = 1;
    } else {
      formComplete3[3] = 0;
      mail3.style.backgroundColor = "transparent";
    }

    if (formComplete3.every((key) => key === 0)) {
      btnNext3.disabled = false;
    } else {
      btnNext3.disabled = true;
    }

    ///////////////////////////form4 validation////////////////////

    const name4 = document.querySelector(".input--20");
    const phone4 = document.querySelector(".input--21");
    const people4 = document.querySelector(".input--23");
    const mail4 = document.querySelector(".input--24");
    const formComplete4 = [0, 0, 0, 0];

    if (!isValidChineseName(name4.value)) {
      name4.style.backgroundColor = "#bb000073";
      formComplete4[0] = 1;
    } else {
      formComplete4[0] = 0;
      name4.style.backgroundColor = "transparent";
    }

    if (phone4.value === "") {
      phone4.style.backgroundColor = "#bb000073";
      formComplete4[1] = 1;
    } else if (isNaN(phone4.value)) {
      formComplete4[1] = 1;
      phone4.style.backgroundColor = "#bb000073";
    } else if (phone4.value.length !== 10 || !phone4.value.startsWith("09")) {
      formComplete4[1] = 1;
      phone4.style.backgroundColor = "#bb000073";
    } else {
      formComplete4[1] = 0;
      phone4.style.backgroundColor = "transparent";
    }

    if (people4.value === "") {
      people4.style.backgroundColor = "#bb000073";
      formComplete4[2] = 1;
    } else if (people4.value <= 0) {
      people4.style.backgroundColor = "#bb000073";
      formComplete4[2] = 1;
    } else {
      formComplete4[2] = 0;
      people4.style.backgroundColor = "transparent";
    }

    if (mail4.value !== "" && !isValidEmail(mail4.value)) {
      mail4.style.backgroundColor = "#bb000073";
      formComplete4[3] = 1;
    } else if (mail4.value === "") {
      mail4.style.backgroundColor = "#bb000073";
      formComplete4[3] = 1;
    } else {
      formComplete4[3] = 0;
      mail4.style.backgroundColor = "transparent";
    }

    if (formComplete4.every((key) => key === 0)) {
      btnNext4.disabled = false;
    } else {
      btnNext4.disabled = true;
    }
  });
});

//////////////////////////////formChange///////////////////////

const components = document.querySelectorAll(".component");

components.forEach((component) => {
  component.addEventListener("click", function (e) {
    e.preventDefault();
    const btn = e.target.closest(".component");
    const formNum = +e.target.dataset.num;

    inputs.forEach((form) => {
      form.classList.add("form--hidden");
    });

    formBtn.forEach((btn) => btn.classList.add("form--hidden"));

    document.querySelectorAll(`.form--${formNum}`).forEach((form) => {
      form.classList.remove("form--hidden");

      inputs.forEach((input) => {
        input.style.backgroundColor = "transparent";
        if (!input.classList.contains("option")) {
          input.value = "";
        }
      });
    });

    formBtn.forEach((btn) => {
      btn.disabled = true;
    });

    components.forEach((comp) => {
      comp.classList.remove("active");
    });

    btn.classList.add("active");
  });
});

//////////////////////////////form submit///////////////////////

const formSubmit = function (e) {
  e.preventDefault();
  formConfirm.classList.remove("form--confirm--hidden");
  overlay.classList.remove("hidden");
  formBtn.forEach((btn) => {
    btn.disabled = true;
  });
  inputs.forEach((input) => {
    input.style.backgroundColor = "transparent";
    if (!input.classList.contains("option")) {
      input.value = "";
    }
  });
};

formBtn.forEach((btn) => btn.addEventListener("click", formSubmit));

//////////////////////////////form close///////////////////////

const btnGoBack = document.querySelector(".btn--goback");
btnGoBack.addEventListener("click", function () {
  formConfirm.classList.add("hidden");
  overlay.classList.add("hidden");
  formSubmit();
});
