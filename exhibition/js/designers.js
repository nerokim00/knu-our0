const img_el = document.getElementById("identity_img");
const keyword_elements = document.getElementsByClassName("keyword");
const wrapper = document.getElementById("student_inner");
wrapper.style.color = "white";

img_el.addEventListener("click", (e) => {
  e.preventDefault();
  const href = e.currentTarget.dataset.href;
  if (!href) {
    console.log("no href on the image");
    return;
  }
  window.location.href = href;
});

function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

fetch("../public/database.json")
  .then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then((data) => {
    data.forEach((item) => {
      isTouchDevice() ? handleTouchDevice(item) : handleDesktopDevice(item);
    });
  })
  .catch((err) => console.log(err.message));

function handleTouchDevice(item) {
  const span = document.createElement("span");
  span.className = "student_name_box";
  span.onclick = (e) => {
    const contains = e.target.classList.contains("active");
    if (contains) {
      window.location.href =
        "./a_designer.html?designer=" +
        encodeURIComponent(item.name_en);
    }
    if (item.identity_img) {
      img_el.setAttribute("src", item.identity_img + "&sz=w500");
    }
    img_el.setAttribute("alt", item.keyword);
    img_el.style.display = "block";
    img_el.dataset.href =
      "./a_designer.html?designer=" +
      encodeURIComponent(item.name_en);

    for (let i = 0; i < keyword_elements.length; i++) {
      keyword_elements[i].innerText = item.identity_en.toUpperCase();
    }
    document
      .querySelectorAll(".active")
      .forEach((el) => el.classList.remove("active"));
    span.classList.add("active");
  };
  span.textContent = item.name_kr;
  wrapper.appendChild(span);
}

function handleDesktopDevice(item) {
  const anchor = document.createElement("a");
  anchor.textContent = item.name_kr;
  anchor.className = "student_name_box";
  anchor.href =
    "./a_designer.html?designer=" + encodeURIComponent(item.name_en);
  anchor.onmouseenter = () => {
    if (item.identity_img) {
      img_el.setAttribute("src", item.identity_img + "&sz=w500");
    }
    img_el.setAttribute("alt", item.keyword);
    img_el.style.display = "block";
    img_el.dataset.href =
      "./a_designer.html?designer=" +
      encodeURIComponent(item.name_en);

    for (let i = 0; i < keyword_elements.length; i++) {
      keyword_elements[i].innerText = item.identity_en.toUpperCase();
    }
    document
      .querySelectorAll(".active")
      .forEach((el) => el.classList.remove("active"));
    anchor.classList.add("active");
  };
  wrapper.appendChild(anchor);
}
