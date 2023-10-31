// 할일 등록
import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";

const TodoRegist = function () {
  const page = document.createElement("div");
  page.setAttribute("id", "page");
  page.setAttribute("class", "regist");

  const handleRegist = (e) => {
    e.preventDefault();

    const titleValue = document.querySelector("#title-create").value;
    const contentValue = document.querySelector("#content-create").value;

    //입력값 확인(이중확인)
    if (titleValue === "") {
      alert("제목을 입력하세요");
    }
    if (contentValue === "") {
      alert("상세 내용을 입력하세요");
    }
    if (confirm("할 일을 등록하시겠습니까?")) {
      // axios post
      try {
        axios.post("http://localhost:33088/api/todolist", {
          title: titleValue,
          content: contentValue,
          done: false,
        });
        alert("할 일이 등록되었습니다.");
        window.location.replace("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const container = document.createElement("main");
  container.setAttribute("id", "crete-container");

  const formCreate = document.createElement("form");
  //할일 제목
  const titleDiv = document.createElement("div");
  titleDiv.setAttribute("class", "title");
  const titleLabel = document.createTextNode("할일");
  const titleInput = document.createElement("input");
  titleInput.setAttribute("id", "title-create");
  titleInput.setAttribute("name", "title-create");
  titleInput.setAttribute("class", "title-create");
  titleInput.setAttribute("placeholder", "할 일을 입력하세요.");
  titleDiv.appendChild(titleLabel);
  //상세내용
  const contentDiv = document.createElement("div");
  contentDiv.setAttribute("class", "content");
  const contentLabel = document.createTextNode("상세내용");
  const contentInput = document.createElement("textarea");
  contentInput.setAttribute("id", "content-create");
  contentInput.setAttribute("name", "content-create");
  contentInput.setAttribute("class", "content-create");
  contentInput.setAttribute("placeholder", "상세 내용을 입력하세요.");
  contentDiv.appendChild(contentLabel);
  // 버튼 활성 비활성화 조건
  // 1. titleInput 값이 '' 이면 disabled
  // 2. 값이 '' 아니면 disabled 삭제
  titleInput.addEventListener("input", checkButtonStatus);
  contentInput.addEventListener("input", checkButtonStatus);

  function checkButtonStatus() {
    const titleValue = titleInput.value;
    const contentValue = contentInput.value;

    if (titleValue === "" || contentValue === "") {
      submit.setAttribute("disabled", true);
    } else {
      submit.removeAttribute("disabled");
    }
  }

  // 생성하기 버튼: confirm 띄우기
  const submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "등록");
  submit.setAttribute("disabled", true);
  submit.addEventListener("click", handleRegist);

  // 취소하기 버튼: 뒤로가기 이벤트
  const cancel = document.createElement("button");
  cancel.setAttribute('class','cancel')
  cancel.innerText = "취소";
  cancel.addEventListener("click", () => {
    window.history.back();
  });

  page.appendChild(Header("TODO List"));
  formCreate.setAttribute('class','form')
  formCreate.appendChild(titleDiv);
  formCreate.appendChild(titleInput);
  formCreate.appendChild(contentDiv);
  formCreate.appendChild(contentInput);
  formCreate.appendChild(submit);
  formCreate.appendChild(cancel);

  container.appendChild(formCreate);
  page.appendChild(container);
  page.appendChild(Footer());

  return page;
};

export default TodoRegist;
