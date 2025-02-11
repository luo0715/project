"use strict";
const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");

// 複製第一張和最後一張
const firstSlide = slides[0].cloneNode(true);
const lastSlide = slides[slides.length - 1].cloneNode(true);

// 將它們插入到頭尾
track.insertBefore(lastSlide, slides[0]);
track.appendChild(firstSlide);

// 初始化位置到真正的第一張
let currentIndex = 1;
track.style.transform = `translateX(${-500 * currentIndex}px)`;

// 滑動到下一張
nextButton.addEventListener("click", () => {
  currentIndex++;
  track.style.transition = "transform 0.5s ease-in-out";
  track.style.transform = `translateX(${-500 * currentIndex}px)`;

  // 檢查是否超出到複製的第一張
  track.addEventListener("transitionend", () => {
    if (currentIndex === slides.length + 1) {
      currentIndex = 1; // 回到真正的第一張
      track.style.transition = "none"; // 關閉動畫過渡效果
      track.style.transform = `translateX(${-500 * currentIndex}px)`;
    }
  });
});

// 滑動到上一張
prevButton.addEventListener("click", () => {
  currentIndex--;
  track.style.transition = "transform 0.5s ease-in-out";
  track.style.transform = `translateX(${-500 * currentIndex}px)`;

  // 檢查是否超出到複製的最後一張
  track.addEventListener("transitionend", () => {
    if (currentIndex === 0) {
      currentIndex = slides.length; // 回到真正的最後一張
      track.style.transition = "none"; // 關閉動畫過渡效果
      track.style.transform = `translateX(${-500 * currentIndex}px)`;
    }
  });
});
