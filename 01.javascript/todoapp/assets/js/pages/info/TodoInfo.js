// 할일 등록
import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";

const TodoInfo = async function ({ _id } = {}) {
  const page = document.createElement("div");
  page.setAttribute("id", "page");
  page.id = "todoInfo";

  const topSection = document.createElement("div");
  topSection.className = "topSection";
  page.appendChild(topSection);

  const previousButton = document.createElement("button");
  const previousText = document.createTextNode("<");
  // previousButton.innerHTML = '<i class="fa-solid fa-angle-left"></i>';
  topSection.appendChild(previousButton);
  previousButton.appendChild(previousText);
  previousButton.className = "prevButton";

  const content = document.createElement("dl");

  let response;

  try {
    response = await axios(`http://localhost:33088/api/todolist/${_id}`);
    console.log(response);

    const title = document.createElement("dt");
    const titleText = document.createTextNode("제목");
    const todoContent = document.createElement("dd");
    const titleTodo = document.createTextNode(response.data.item.title);

    title.className = "todoListTitle";
    todoContent.className = "todoList";

    content.appendChild(title);
    content.appendChild(todoContent);
    title.appendChild(titleText);
    todoContent.appendChild(titleTodo);

    const detail = document.createElement("dt");
    const detailText = document.createTextNode("상세 내용");
    const detailContent = document.createElement("dd");
    const detailTodo = document.createTextNode(response.data.item.content);

    detail.className = "todoListTitle";
    detailContent.className = "todoList , detailContent";

    content.appendChild(detail);
    content.appendChild(detailContent);
    detail.appendChild(detailText);
    detailContent.appendChild(detailTodo);

    const modifyButton = document.createElement("button");
    const modifyButtonText = document.createTextNode("수정하기");

    modifyButton.className = "modifyButton";

    content.appendChild(modifyButton);
    modifyButton.appendChild(modifyButtonText);
  } catch (error) {
    console.error("오류가 발생했습니다.");
  }

  page.appendChild(Header("TODO App 상세 조회"));
  const pageTitle = document.querySelector("h1");
  pageTitle.className = "pageTitle";
  // pageTitle.ariaHidden = true;

  page.appendChild(content);
  page.appendChild(Footer());

  return page;
};

export default TodoInfo;
