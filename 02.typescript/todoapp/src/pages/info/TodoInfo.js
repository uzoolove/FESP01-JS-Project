import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { linkTo } from "../../Router";
import { getTodoData, onClickDeleteInInfo } from "../../api/todos.api.js";

const TodoInfo = async () => {
  //NOTE - 페이지 요소 생성
  const page = document.createElement("div");
  page.setAttribute("id", "page");

  //NOTE - URL 매개변수에서 _id 값 추출
  const params = new URLSearchParams(location.search);
  const _id = params.get("_id");

  //NOTE - 페이지 내용 요소 생성
  const content = document.createElement("div");
  const detailContainer = document.createElement("div");
  const detailTitleArea = document.createElement("div");
  const detailContentArea = document.createElement("div");
  const buttonArea = document.createElement("div");

  //NOTE - 뒤로가기 버튼 생성
  const backButton = document.createElement("button");
  const backButtonText = document.createTextNode("뒤로가기");

  //NOTE - 수정하기 버튼 생성
  const toEditButton = document.createElement("button");
  const toEditButtonText = document.createTextNode("수정하기");

  //NOTE - 삭제 버튼 생성
  const deleteButton = document.createElement("button");
  const deleteButtonText = document.createTextNode("삭제");

  //NOTE - 요소에 클래스 및 속성 추가
  content.setAttribute("class", "todo-detail-container");
  detailContainer.setAttribute("class", "todo-detail-form");
  detailTitleArea.setAttribute("class", "detail-title-area");
  detailContentArea.setAttribute("class", "detail-content-area");

  buttonArea.setAttribute("class", "button-area");
  backButton.setAttribute("class", "back-button");
  deleteButton.setAttribute("class", "submit-button");
  toEditButton.setAttribute("class", "submit-button");

  //NOTE - 할일 상세 정보 렌더링 함수
  const toDoDetailRender = async (data) => {
    //NOTE - 키 이름 대체 매핑 객체
    const substituteKeyNames = {
      title: "제목",
      content: "내용",
      createdAt: "생성일",
      updatedAt: "수정일",
    };

    //NOTE - 데이터 객체를 순회하며 상세 정보 행 생성
    for (const [key, item] of Object.entries(data)) {
      if (substituteKeyNames[key]) {
        const substituteKeyName = substituteKeyNames[key];

        const detailRow = document.createElement("div");
        detailRow.setAttribute("id", "detail-row");

        const detailTitleBox = document.createElement("div");
        detailTitleBox.setAttribute("class", "detail-title-content");

        const detailTitle = document.createElement("h3");
        const titleText = document.createTextNode(`${substituteKeyName}`);

        detailTitle.appendChild(titleText);
        detailTitleBox.appendChild(detailTitle);

        const detailContentBox = document.createElement("div");
        detailContentBox.setAttribute("class", "detail-title-content contentText");

        const detailContent = document.createElement("span");
        const contentText = document.createTextNode(`${item}`);

        detailContent.appendChild(contentText);
        detailContentBox.appendChild(detailContent);
        detailRow.appendChild(detailTitleBox);
        detailRow.appendChild(detailContentBox);

        detailContainer.appendChild(detailRow);
      }
    }
  };

  //NOTE - 할일 데이터 가져오기 및 상세 정보 렌더링
  const todoData = await getTodoData(_id);
  await toDoDetailRender(todoData);

  //NOTE - 버튼에 이벤트 리스너 추가
  backButton.appendChild(backButtonText);
  buttonArea.appendChild(backButton);
  toEditButton.appendChild(toEditButtonText);
  buttonArea.appendChild(toEditButton);
  deleteButton.appendChild(deleteButtonText);
  buttonArea.appendChild(deleteButton);

  //NOTE - 요소들을 페이지에 추가
  content.appendChild(detailContainer);
  content.appendChild(buttonArea);

  page.appendChild(Header("TODO 상세 페이지"));
  page.appendChild(content);
  page.appendChild(Footer());

  //NOTE - 버튼 클릭 시 동작 설정
  backButton.addEventListener("click", () => linkTo("/"));
  toEditButton.addEventListener("click", () => linkTo(`/update?_id=${_id}`));
  deleteButton.addEventListener("click", () => {
    onClickDeleteInInfo(_id);
  });

  return page;
};

export default TodoInfo;
