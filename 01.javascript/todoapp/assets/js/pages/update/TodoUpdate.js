// 할일 수정
import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";

import isEmpty from "../../utils/isEmpty.js";
import update from "../../apis/update.js";

const TodoUpdate = async () => {
  //주소에서 id 가져오기
  const urlStr = window.location.href;
  const url = new URL(urlStr);
  const urlparams = url.searchParams;
  const ID = urlparams.get("_id");

  const response = await axios.get(`http://localhost:33088/api/todolist/${ID}`);

  const item = response.data.item;

  const page = document.createElement("div");
  page.setAttribute("id", "page");

  const content = document.createElement("div");
  content.setAttribute("id", "update-detail");

  // 제목
  const titleDiv = document.createElement("div");
  titleDiv.textContent = "할 일 :";
  const titleInput = document.createElement("input");
  titleInput.setAttribute("id", "title-create");
  titleInput.setAttribute("name", "title-create");
  titleInput.setAttribute("placeholder", "할 일을 입력하세요.");
  titleInput.setAttribute("value", item.title);
  content.appendChild(titleDiv);
  titleDiv.appendChild(titleInput);

  // 상세 내용
  const contentDiv = document.createElement("div");
  contentDiv.textContent = "상세 내용 : ";
  const contentInput = document.createElement("textarea");
  contentInput.setAttribute("id", "content-create");
  contentInput.setAttribute("name", "content-create");
  contentInput.setAttribute("placeholder", "상세 내용을 입력하세요.");
  contentInput.textContent = item.content;
  content.appendChild(contentDiv);
  contentDiv.appendChild(contentInput);

  // 체크박스
  const checkbox = document.createElement("input");
  checkbox.setAttribute("id", "checkbox");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("name", "checkbox");
  checkbox.setAttribute("checked", false);
  checkbox.checked = item.done;
  content.appendChild(checkbox);

  // 수정 완료 버튼 - confirm
  const submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "수정 완료");
  submit.addEventListener("click", handleUpdate);

  content.appendChild(submit);

  function handleUpdate(e) {
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
      update({
        ...item,
        title: titleInput.value,
        content: contentInput.value,
        done: checkbox.checked,
      });

      alert("수정이 등록되었습니다.");
      window.location.replace("/");
    }
  }

  function checkButtonStatus() {
    const titleValue = titleInput.value;
    const contentValue = contentInput.value;

    if (titleValue === "" || contentValue === "") {
      submit.setAttribute("disabled", true);
    } else {
      submit.removeAttribute("disabled");
    }
  }

  titleInput.addEventListener("input", checkButtonStatus);

  // 취소 버튼 (이전페이지)
  const cancel = document.createElement("button");
  cancel.innerText = "취소";
  cancel.addEventListener("click", () => {
    window.history.back();
  });
  content.appendChild(cancel);

  // 헤터, 푸터 추가
  page.appendChild(Header("TODO App 수정"));
  page.appendChild(content);
  page.appendChild(Footer());

  return page;
};
export default TodoUpdate;
