// 할일 목록
import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";
import TodoRegist from "../regist/TodoRegist.js";
import TodoInfo from "../info/TodoInfo.js";

const TodoList = async function () {
  const page = document.createElement("div");
  page.setAttribute("id", "page");

  const content = document.createElement("div");
  content.setAttribute("id", "content");
  let response;
  try {
    response = await axios("http://localhost:33088/api/todolist");

    const mainContainer = document.createElement("div");
    mainContainer.classList.add("class", "mainContainer");

    const ul = document.createElement("ul");
    ul.setAttribute("class", "todolist");
    response.data?.items.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add("todoItem");

      const todoInfoLink = document.createElement("a");
      todoInfoLink.setAttribute("href", `info?_id=${item._id}`);
      const title = document.createTextNode(item.title);
      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");

      //쩜쩜 버튼
      const todoSubButton = document.createElement("button");

      //쩜쩜 버튼 누르면 나오는 버튼리스트 (삭제/수정)
      const todoSubButtonList = document.createElement("ul");
      todoSubButtonList.className = "todoSubButtonList";
      todoSubButtonList.style.display = "none";

      // 수정 버튼
      const todoUpdate = document.createElement("li");
      const todoUpdateButton = document.createElement("button");
      const updateText = document.createTextNode("수정");
      // 삭제 버튼
      const todoDelete = document.createElement("li");
      const todoDeleteButton = document.createElement("button");
      const deleteText = document.createTextNode("삭제");
      todoDelete.addEventListener("click", async function (event) {
        event.preventDefault();
        const id = item._id;
        response = await axios
          .delete(`http://localhost:33088/api/todolist/${id}`)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (err) {
            console.log(err);
          });
      });

      //쩜쩜 버튼 누르면 토글 어쭈구
      todoSubButton.addEventListener("click", function (event) {
        // 브라우저의 기본 동작 취소(<a> 태그 동작 안하도록)
        event.preventDefault();
        const display = todoSubButtonList.style.display;
        if (display === "none") {
          todoSubButtonList.style.display = "block";
        } else {
          todoSubButtonList.style.display = "none";
        }
      });

      const ellipsis = document.createElement("i");

      ellipsis.setAttribute("class", "fa-solid fa-ellipsis");
      todoInfoLink.addEventListener("click", async function (event) {
        // 브라우저의 기본 동작 취소(<a> 태그 동작 안하도록)
        event.preventDefault();
        const infoPage = await TodoInfo({ _id: item._id });
        document.querySelector("#page").replaceWith(infoPage);
      });

      todoInfoLink.appendChild(title);
      //체크박스
      li.appendChild(checkbox);
      //투두 제목
      li.appendChild(todoInfoLink);
      //쩜쩜 버튼
      li.appendChild(todoSubButton);
      //쩜쩜 버튼 누르면 나오는 버튼리스트 (삭제/수정)
      li.appendChild(todoSubButtonList);
      mainContainer.appendChild(ul);

      todoSubButtonList.appendChild(todoUpdate);
      todoSubButtonList.appendChild(todoDelete);
      todoUpdate.appendChild(todoUpdateButton);
      todoDelete.appendChild(todoDeleteButton);

      todoUpdateButton.appendChild(updateText);
      todoDeleteButton.appendChild(deleteText);

      todoSubButton.appendChild(ellipsis);
      ul.appendChild(li);
    });
    content.appendChild(ul);

    const btnRegist = document.createElement("button");
    const btnTitle = document.createTextNode("등록");
    btnRegist.appendChild(btnTitle);
    content.appendChild(btnRegist);

    btnRegist.addEventListener("click", () => {
      const registPage = TodoRegist();
      document.querySelector("#page").replaceWith(registPage);
    });
  } catch (err) {
    const error = document.createTextNode("일시적인 오류 발생");
    content.appendChild(error);
  }

  page.appendChild(Header("Todo List"));
  page.appendChild(content);
  page.appendChild(Footer());
  return page;
};

export default TodoList;
