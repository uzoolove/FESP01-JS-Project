// 할일 등록
import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";

const TodoRegist = function () {
  const page = document.createElement("div");
  page.setAttribute("id", "page");

  const content = document.createElement("div");
  const form = document.createElement("form");

  content.appendChild(form);

  const title = document.createElement("label");
  const titleText = document.createTextNode("제목");
  const titleInput = document.createElement("input");
  title.htmlFor = "title";
  titleInput.id = "title";
  titleInput.type = "text";

  const detail = document.createElement("label");
  const detailText = document.createTextNode("상세 내용");
  const detailInput = document.createElement("input");
  detail.htmlFor = "detail";
  detailInput.id = "detail";
  detailInput.type = "text";

  form.appendChild(title);
  title.appendChild(titleText);
  form.appendChild(titleInput);
  form.appendChild(detail);
  detail.appendChild(detailText);
  form.appendChild(detailInput);

  const addButton = document.createElement("button");
  const addText = document.createTextNode("추가하기");
  addButton.appendChild(addText);
  form.appendChild(addButton);

  addButton.addEventListener("click", async () => {
    response = await axios
      .post("http://localhost:33088/api/todolist", {
        title: titleInput.value,
        content: detailInput.value,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  page.appendChild(Header("TODO App 등록"));
  page.appendChild(content);
  page.appendChild(Footer());

  return page;
};

export default TodoRegist;
