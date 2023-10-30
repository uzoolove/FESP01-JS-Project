// 할일 등록
import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";
import ToDoList from "../list/TodoList.js";

const TodoInfo = async function ({ _id } = {}) {
  const page = document.createElement("div");
  page.setAttribute("id", "page");

  const BASE_URL = "http://localhost:33088";
  let response;
  let data;
  try {
    response = await axios(`${BASE_URL}/api/todolist/${_id}`);
    data = response.data.item;
    console.log("1", data);
  } catch (e) {
    console.error(error);
  }
  console.log("2", data);
  const content = document.createElement("div");

  const container = document.createElement("div");
  const ul1 = document.createElement("div");
  const ul2 = document.createElement("div");

  ul1.setAttribute("class", "todolist");
  ul2.setAttribute("class", "todolist");

  for (let key in data) {
    let item = data[key];
    const li = document.createElement("div");
    const text = document.createTextNode(`${key}`);
    li.appendChild(text);
    ul1.appendChild(li);
  }

  for (let key in data) {
    let item = data[key];
    const li = document.createElement("div");
    const text = document.createTextNode(`${item}`);
    li.appendChild(text);
    ul2.appendChild(li);
  }

  container.appendChild(ul1);
  container.appendChild(ul2);
  container.style.display = "flex";
  container.style.flexDirection = "row";
  container.style.gap = "20px";
  content.appendChild(container);

  //뒤로가기 버튼
  const btnContainer = document.createElement("div");
  const btnHome = document.createElement("button");
  const btnHomeTitle = document.createTextNode("뒤로가기");
  btnHome.appendChild(btnHomeTitle);
  btnContainer.appendChild(btnHome);

  btnHome.addEventListener("click", async () => {
    const toDoListPage = await ToDoList();
    console.log(toDoListPage);
    document.querySelector("#page").replaceWith(toDoListPage);
  });
  btnContainer.appendChild(btnHome);

  //삭제버튼
  const btnDelete = document.createElement("button");
  const btnDeleteTitle = document.createTextNode("삭제");
  btnDelete.appendChild(btnDeleteTitle);
  btnContainer.appendChild(btnDelete);

  btnDelete.addEventListener("click", async () => {
    try {
      let res = await axios.delete(`${BASE_URL}/api/todolist/${_id}`);
      const toDoListPage = await ToDoList();
      console.log(toDoListPage);
      document.querySelector("#page").replaceWith(toDoListPage);
      content.append(btnContainer);
    } catch (e) {
      console.error(error);
    }
  });
  content.append(btnContainer);

  page.appendChild(Header("TODO App 상세 조회"));
  page.appendChild(content);
  page.appendChild(Footer());

  return page;
};

export default TodoInfo;
