// 할일 등록

const TodoRegist = function () {
  const page = document.createElement("div");
  page.setAttribute("id", "page");

  const content = document.createElement("div");
  content.id = "regist";
  const wrapper = document.createElement("div");
  wrapper.className = "wrapper";
  content.appendChild(wrapper);

  const form = document.createElement("form");
  form.className = "form";
  wrapper.appendChild(form);

  //todoApp 등록
  const headerNode = document.createElement("div");
  headerNode.className = "headerNode";
  const h1 = document.createElement("h1");
  h1.className = "h1";
  const headerTitle = document.createTextNode("TodoApp 등록");
  h1.appendChild(headerTitle);
  headerNode.appendChild(h1);
  form.appendChild(headerNode);

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

  form.appendChild(titleBox);
  titleBox.appendChild(title);
  title.appendChild(titleText);
  titleBox.appendChild(titleInput);

  //상세 내용
  const detailBox = document.createElement("div");
  detailBox.className = "detailBox";
  const detail = document.createElement("label");
  const detailText = document.createTextNode("상세 내용");
  const detailInput = document.createElement("input");
  detail.htmlFor = "detail";
  detailInput.id = "detail";
  detailInput.type = "textarea";
  detailInput.className = "detailInput";

  form.appendChild(detailBox);
  detailBox.appendChild(detail);
  detail.appendChild(detailText);
  detailBox.appendChild(detailInput);

  // 추가하기 버튼
  const addButton = document.createElement("button");
  addButton.className = "addButton";
  const addText = document.createTextNode("추가하기");
  addText.className = "addText";
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

  page.appendChild(content);

  return page;
};

export default TodoRegist;
