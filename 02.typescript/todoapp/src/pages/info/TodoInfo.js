// 할일 등록
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import TodoUpdate from "../update/TodoUpdate";
import Nav from "../../layout/Nav";

const TodoInfo = async function ({ _id } = {}) {
  const page = document.createElement("div");
  page.setAttribute("id", "todoInfo");
  page.id = "todoInfo";

  // const topSection = document.createElement("div");
  // topSection.className = "topSection";
  // page.appendChild(topSection);

  const previousButton = document.createElement("button");
  const previousIcon = document.createElement("i");
  previousButton.className = "prevButton";
  previousIcon.className = "fa-solid fa-angle-left fa-xl";
  // topSection.appendChild(previousButton);
  previousButton.appendChild(previousIcon);

  const content = document.createElement("dl");

  let response;

  try {
    response = await axios(`http://localhost:33088/api/todolist/${_id}`);

    console.log("todoinfo", response.data.item);

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

    modifyButton.addEventListener("click", async () => {
      const updatePage = await TodoUpdate({
        _id: response.data.item._id,
        updateTitle: response.data.item.title,
        updateContent: response.data.item.content,
        done: response.data.item.done,
      });
      document.querySelector("#todoInfo").replaceWith(updatePage);
    });
  } catch (error) {
    console.error("오류가 발생했습니다.");
  }

  page.appendChild(Nav());
  page.appendChild(Header("TODO App 상세 조회"));
  page.appendChild(content);
  page.appendChild(Footer());

  return page;
};

export default TodoInfo;
