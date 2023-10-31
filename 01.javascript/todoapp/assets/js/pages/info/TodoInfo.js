// 할일 등록
import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";
import { linkTo } from "../../Router.js";
import update from "../../apis/update.js";

window.addEventListener("load", function () {
  TodoInfo();
});

const doDateFormatting = (date) => {
  const dateForm = new Date(date);
  const year = dateForm.getFullYear();
  const month = dateForm.getMonth() + 1;
  const day = dateForm.getDate();
  return `${year}/${month}/${day}`;
};
const TodoInfo = async function ({ _id } = {}) {
  //주소에서 id 가져오기
  const urlStr = window.location.href;
  const url = new URL(urlStr);
  const urlparams = url.searchParams;
  const ID = urlparams.get("_id");

  const response = await axios.get(`http://localhost:33088/api/todolist/${ID}`);

  const item = response.data.item;

  const page = document.createElement("div");
  page.setAttribute("id", "page");

  //본문
  const content = document.createElement("div");
  content.id = "info-detail";
  const text = document.createTextNode(`_id=${_id} 상세 조회 화면`);
  const btnTitle = document.createTextNode("수정하기");
  content.appendChild(text);

  //제목
  const infoTitle = document.createElement("h3");
  infoTitle.textContent = `할 일 : ${item.title}`;
  content.appendChild(infoTitle);

  //상세 내용
  const infoContent = document.createElement("p");
  infoContent.textContent = `상세 내용 : ${item.content}`;
  content.appendChild(infoContent);

  //생성시간
  const infoCreateTime = document.createElement("p");
  infoCreateTime.textContent = `생성일 : ${doDateFormatting(item.createdAt)}`;
  content.appendChild(infoCreateTime);

  //수정시간
  const infoUpdate = document.createElement("p");
  infoUpdate.textContent = `수정일 : ${doDateFormatting(item.updatedAt)}`;
  content.appendChild(infoUpdate);

  //완료여부(체크박스)
  const checkboxDetail = document.createElement("input");
  checkboxDetail.setAttribute("id", "checkbox");
  checkboxDetail.type = "checkbox";
  checkboxDetail.checked = item.done;
  content.appendChild(checkboxDetail);
  checkboxDetail.addEventListener("click", () =>
    update({ ...item, done: checkboxDetail.checked })
  );

  //수정하기 버튼
  const btnModify = document.createElement("button");
  btnModify.textContent = "수정";
  content.appendChild(btnModify);
  btnModify.addEventListener("click", function (event) {
    event.preventDefault();
    linkTo(`update?_id=${ID}`);
  });

  //삭제하기 버튼
  const btnDelete = document.createElement("button");
  btnDelete.textContent = "삭제";
  content.appendChild(btnDelete);
  btnDelete.addEventListener("click", function (event) {
    event.preventDefault();
    if (confirm("삭제하시겠습니까?")) {
      axios.delete(`http://localhost:33088/api/todolist/${ID}`);
      // console.log("삭제됨");
      window.location.replace("/");
    }
  });

  // //뒤로가기 버튼
  // const btnBack = document.createElement("button");
  // btnBack.textContent = "뒤로가기";
  // btnBack.onclick = () => {
  //   window.history.back();
  // };
  // content.appendChild(btnBack);

  //홈 버튼
  const btnGoHome = document.createElement("button");
  btnGoHome.textContent = "홈으로 이동";
  btnGoHome.onclick = () => {
    linkTo("/");
  };
  content.appendChild(btnGoHome);

  page.appendChild(Header("TODO App 상세 조회"));
  page.appendChild(content);

  page.appendChild(Footer());

  return page;
};

export default TodoInfo;
