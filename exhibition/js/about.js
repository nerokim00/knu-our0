// 슬라이드 기능
$(function () {
  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    loop: true,
    speed: 500,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    on: {
      slideChange: function () {
        // 현재 슬라이드 인덱스를 확인합니다.
        if (this.realIndex === this.slides.length - 3) {
          // 루프 모드에서 마지막 슬라이드
          // 마지막 슬라이드일 경우 지연 시간 9초로 설정
          this.params.autoplay.delay = 8950;
          this.autoplay.start();

          // 마지막 슬라이드의 비디오 요소를 찾아 자동 재생
          var video = this.slides[this.activeIndex].querySelector("video");
          if (video) {
            video.play();
          }
        } else {
          // 다른 슬라이드로 이동 시 비디오 정지 및 지연 시간 원상 복구
          this.params.autoplay.delay = 3000;
          this.autoplay.start();

          // 다른 슬라이드일 때 비디오 정지
          var videos = document.querySelectorAll(".swiper-slide video");
          videos.forEach(function (v) {
            v.pause();
            v.currentTime = 0; // 비디오를 처음 위치로 돌려놓음
          });
        }
      },
    },
  });
});

// 탭 기능
$(function () {
  $(".advisor").on("click", function () {
    $(".advisor").addClass("active");

    $(".committee").removeClass("active");
    $(".hall").removeClass("active");
  });

  $(".committee").on("click", function () {
    $(".committee").addClass("active");

    $(".advisor").removeClass("active");
    $(".hall").removeClass("active");
  });

  $(".hall").on("click", function () {
    $(".hall").addClass("active");

    $(".advisor").removeClass("active");
    $(".committee").removeClass("active");
  });
});

const slideElement = document.querySelector(".mySwiper");
const videoElement = document.querySelector(".video");
const cursorElement = document.querySelector(".cursor");

slideElement.addEventListener("mouseenter", () => {
  cursorElement.classList.add("cursor-hidden");
});

slideElement.addEventListener("mouseleave", () => {
  cursorElement.classList.remove("cursor-hidden");
});

videoElement.addEventListener("mouseenter", () => {
  cursorElement.classList.add("cursor-hidden");
});

videoElement.addEventListener("mouseleave", () => {
  cursorElement.classList.remove("cursor-hidden");
});
