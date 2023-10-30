// 할일 목록
import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";
// import TodoRegist from "../regist/TodoRegist.js";
// import TodoInfo from "../info/TodoInfo.js";
import { linkTo } from "../../Router.js";

const TodoList = async function () {
  // 전체 todo, done 수
  const page = document.createElement("div");
  page.setAttribute("id", "page");

  const contentDone = document.createElement("div");
  const contentNotDone = document.createElement("div");
  contentDone.setAttribute("id", "content-done");
  contentNotDone.setAttribute("id", "content-not-done");
  let response;

  // 체크박스 클릭 시 호출될 함수
  function onCheckboxHandler(e) {
    const checkbox = e.target;
    const li = checkbox.parentElement;

    if (checkbox.checked) {
      contentDone.appendChild(li);
    } else {
      contentNotDone.appendChild(li);
    }
  }

  try {
    response = await axios("http://localhost:33088/api/todolist");

    response.data?.items.forEach((item) => {
      const title = document.createTextNode(item.title);

      //todo item
      const li = document.createElement("div");
      // drag 속성
      li.draggable = true;
      li.id = item._id;
      li.ondragstart = (e) => {
        e.dataTransfer.setData("text/plain", e.target.id);
      };

      //상세페이지 이동을 위한 a태그 속성
      const todoInfoLink = document.createElement("a");
      todoInfoLink.setAttribute("id", item._id);
      todoInfoLink.setAttribute("href", `info?_id=${item._id}`);
      todoInfoLink.appendChild(title);
      todoInfoLink.addEventListener("click", function (event) {
        // 브라우저의 기본 동작 취소(<a> 태그 동작 안하도록)
        event.preventDefault();
        // const infoPage = await TodoInfo({ _id: item._id });
        // document.querySelector("#page").replaceWith(infoPage);
        linkTo(todoInfoLink.getAttribute("href"));
      });

      // todo item의 checkbox 속성
      const checkbox = document.createElement("input");
      checkbox.setAttribute("id", "checkbox");
      checkbox.setAttribute("type", "checkbox");
      checkbox.setAttribute("name", "checkbox");
      checkbox.setAttribute("checked", false);
      checkbox.checked = item.done;
      li.appendChild(checkbox);
      li.appendChild(todoInfoLink);
      checkbox.addEventListener("click", onCheckboxHandler);

      //todo item done 값에 따른 위치 분류
      if (item.done) {
        contentDone.appendChild(li);
      } else {
        contentNotDone.appendChild(li);
      }
    });

    //등록 버튼
    const btnRegist = document.createElement("button");
    const btnTitle = document.createTextNode("등록");
    btnRegist.appendChild(btnTitle);
    page.appendChild(btnRegist);

    btnRegist.addEventListener("click", () => {
      // const registPage = TodoRegist();
      // //id로 주소 이동 필요
      // document.querySelector("#page").replaceWith(registPage);
      linkTo("regist");
    });
  } catch (err) {
    const error = document.createTextNode("일시적인 오류 발생");
    page.appendChild(error);
  }

  // allow drop
  function allowDrop(e) {
    e.preventDefault();
  }

  // drop
  function drop(e, isDone) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const dragEl = document.getElementById(id);
    // 체크박스 찾기
    if (dragEl) {
      const checkbox = dragEl.querySelector("input[type='checkbox']");
      // 체크박스 check 상태 업데이트
      if (checkbox) {
        checkbox.checked = isDone;
      }
    }
    e.target.appendChild(dragEl);
  }

  // drag & drop event 추가
  contentDone.ondragover = allowDrop;
  contentDone.ondrop = (e) => drop(e, true);
  contentNotDone.ondragover = allowDrop;
  contentNotDone.ondrop = (e) => drop(e, false);

  page.appendChild(Header("TODO App 목록 조회"));
  page.appendChild(contentDone);
  page.appendChild(contentNotDone);
  page.appendChild(Footer());
  return page;
};

export default TodoList;
