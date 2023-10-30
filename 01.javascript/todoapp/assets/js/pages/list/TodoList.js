// 할일 목록
import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";
import TodoRegist from "../regist/TodoRegist.js";
import TodoInfo from "../info/TodoInfo.js";

const TodoList = async function () {
  // 전체 todo, done 수
  const page = document.createElement("div");
  page.setAttribute("id", "page");

  const contentDone = document.createElement("div");
  const contentNotDone = document.createElement("div");
  contentDone.setAttribute("id", "content-done");
  contentNotDone.setAttribute("id", "content-not-done");
  let response;
  try {
    response = await axios("http://localhost:33088/api/todolist");

    response.data?.items.forEach((item) => {
      const li = document.createElement("div");

      // drag 속성
      li.draggable = true;
      li.id = item._id;
      li.ondragstart = (e) => {
        e.dataTransfer.setData("text/plain", e.target.id);
      };

      const todoInfoLink = document.createElement("a");
      const checkbox = document.createElement("input");
      checkbox.setAttribute("id", "checkbox");
      checkbox.setAttribute("type", "checkbox");
      checkbox.setAttribute("name", "checkbox");
      checkbox.setAttribute("checked", false);
      checkbox.checked = item.done;
      todoInfoLink.setAttribute("href", `info?_id=${item._id}`);
      const title = document.createTextNode(item.title);
      li.appendChild(checkbox);

      todoInfoLink.addEventListener("click", async function (event) {
        // 브라우저의 기본 동작 취소(<a> 태그 동작 안하도록)
        event.preventDefault();
        const infoPage = await TodoInfo({ _id: item._id });
        document.querySelector("#page").replaceWith(infoPage);
      });

      todoInfoLink.appendChild(title);
      li.appendChild(todoInfoLink);
      contentDone.appendChild(li);
    });

    const btnRegist = document.createElement("button");
    const btnTitle = document.createTextNode("등록");
    btnRegist.appendChild(btnTitle);
    page.appendChild(btnRegist);

    btnRegist.addEventListener("click", () => {
      const registPage = TodoRegist();
      //id로 주소 이동 필요
      document.querySelector("#page").replaceWith(registPage);
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
