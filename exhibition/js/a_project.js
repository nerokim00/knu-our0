function designerProfile(designer) {
  return `<a href="./a_designer.html?designer=${encodeURIComponent(designer.name_en)}">
        <div class="name">
            <p class="en">${designer.name_kr}</p>
            <p class="en">${designer.name_en}</p>
        </div>
        <div class="img-box">
            <img src="${designer.identity_img}" style="background: white;">
        </div>
    </a>`;
}

function injectInfo({ project, designers }) {
  //thumbnail update
  document
    .getElementById("thumbnail")
    ?.setAttribute("src", project.thumbnail + "&sz=w5000");

  //text update
  document.querySelector("li.tag").textContent = project.subject;
  document.querySelector("li.project-title").textContent = project.project_name;
  document.querySelector("li.project-subtitle").textContent =
    project.project_subtitle;
  document.querySelector("li.project-text").textContent = project.project_text;


  // 디자이너 프로필을 필터링된 디자이너 목록으로만 업데이트
  document.getElementById("designer_profiles").innerHTML = designers
    .map((d) => designerProfile(d))
    .join("");

  // 프로젝트 이미지 1 업데이트
  // if (project.project_image_1) {
  //   document
  //     .getElementById("project_image_1")
  //     .setAttribute("src", project.project_image_1 + "&sz=w5000");
  // } else {
  //   document.getElementById("project_image_1").style.display = "none";
  // }
  if (project.project_image_1) {
    const img1 = document.getElementById("project_image_1");
    img1.setAttribute("src", project.project_image_1 + "&sz=w5000");
    img1.style.display = "block"; // 첫 번째 이미지가 있으면 표시
  } else {
    document.getElementById("project_image_2").style.display = "none";
  }


  // 프로젝트 이미지 2 업데이트 (추가된 부분)
  if (project.project_image_2) {
    const img2 = document.getElementById("project_image_2");
    img2.setAttribute("src", project.project_image_2 + "&sz=w5000");
    img2.style.display = "block"; // 두 번째 이미지가 있으면 표시
  } else {
    document.getElementById("project_image_2").style.display = "none";
  }

  // document
  //   .getElementById("project_image")
  //   .setAttribute("src", project.project_image + "&sz=w5000");

  //video update
  if (project.project_video) {
    document
      .getElementById("project_video")
      .setAttribute("src", project.project_video);
  } else {
    document.getElementById("project_video").parentElement.remove();
  }

  //exhibition photo update
  if (project.exhibition_photo) {
    document
      .getElementById("exhibition_photo")
      .setAttribute("src", project.exhibition_photo + "&sz=w5000");
  } else {
    document.getElementById("exhibition_photo").parentElement.remove();
  }
}

fetch("../public/database.json")
  .then((response) => response.json())
  .then((data) => {
    const params = new URLSearchParams(window.location.search);
    const project_name = params.get("project_name");
    if (!project_name) {
      alert("project_name missing");
      return;
    }
    const tmp = {
      project: undefined,
      designers: [],
    };
    for (const student of data) {
      // 학생의 project_info 배열을 확인
      if (Array.isArray(student.project_info)) {
        const p = student.project_info.find(
          (p) => p.project_name == project_name
        );
        if (p) {
          tmp.project = tmp.project ?? p;
          tmp.designers.push(student);  // 해당 프로젝트에 참여한 학생 추가
        }
      }
    }
    console.log(tmp);

    if (!tmp.project) {
      alert("project not found");
      return;
    }

    injectInfo(tmp);
  });
