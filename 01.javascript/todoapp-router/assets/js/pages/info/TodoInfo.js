// / 할일 등록
import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";
import { linkTo } from "../../Router.js";
import { 
  getTodoData, 
  onClickDeleteInInfo } 
  from "../../api/todos.api.js";



const TodoInfo = async () => {

  const page = document.createElement("div");
  page.setAttribute("id", "page");

  const params = new URLSearchParams(location.search);
  const _id = params.get('_id');


  const content = document.createElement("div");
  const detailContainer = document.createElement("div");
  const detailTitleArea = document.createElement("div");
  const detailContentArea = document.createElement("div");
  const buttonArea = document.createElement("div");

  const backButton = document.createElement("button");
  const backButtonText = document.createTextNode("뒤로가기");

  const toEditButton = document.createElement("button");
  const toEditButtonText = document.createTextNode("수정하기");

  const deleteButton = document.createElement("button");
  const deleteButtonText = document.createTextNode("삭제");


  content.setAttribute("class", "todo-detail-container");
  detailContainer.setAttribute("class", "todo-detail-form");
  detailTitleArea.setAttribute("class", "detail-title-area");
  detailContentArea.setAttribute("class", "detail-content-area");
  buttonArea.setAttribute("class", "button-area");
  backButton.setAttribute("class", "back-button");
  deleteButton.setAttribute("class", "submit-button");
  toEditButton.setAttribute("class", "submit-button");


  const toDoDetailRender = async (data) => {

    const substituteKeyNames = {
      title: "제목",
      content: "내용",
      createdAt: "생성일",
      updatedAt: "수정일",
    }


    for (const [key, item] of Object.entries(data)) {
      if (substituteKeyNames[key]) {
        const substituteKeyName = substituteKeyNames[key];

        const detailRow = document.createElement('div');
        detailRow.setAttribute('id', 'detail-row');

        const detailTitleBox = document.createElement("div");
        detailTitleBox.setAttribute('class', 'detail-title-content');

        const detailTitle = document.createElement("h3");
        const titleText = document.createTextNode(`${ substituteKeyName }`);

        detailTitle.appendChild(titleText);
        detailTitleBox.appendChild(detailTitle);

        const detailContentBox = document.createElement("div");
        detailContentBox.setAttribute('class', 'detail-title-content contentText');

        const detailContent = document.createElement("span");
        const contentText = document.createTextNode(`${ item }`);

        detailContent.appendChild(contentText);
        detailContentBox.appendChild(detailContent);
        detailRow.appendChild(detailTitleBox);
        detailRow.appendChild(detailContentBox);

        detailContainer.appendChild(detailRow);
      }
    }
  }


  const todoData = await getTodoData(_id);
  await toDoDetailRender(todoData);


  backButton.appendChild(backButtonText);
  buttonArea.appendChild(backButton);
  toEditButton.appendChild(toEditButtonText);
  buttonArea.appendChild(toEditButton);
  deleteButton.appendChild(deleteButtonText);
  buttonArea.appendChild(deleteButton);

  content.appendChild(detailContainer);
  content.appendChild(buttonArea);

  page.appendChild(Header("TODO 상세 페이지"));
  page.appendChild(content);
  page.appendChild(Footer());


  backButton.addEventListener("click", () => linkTo('/'));
  toEditButton.addEventListener("click", () => linkTo(`/update?_id=${ _id }`));
  deleteButton.addEventListener("click", () => {
    onClickDeleteInInfo(_id);
  });


  return page;
};

export default TodoInfo;


