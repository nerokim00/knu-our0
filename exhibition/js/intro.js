document.addEventListener("DOMContentLoaded", function () {
  const intro = document.querySelector("#intro");
  const video = intro.querySelector("video");
  const closeBtn = intro.querySelector(".end");
  const played = window.sessionStorage.getItem("intro-played");

  if (played) {
    return;
  }
  
  window.sessionStorage.setItem("intro-played", "true");
  intro.classList.add("intro");
  // 페이드 아웃 함수
  function fadeOutIntro() {
    if (intro) {
      intro.classList.add("fade-out");
      setTimeout(() => {
        intro.remove();  // 페이드 아웃 후 intro div 삭제
      }, 1000);  // CSS transition 시간과 일치시킵니다.
    }
  }

  // p 태그 클릭 시 페이드 아웃
  if (closeBtn) {
    closeBtn.addEventListener("click", fadeOutIntro);
  }

  // 영상 종료 시 페이드 아웃
  if (video) {
    video.addEventListener("ended", fadeOutIntro);
  }
});