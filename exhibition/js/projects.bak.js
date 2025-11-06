// contents 삽입
fetch("../public/test.json")
  .then((response) => response.json())
  .then((data) => {
    const projects = {};
    for (const student of data) {
      student.projects.forEach(p => {
        if (Object.hasOwn(projects, p.project_name)) {
          projects[p.project_name].designers.push(student.name_kr);
        } else {
          projects[p.project_name] = {
            ...p,
            designers: [student.name_kr],
          }
        }
      })
    }
    // const projects = data.flatMap((student) => {
    //   return student.projects.map((p) => ({ ...p, name_kr: student.name_kr }));
    // });
    // const collator = new Intl.Collator("ko");
    // projects.sort((a, b) => {
    //   return collator.compare(a.project_name, b.project_name);
    // });
    setData(projects);
  });

function setData(data) {
  const projectGroup = document.querySelector(".project_group");
  Object.values(data).forEach((item) => {
    // 각 프로젝트에 대한 새로운 div 요소 생성
    const div = document.createElement("div");
    div.className = "border a_project";

    // 이미지 부분
    const ulImg = document.createElement("ul");
    ulImg.className = "border project_img img-box";

    const gra = document.createElement("div");
    gra.className = "border hover-gra";

    const aHref = document.createElement("a");
    aHref.setAttribute("href", `/exhibition/a_project.html?project_name=${item.project_name}`);

    const img = document.createElement("img");
    img.setAttribute("src", item.thumbnail + "&sz=w1000");
    img.className = "thumnail_img";
    img.alt = "작품 썸네일";

    // 프로젝트 정보 부분
    const ulInfo = document.createElement("ul");
    ulInfo.className = "border project_info";

    const liProjectName = document.createElement("li");
    liProjectName.className = "border en project_name";
    liProjectName.innerText = item.project_name;

    const liName = document.createElement("li");
    liName.className = "border kr project_designer_name";
    liName.innerText = item.designers.join(", ");

    // 생성된 요소들을 div에 추가
    aHref.appendChild(img);
    ulImg.appendChild(aHref);
    aHref.appendChild(gra);
    div.appendChild(ulImg);
    div.appendChild(ulInfo);
    ulInfo.appendChild(liProjectName);
    ulInfo.appendChild(liName);

    // .project_group 컨테이너에 새로운 프로젝트 div 추가
    projectGroup.appendChild(div);
  });
}

// 검색 기능
function filter() {
  let search = document.getElementById("search").value.toLowerCase();
  let listInner = document.getElementsByClassName("a_project");

  const pageNum = document.querySelector(".page-number");
  const projectHeight = document.querySelector(".project_group_wrap");

  for (let i = 0; i < listInner.length; i++) {
    city = listInner[i].getElementsByClassName("project_name");
    country = listInner[i].getElementsByClassName("project_designer_name");

    if (
      city[0].innerHTML.toLowerCase().indexOf(search) != -1 ||
      country[0].innerHTML.toLowerCase().indexOf(search) != -1
    ) {
      listInner[i].style.display = "block";
    } else {
      listInner[i].style.display = "none";

      pageNum.style.display = "none";
      projectHeight.style.height = "fit-content";
    }
  }
}

// 정렬 버튼 : click 시, css 변화 기능
$(function () {
  $(".asc_btn").on("click", function () {
    $(".asc_btn").addClass("active");
    $(".desc_btn").removeClass("active");
  });

  $(".desc_btn").on("click", function () {
    $(".desc_btn").addClass("active");

    $(".asc_btn").removeClass("active");
  });
});

// 정렬 기능
function sortTable(ascending) {
  let container = document.querySelector(".project_group");
  let projects = Array.from(container.getElementsByClassName("a_project"));

  projects.sort((a, b) => {
    let nameA = a
      .getElementsByClassName("project_name")[0]
      .textContent.toLowerCase();
    let nameB = b
      .getElementsByClassName("project_name")[0]
      .textContent.toLowerCase();

    if (nameA < nameB) return ascending ? -1 : 1;
    if (nameA > nameB) return ascending ? 1 : -1;
    return 0;
  });

  projects.forEach((project) => container.appendChild(project));
}

//정렬 기능 : 이벤트 추가
document.getElementById("sortAsc") != null
  ? document
      .getElementById("sortAsc")
      .addEventListener("click", () => sortTable(true))
  : null;
document.getElementById("sortDesc") != null
  ? document
      .getElementById("sortDesc")
      .addEventListener("click", () => sortTable(false))
  : null;
// document.onload(sortTable(true));
