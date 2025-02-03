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
const heroSection = document.querySelector(".hero--section");
const nav = document.querySelector(".navigationbar");
setTimeout(() => {
  const navHeight = nav.getBoundingClientRect().height;
  const heroSectionHeight = heroSection.getBoundingClientRect().height;
  const stickyNav = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
  };
  const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${heroSectionHeight - navHeight}px`,
  });
  headerObserver.observe(heroSection);
}, 5000);

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

const bookingBtn = document.querySelector(".btn--booking");
bookingBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const navHeight = nav.getBoundingClientRect().height;
  const sectionTop = section6.offsetTop;
  window.scrollTo({
    top: sectionTop - navHeight,
    behavior: "smooth",
  });
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

const containsNumber = function (name) {
  for (let i = 0; i < name.length; i++) {
    if (!isNaN(name[i]) && name[i] !== " ") {
      return true;
    }
  }
  return false;
};

inputs.forEach((input) => {
  input.addEventListener("input", function () {
    const name = document.querySelector(".input--1");
    const phone = document.querySelector(".input--2");
    const birthYear = document.querySelector(".input--4");
    const people = document.querySelector(".input--6");
    const mail = document.querySelector(".input--7");
    const formComplete = [0, 0, 0, 0, 0];

    if (name.value === " " || containsNumber(name.value)) {
      name.style.backgroundColor = "#bb000073";
      formComplete[0] = 1;
    } else {
      formComplete[0] = 0;
      name.style.backgroundColor = "transparent";
    }

    if (phone.value === "") {
      // alert("手機號碼不可為空");
      phone.style.backgroundColor = "#bb000073";
      formComplete[1] = 1;
    } else if (isNaN(phone.value)) {
      // alert("請輸入正確手機格式");
      formComplete[1] = 1;
      phone.style.backgroundColor = "#bb000073";
    } else if (phone.value.length !== 10 || !phone.value.startsWith("09")) {
      // alert("請輸入正確手機格式");
      formComplete[1] = 1;
      phone.style.backgroundColor = "#bb000073";
    } else {
      formComplete[1] = 0;
      phone.style.backgroundColor = "transparent";
    }

    let currentYear = new Date().getFullYear();
    if (birthYear.value === "") {
      // alert("出生年份不可為空");
      birthYear.style.backgroundColor = "#bb000073";
      formComplete[2] = 1;
    } else if (isNaN(birthYear.value)) {
      // alert("請輸入正確出生年份格式");
      birthYear.style.backgroundColor = "#bb000073";
      formComplete[2] = 1;
    } else if (birthYear.value < 1911 || birthYear.value > currentYear) {
      // alert("請輸入正確出生年份格式");
      birthYear.style.backgroundColor = "#bb000073";
      formComplete[2] = 1;
    } else {
      formComplete[2] = 0;
      birthYear.style.backgroundColor = "transparent";
    }

    if (people.value === "") {
      // alert("人數不可為空");
      people.style.backgroundColor = "#bb000073";
      formComplete[3] = 1;
    } else if (people.value <= 0) {
      // alert("人數至少為1人");
      people.style.backgroundColor = "#bb000073";
      formComplete[3] = 1;
    } else {
      formComplete[3] = 0;
      people.style.backgroundColor = "transparent";
    }

    if (
      mail.value !== "" &&
      (!mail.value.includes("@") || !mail.value.endsWith(".com"))
    ) {
      // alert("請輸入正確電子郵件格式");
      mail.style.backgroundColor = "#bb000073";
      formComplete[4] = 1;
    } else if (mail.value === "") {
      // alert("電子郵件不可為空");
      mail.style.backgroundColor = "#bb000073";
      formComplete[4] = 1;
    } else {
      formComplete[4] = 0;
      mail.style.backgroundColor = "transparent";
    }

    if (formComplete.every((key) => key === 0)) {
      console.log("form1 驗證通過");
      btnNext1.disabled = false;
    } else {
      console.log("驗證失敗");
      btnNext1.disabled = true;
    }
  });
});

// const handleFormSubmit2 = function (e) {
//   e.preventDefault();

//   if ([...form2].some((form) => form.classList.contains("form--hidden")))
//     return;

//   const name = document.querySelector(".input--8");
//   const phone = document.querySelector(".input--9");
//   const plan = document.querySelector(".input--11");
//   const people = document.querySelector(".input--12");
//   const mail = document.querySelector(".input--13");
//   const formComplete = [0, 0, 0, 0, 0];

//   if (name.value === "" || containsNumber(name.value)) {
//     alert("姓名不可為空或者包含數字");
//     formComplete[0] = 1;
//   } else {
//     formComplete[0] = 0;
//   }

//   if (phone.value === "") {
//     alert("手機號碼不可為空");
//     formComplete[1] = 1;
//   } else if (isNaN(phone.value)) {
//     alert("請輸入正確手機格式");
//     formComplete[1] = 1;
//   } else if (phone.value.length !== 10 || !phone.value.startsWith("09")) {
//     alert("請輸入正確手機格式");
//     formComplete[1] = 1;
//   } else {
//     formComplete[1] = 0;
//   }

//   if (plan.value === "") {
//     alert("公司名稱不可為空");
//     formComplete[2] = 1;
//   } else {
//     formComplete[2] = 0;
//   }

//   if (people.value === "") {
//     alert("人數不可為空");
//     formComplete[3] = 1;
//   } else if (people.value <= 0) {
//     alert("人數至少為1人");
//     formComplete[3] = 1;
//   } else {
//     formComplete[3] = 0;
//   }

//   if (
//     mail.value !== "" &&
//     (!mail.value.includes("@") || !mail.value.includes("."))
//   ) {
//     alert("請輸入正確電子郵件格式");
//     formComplete[4] = 1;
//   } else if (mail.value === "") {
//     alert("電子郵件不可為空");
//     formComplete[4] = 1;
//   } else {
//     formComplete[4] = 0;
//   }

//   if (formComplete.every((key) => key === 0)) {
//     console.log("form2 驗證通過");
// 進行下一步動作
//   }
// };

btnNext1.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("you can start next step");
});
// btnNext2.addEventListener("click", handleFormSubmit2);

// const formSubmitCheck1 = function (status) {
//   btnNext1.addEventListener("click", function (e) {
//     e.preventDefault();

//     const name = document.querySelector(".input--1");
//     const phone = document.querySelector(".input--2");
//     const birthYear = document.querySelector(".input--4");
//     const people = document.querySelector(".input--6");
//     const mail = document.querySelector(".input--7");
//     const formComplete = [0, 0, 0, 0, 0];

//     if (status === true) {
//       if (name.value === "" || containsNumber(name.value)) {
//         alert("姓名不可為空或者包含數字");
//         formComplete[0] = 1;
//       } else {
//         formComplete[0] = 0;
//       }

//       if (phone.value === "") {
//         alert("手機號碼不可為空");
//         formComplete[1] = 1;
//       } else if (isNaN(phone.value)) {
//         alert("請輸入正確手機格式");
//         formComplete[1] = 1;
//       } else if (phone.value.length !== 10 || !phone.value.startsWith("09")) {
//         alert("請輸入正確手機格式");
//         formComplete[1] = 1;
//       } else {
//         formComplete[1] = 0;
//       }

//       let currentYear = new Date().getFullYear();
//       if (birthYear.value === "") {
//         alert("出生年份不可為空");
//         formComplete[2] = 1;
//       } else if (isNaN(birthYear.value)) {
//         alert("請輸入正確出生年份格式");
//         formComplete[2] = 1;
//       } else if (birthYear.value < 1911 || birthYear.value > currentYear) {
//         alert("請輸入正確出生年份格式");
//         formComplete[2] = 1;
//       } else {
//         formComplete[2] = 0;
//       }

//       if (people.value === "") {
//         alert("人數不可為空");
//         formComplete[3] = 1;
//       } else if (people.value <= 0) {
//         alert("人數至少為1人");
//         formComplete[3] = 1;
//       } else {
//         formComplete[3] = 0;
//       }

//       if (
//         mail.value !== "" &&
//         (!mail.value.includes("@") || !mail.value.includes("."))
//       ) {
//         alert("請輸入正確電子郵件格式");
//         formComplete[4] = 1;
//       } else if (mail.value === "") {
//         alert("電子郵件不可為空");
//         formComplete[4] = 1;
//       } else {
//         formComplete[4] = 0;
//       }

//       if (formComplete.every((key) => key === 0)) {
//         console.log(123);
//       }
//     }
//   });
// };
// formSubmitCheck1(active);

// const formSubmitCheck2 = function (status) {
//   btnNext2.addEventListener("click", function (e) {
//     e.preventDefault();

//     const name = document.querySelector(".input--8");
//     const phone = document.querySelector(".input--9");
//     const plan = document.querySelector(".input--11");
//     const people = document.querySelector(".input--12");
//     const mail = document.querySelector(".input--13");
//     const formComplete = [0, 0, 0, 0, 0];

//     if (!status) return;
//     if (name.value === "" || containsNumber(name.value)) {
//       alert("姓名不可為空或者包含數字");
//       formComplete[0] = 1;
//     } else {
//       formComplete[0] = 0;
//     }

//     if (phone.value === "") {
//       alert("手機號碼不可為空");
//       formComplete[1] = 1;
//     } else if (isNaN(phone.value)) {
//       alert("請輸入正確手機格式");
//       formComplete[1] = 1;
//     } else if (phone.value.length !== 10 || !phone.value.startsWith("09")) {
//       alert("請輸入正確手機格式");
//       formComplete[1] = 1;
//     } else {
//       formComplete[1] = 0;
//     }

//     if (plan.value === "") {
//       alert("公司名稱不可為空");
//       formComplete[2] = 1;
//     } else {
//       formComplete[2] = 0;
//     }

//     if (people.value === "") {
//       alert("人數不可為空");
//       formComplete[3] = 1;
//     } else if (people.value <= 0) {
//       alert("人數至少為1人");
//       formComplete[3] = 1;
//     } else {
//       formComplete[3] = 0;
//     }

//     if (
//       mail.value !== "" &&
//       (!mail.value.includes("@") || !mail.value.includes("."))
//     ) {
//       alert("請輸入正確電子郵件格式");
//       formComplete[4] = 1;
//     } else if (mail.value === "") {
//       alert("電子郵件不可為空");
//       formComplete[4] = 1;
//     } else {
//       formComplete[4] = 0;
//     }

//     if (formComplete.every((key) => key === 0)) {
//       console.log(123);
//     }
//   });
// };

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
