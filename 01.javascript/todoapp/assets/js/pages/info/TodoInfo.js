// 할일 등록
import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";
import { linkTo } from "../../Router.js";
import handleDateForm from "../../../utils/handleDateForm.js";
import getId from "../../../utils/getId.js";
import useSelectTodoInfo from "../../../axios/useSelectTodoInfo.js";
import update from "../../apis/update.js";

const TodoInfo = async function () {
  //주소에서 id 가져오기
  const ID = getId();
  const data = await useSelectTodoInfo(ID);
  const item = data.item;

  //page
  const page = document.createElement("div");
  page.setAttribute("id", "page");
  page.className = "info";

  //본문
  const main = document.createElement("main");

  const infoContentsSection = document.createElement("section");
  const infoButtonsSection = document.createElement("section");
  infoContentsSection.id = "info-contents-section";
  infoButtonsSection.id = "info-buttons-section";
  main.appendChild(infoContentsSection);
  main.appendChild(infoButtonsSection);

  //할 일 제목
  const infoTitle = document.createElement("h3");
  infoTitle.id = "info-todo-title";
  infoTitle.textContent = `할 일 : ${item.title}`;
  infoContentsSection.appendChild(infoTitle);

  //상세 내용
  const infoContentTitle = document.createElement("label");
  infoContentTitle.for = "info-todo-content";
  infoContentTitle.textContent = "상세 내용";
  const infoContent = document.createElement("p");
  infoContent.id = "info-todo-content";
  infoContent.textContent = item.content;
  infoContentsSection.appendChild(infoContentTitle);
  infoContentsSection.appendChild(infoContent);

  //생성시간
  const infoCreateTime = document.createElement("p");
  infoCreateTime.id = "info-create-time";
  infoCreateTime.textContent = `생성일 : ${handleDateForm(item.createdAt)}`;
  infoContentsSection.appendChild(infoCreateTime);

  //수정시간
  const infoUpdateTime = document.createElement("p");
  infoUpdateTime.id = "info-update-time";
  infoUpdateTime.textContent = `수정일 : ${handleDateForm(item.updatedAt)}`;
  infoContentsSection.appendChild(infoUpdateTime);

  //완료여부(체크박스)
  const checkboxDetail = document.createElement("input");
  checkboxDetail.setAttribute("id", "checkbox");
  checkboxDetail.type = "checkbox";
  checkboxDetail.checked = item.done;
  infoContentsSection.appendChild(checkboxDetail);
  content.appendChild(checkboxDetail);
  checkboxDetail.addEventListener("click", () =>
    update({ ...item, done: checkboxDetail.checked })
  );

  //수정하기 버튼
  const btnModify = document.createElement("button");
  btnModify.textContent = "수정";
  btnModify.id = "info-btn-modify";
  infoButtonsSection.appendChild(btnModify);
  btnModify.addEventListener("click", function (event) {
    event.preventDefault();
    linkTo(`update?_id=${ID}`);
  });

  //삭제하기 버튼
  const btnDelete = document.createElement("button");
  btnDelete.textContent = "삭제";
  btnDelete.id = "info-btn-delete";
  infoButtonsSection.appendChild(btnDelete);
  btnDelete.addEventListener("click", function (event) {
    event.preventDefault();
    if (confirm("삭제하시겠습니까?")) {
      axios.delete(`http://localhost:33088/api/todolist/${ID}`);
      linkTo("/");
    }
  });

  //홈 버튼
  const btnGoHome = document.createElement("button");
  btnGoHome.textContent = "홈으로 이동";
  btnGoHome.id = "info-btn-home";
  btnGoHome.onclick = () => {
    linkTo("/");
  };
  infoButtonsSection.appendChild(btnGoHome);

  page.appendChild(Header("TODO App 상세 조회"));
  page.appendChild(main);
  page.appendChild(Footer());

  return page;
};

export default TodoInfo;
