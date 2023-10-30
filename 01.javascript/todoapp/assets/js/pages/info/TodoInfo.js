// 할일 등록
import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";

const TodoInfo = async function ({ _id } = {}) {
  const page = document.createElement("div");
  page.setAttribute("id", "page");

  const BASE_URL = "http://localhost:33088";
  let response = await axios(`${BASE_URL}/api/todolist/${_id}`);
  console.log(response);
  const data = response.data.item;

  const content = document.createElement("div");
  console.log(data);

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

  content.appendChild(ul1);
  content.appendChild(ul2);

  content.style.display = "flex";
  content.style.flexDirection = "row";
  content.style.gap = "20px";

  page.appendChild(Header("TODO App 상세 조회"));
  page.appendChild(content);
  page.appendChild(Footer());

  return page;
};

export default TodoInfo;
