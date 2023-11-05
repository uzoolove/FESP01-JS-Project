import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import { linkTo } from '../../Router.js';
import { onSubmitTodoRegister } from '../../api/todos.api.js';

const TodoRegist = () => {
  //NOTE - 페이지 요소 생성
  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  //NOTE - 등록 폼 요소 생성
  const RegistForm = document.createElement('form');
  const titleInput = document.createElement('input');
  const contentInput = document.createElement('textarea');
  const ButtonBox = document.createElement('div');
  const backButton = document.createElement('button');
  const backButtonText = document.createTextNode('취소');
  const submitRegisterButton = document.createElement('button');
  const submitRegisterButtonText = document.createTextNode('등록');

  //NOTE - 요소에 속성 및 클래스 추가
  RegistForm.setAttribute('id', 'regist-form');
  titleInput.setAttribute('type', 'text');
  titleInput.setAttribute('placeholder', '할일 제목');
  contentInput.setAttribute('placeholder', '할일 내용');

  ButtonBox.setAttribute('class', 'button-area');
  backButton.setAttribute('type', 'button');
  backButton.setAttribute('class', 'back-button');
  submitRegisterButton.setAttribute('class', 'submit-button');

  //NOTE - 요소 구성
  backButton.appendChild(backButtonText);
  submitRegisterButton.appendChild(submitRegisterButtonText);
  ButtonBox.appendChild(backButton);
  ButtonBox.appendChild(submitRegisterButton);

  RegistForm.appendChild(titleInput);
  RegistForm.appendChild(contentInput);
  RegistForm.appendChild(ButtonBox);

  page.appendChild(Header('TODO 등록'));
  page.appendChild(RegistForm);
  page.appendChild(Footer());

  //NOTE - 폼 제출 이벤트 리스너 추가
  RegistForm.addEventListener('submit', (event) => {
    onSubmitTodoRegister(event, titleInput, contentInput);
  });

  //NOTE - 취소 버튼 클릭 시 이벤트 설정
  backButton.addEventListener('click', () => {
    if (confirm('취소 하시겠습니까?')) {
      linkTo('/');
    }
  });

  return page;
};

export default TodoRegist;
