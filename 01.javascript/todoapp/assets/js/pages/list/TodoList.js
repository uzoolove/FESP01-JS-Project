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
  axios.defaults.baseURL = "http://localhost:33088/api/todolist";
  response = await axios();
  try {
    const ul = document.createElement("ul");
    ul.setAttribute("class", "todolist");
    response.data?.items.forEach((item) => {
      const li = document.createElement("li");
      const todoInfoLink = document.createElement("a");
      const deleteEl = document.createElement("button");
      deleteEl.innerText = "삭제";
      todoInfoLink.setAttribute("href", `info?_id=${item._id}`);
      const checkTodo = document.createElement("input");
      checkTodo.setAttribute("type", "checkbox");
      checkTodo.checked = item.done;
      const title = document.createTextNode(item.title);

      deleteEl.addEventListener("click", async function () {
        try {
          const body = { id: item._id };
          const response = await axios.delete(`/${item._id}`, body);
          const data = response.data;
          console.log(data);
          li.remove();
        } catch (error) {}
      });

      todoInfoLink.addEventListener("click", async function (event) {
        event.preventDefault();
        const infoPage = await TodoInfo({ _id: item._id });
        document.querySelector("#page").replaceWith(infoPage);
      });

      checkTodo.addEventListener("click", async function () {
        try {
          const body = {
            title: item.title,
            content: item.content,
            done: !item.done,
          };

          const response = await axios.patch(`/${item._id}`, body);
          const data = response.data;
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      });

      todoInfoLink.appendChild(title);
      li.appendChild(deleteEl);
      li.appendChild(todoInfoLink);
      li.appendChild(checkTodo);
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

  page.appendChild(Header("TODO App 목록 조회"));
  page.appendChild(content);
  page.appendChild(Footer());
  return page;
};

export default TodoList;
