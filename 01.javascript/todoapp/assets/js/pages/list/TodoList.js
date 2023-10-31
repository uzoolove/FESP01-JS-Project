import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";
import TodoRegist from "../regist/TodoRegist.js";
import TodoInfo from "../info/TodoInfo.js";

const TodoList = async function () {
  const page = document.createElement("div");
  page.setAttribute("id", "todoList");

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
      checkbox.setAttribute("id", `checkImage${item._id}`);
      checkbox.setAttribute("type", "checkbox");
      checkbox.checked = item.done; // 체크박스의 초기상태값 설정

      //체크박스 커스텀 라벨
      const checkImage = document.createElement("label");
      checkImage.setAttribute("for", `checkImage${item._id}`);

      checkbox.addEventListener("click", async (event) => {
        event.preventDefault();
        console.log(event.target.checked);
        const check = event.target.checked;

        if (item.done === true) {
          item.done = false;
        } else {
          item.done = true;
        }

        try {
          const response = await axios.patch(
            `http://localhost:33088/api/todolist/${item._id}`,
            {
              done: item.done,
            }
          );
          // console.log(response.data.item.done);
        } catch (err) {
          console.error(err);
        }
      });

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

      // 첫 렌더링시 done상태값에 따라 todolist의 글자색이 변경되는 조건문
      if (item.done === true) {
        todoInfoLink.style.color = "#C8C8C8";
      } else {
        todoInfoLink.style.color = "black";
      }

      // 체크박스 토글기능 이벤트
      checkImage.addEventListener("click", function (e) {
        if (checkbox.checked === true) {
          checkbox.checked = false;
        } else {
          checkbox.checked = true;
        }
      });

      // 투두리스트 글자색이 변경되는 이벤트
      checkbox.addEventListener("click", function (e) {
        const done = item.done;

        if (!done) {
          todoInfoLink.style.color = "black";
        } else {
          todoInfoLink.style.color = "#C8C8C8";
        }
      });

      //쩜쩜 버튼 누르면 토글
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

      //쩜쩜 아이콘
      const ellipsis = document.createElement("i");
      ellipsis.setAttribute("class", "fa-solid fa-ellipsis");

      todoInfoLink.addEventListener("click", async function (event) {
        // 브라우저의 기본 동작 취소(<a> 태그 동작 안하도록)
        event.preventDefault();
        const infoPage = await TodoInfo({ _id: item._id });
        document.querySelector("#todoList").replaceWith(infoPage);
      });

      todoInfoLink.appendChild(title);
      //체크박스
      li.appendChild(checkbox);
      li.appendChild(checkImage);
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
    const btnTitle = document.createTextNode("");
    btnRegist.setAttribute("id", "addButton");
    btnRegist.setAttribute("aria-label", "등록 화면으로 이동버튼");
    //플러스 버튼
    const plusIcon = document.createElement("i");
    plusIcon.setAttribute("class", "fa-regular fa-plus");

    btnRegist.appendChild(btnTitle);
    btnRegist.appendChild(plusIcon);
    content.appendChild(btnRegist);

    btnRegist.addEventListener("click", () => {
      const registPage = TodoRegist();
      document.querySelector("#todoList").replaceWith(registPage);
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
