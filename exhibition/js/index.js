// const img_el = document.getElementById("identity_img");
const el = document.getElementById("name-list");
el.style.color = "white";

fetch("../public/database.json")
.then(res => {
    if (!res.ok) {
        throw new Error(res.statusText);
    }
    return res.json();
})
.then(data => {
    console.log(data);

    const click_div = document.getElementById("when_you_click_a_name");
    const img = document.getElementById("identity-img");
    const announcement_box = document.querySelector(".announcement-box-abt-name");
    const main_content = document.querySelector(".main-content");

    data.forEach(item => {
        const major = item.major === "Visual Design" ? "visual" : "product";
        const div = document.createElement("div");
        const span = document.createElement("span");

        span.onclick = () => {
            document.querySelectorAll("#name-list span").forEach(el => {
                el.classList.remove("selected");
            });


            click_div.classList.remove("hidden", "visual", "product");
            click_div.classList.add(major);
            announcement_box.classList.add("hidden");
            main_content.classList.add("hidden");

            span.classList.add("selected");
            img.setAttribute("src", item.identity_img + "&sz=w700");
            img.setAttribute("alt", item.keyword);

            // .background-green 숨기기
            document.querySelector(".background-green").style.display = "none";  // background-green 숨기기

            // .background-white에서 mix-blend-mode를 없애기
            document.querySelector(".background-white").style.mixBlendMode = "normal";  // mix-blend-mode 없애기
            document.querySelector(".background-white").style.opacity = "0.2";  // mix-blend-mode 없애기

            img.addEventListener("click", ()=> {
                window.location.href = "./exhibition/a_designer.html?designer=" + encodeURIComponent(item.name_en);
            });
        };

        span.textContent = item.name_en;
        div.appendChild(span);
        el.appendChild(div);
    });


})
.catch(err => console.log(err.message));



