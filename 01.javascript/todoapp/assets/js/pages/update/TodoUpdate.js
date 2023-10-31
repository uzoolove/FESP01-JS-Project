// 할일 수정
import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";
import Nav from "../../layout/nav.js";

const TodoUpdate = async function ({
  _id,
  updateTitle,
  updateContent,
  done = false,
}) {
  const page = document.createElement("div");
  page.setAttribute("id", "update");

  const content = document.createElement("div");
  content.id = "content";

  const wrapper = document.createElement("div");
  wrapper.className = "wrapper";
  content.appendChild(wrapper);

  const form = document.createElement("form");
  form.className = "form";
  wrapper.appendChild(form);

  //제목 입력창
  const titleBox = document.createElement("div");
  titleBox.className = "titleBox";
  const title = document.createElement("label");
  const titleText = document.createTextNode("제목");
  const titleInput = document.createElement("input");

  title.htmlFor = "title";
  titleInput.id = "title";
  titleInput.type = "text";
  titleInput.className = "titleInput";
  titleInput.value = updateTitle;

  form.appendChild(titleBox);
  titleBox.appendChild(title);
  title.appendChild(titleText);
  titleBox.appendChild(titleInput);

  //상세 내용
  const detailBox = document.createElement("div");
  detailBox.className = "detailBox";
  const detail = document.createElement("label");
  const detailText = document.createTextNode("상세 내용");
  const detailInput = document.createElement("textarea");
  detail.htmlFor = "detail";
  detailInput.id = "detail";
  detailInput.className = "detailInput";
  detailInput.value = updateContent;

  form.appendChild(detailBox);
  detailBox.appendChild(detail);
  detail.appendChild(detailText);
  detailBox.appendChild(detailInput);

  // 실행 여부
  const checkBox = document.createElement("div");
  checkBox.className = "executionCheck";
  const check = document.createElement("label");
  const checkText = document.createTextNode("실행여부");
  const checkInput = document.createElement("input");
  checkInput.type = "checkbox";

  form.appendChild(checkBox);
  checkBox.appendChild(check);
  check.appendChild(checkText);
  checkBox.appendChild(checkInput);
  checkInput.checked = done;

  // 체크박스 토글기능;
  checkInput.addEventListener("click", function () {
    let checked = checkInput.checked;
    if (!checked) {
      checked = true;
    } else {
      checked = false;
    }
  });

  // 수정하기 버튼
  const addButton = document.createElement("button");
  addButton.className = "addButton";
  const addText = document.createTextNode("수정 완료하기");
  addText.className = "addText";
  addButton.appendChild(addText);
  form.appendChild(addButton);

  addButton.addEventListener("click", async () => {
    response = await axios
      .patch(`http://localhost:33088/api/todolist/${_id}`, {
        title: titleInput.value,
        content: detailInput.value,
        done: checkInput.checked,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  // 삭제하기 버튼
  const deleteButton = document.createElement("button");
  deleteButton.className = "deleteButton";
  const deleteText = document.createTextNode("삭제하기");
  deleteText.className = "deleteText";
  deleteButton.appendChild(deleteText);
  form.appendChild(deleteButton);

  deleteButton.addEventListener("click", async () => {
    response = await axios
      .delete(`http://localhost:33088/api/todolist/${_id}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  page.appendChild(Nav());
  page.appendChild(Header("TodoApp 수정"));
  page.appendChild(content);
  page.appendChild(Footer());

  return page;
};
export default TodoUpdate;
