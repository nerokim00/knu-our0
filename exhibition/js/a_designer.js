// // window.onload
// const params = new URLSearchParams(window.location.search);
// console.log(params.get("designer"));

function projectComponent(project) {
  return `<div class="border a_project inner">
            <div class="border project_img">
              <a href="./a_project.html?project_name=${encodeURIComponent(project.project_name)}">
                <img
                  src="${project.thumbnail}&sz=w1000"
                  alt="작품 썸네일"
                />
                <div class="border hover-gra"></div>
              </a>
            </div>

            <ul class="border project_info inner">
              <li class="border project_name en">${project.project_name}</li>
              <li class="border subject_name kr">${project.subject}</li>
            </ul>
          </div>`;
}

// URL에서 디자이너 이름 파라미터 추출
const urlParams = new URLSearchParams(window.location.search);
const designerName = urlParams.get("designer");

fetch("../public/database.json") // JSON 파일 경로 맞게 수정
  .then((response) => response.json())
  .then((data) => {
    const designer = data.find((d) => d.name_en === designerName);

    if (!designer) {
      console.log("해당 디자이너를 찾을 수 없습니다.");
      return;
    }
    // 아이덴티티 이미지, 문구, 디자이너 정보 설정
    const img = document.querySelector(".identity_img");
    img.src = designer.identity_img + "&sz=w1000";
    // img.alt = designer.name_kr + "의 아이덴티티 이미지";

    // identity_sentence 수정
    const keyword = designer.keyword;
    const name = designer.name_kr;

    // 'identity_sentence'에서 keyword와 name의 색상을 변경하기 위한 정규식
    let updatedSentence = designer.identity_sentence
      .replace(keyword, `<span class="keyword">${keyword}</span>`)
      .replace(name, `<span class="name">${name}</span>`);

    // 업데이트된 문장을 HTML에 적용
    document.querySelector(".des_identity_sentence").innerHTML =
      updatedSentence;

    // 디자이너 연락처 정보 설정
    const designerInfoEl = document.querySelector(".des_designer_info");
    designerInfoEl.innerHTML = `
                ${
                  designer.designer_info.instagram &&
                  `<p>instagram ${designer.designer_info.instagram}</p>
                <p>・</p>`
                }
                <p>E-mail ${designer.designer_info.email}</p>
            `;

    // 프로젝트 리스트 설정
    const projectGroupEl = document.querySelector(".project_group");
    designer.project_info.forEach((project) => {
      const html = projectComponent(project);
      projectGroupEl.insertAdjacentHTML("beforeend", html);
    });
  })
  .catch((error) => console.log("JSON 데이터를 불러오는 중 오류 발생:", error));
