// contents 삽입
fetch("../public/database.json")
  .then(res => res.json())
  .then(data => {
    const tmp = {};
    // data에서 project_info 사용
    for (const student of data) {
      if (student.project_info) {
        student.project_info.forEach(p => {
          if (Object.hasOwn(tmp, p.project_name)) {
            tmp[p.project_name].designers.push(student.name_kr);
          } else {
            tmp[p.project_name] = {
              ...p,
              designers: [student.name_kr],
            };
          }
        });
      }
    }
    // for (const student of data) {
    //   student.project_info.forEach(p => {
    //     if (Object.hasOwn(tmp, p.project_name)) {
    //       tmp[p.project_name].designers.push(student.name_kr);
    //     } else {
    //       tmp[p.project_name] = {
    //         ...p,
    //         designers: [student.name_kr],
    //       }
    //     }
    //   })
    // }


    const projects = sortProjects(Object.values(tmp), true)
    setData(projects);

    const asc_btn = document.querySelector(".asc_btn");
    const desc_btn = document.querySelector(".desc_btn");
    asc_btn.addEventListener("click", () => {
      asc_btn.classList.add("active");
      desc_btn.classList.remove("active");
      setData(sortProjects(projects, true));
    });
    desc_btn.addEventListener("click", () => {
      desc_btn.classList.add("active");
      asc_btn.classList.remove("active");
      setData(sortProjects(projects, false));
    });
  });

function sortProjects(arr, asc) {
  return arr.sort((a, b) => asc
    ? a.project_name.localeCompare(b.project_name, "ko-KR")
    : b.project_name.localeCompare(a.project_name, "ko-KR")
  );
}

function setData(projects) {
  const projectGroup = document.querySelector(".project_group");
  projectGroup.innerHTML = ""; 
  projects.forEach((item) => {
    // 각 프로젝트에 대한 새로운 div 요소 생성
    const div = document.createElement("div");
    div.className = "border a_project";

    // 이미지 부분
    const ulImg = document.createElement("ul");
    ulImg.className = "border project_img img-box";

    const gra = document.createElement("div");
    gra.className = "border hover-gra";

    const aHref = document.createElement("a");
    aHref.setAttribute("href", `./a_project.html?project_name=${encodeURIComponent(item.project_name)}`);

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
    liName.innerText = item.designers.join(" / ");

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
