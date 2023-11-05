// 할일 등록
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import { linkTo } from '../../Router.js';
import { onSubmitTodoRegister } from '../../../api/todos.api.js';



  const TodoRegist = () => {

  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  const sumbmitForm = document.createElement('form');
  const titleInput = document.createElement('input');
  const contentInput = document.createElement('textarea');
  const registButtonBox = document.createElement('div');
  const backButton = document.createElement('button');
  const submitRegisterButton = document.createElement('button');
  const backButtonText = document.createTextNode('취소');
  const submitRegisterButtonText = document.createTextNode('등록');


  sumbmitForm.setAttribute('id', 'regist-form');
  titleInput.setAttribute('type', 'text');
  titleInput.setAttribute('placeholder', '할일 제목');
  contentInput.setAttribute('placeholder', '할일 내용');
  registButtonBox.setAttribute('class', 'button-area');
  backButton.setAttribute('type', 'button');
  backButton.setAttribute('class', 'back-button');
  submitRegisterButton.setAttribute('class', 'submit-button');


  sumbmitForm.appendChild(titleInput);
  sumbmitForm.appendChild(contentInput);

  backButton.appendChild(backButtonText);
  submitRegisterButton.appendChild(submitRegisterButtonText);
  registButtonBox.appendChild(backButton);
  registButtonBox.appendChild(submitRegisterButton);

  sumbmitForm.appendChild(registButtonBox);
  page.appendChild(Header('TODO 등록'));
  page.appendChild(sumbmitForm);
  page.appendChild(Footer());


  sumbmitForm.addEventListener('submit', (event) => {
    onSubmitTodoRegister(event, titleInput, contentInput);
  });
  backButton.addEventListener('click', () => {
    if (confirm('취소 하시겠습니까?')) {
      linkTo('/');
    }
  });

  return page;
};

export default TodoRegist;