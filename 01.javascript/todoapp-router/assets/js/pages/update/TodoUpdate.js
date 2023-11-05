// 할일 수정
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import { linkTo } from '../../Router.js';
import { getTodoData, onClickEditTodo } from '../../../api/todos.api.js';



const TodoUpdate = async () => {

  const params = new URLSearchParams(location.search);
  const _id = params.get('_id');


  const todoDetail = await getTodoData(_id);

  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  const sumbmitForm = document.createElement('form');
  const titleInput = document.createElement('input');
  const contentInput = document.createElement('textarea');
  const registButtonBox = document.createElement('div');
  const backButton = document.createElement('button');
  const submitRegisterButton = document.createElement('button');
  const backButtonText = document.createTextNode('취소');
  const submitRegisterButtonText = document.createTextNode('수정');

  sumbmitForm.setAttribute('id', 'regist-form');
  titleInput.setAttribute('type', 'text');
  titleInput.setAttribute('value', todoDetail.title);
  titleInput.setAttribute('name', todoDetail.title);
  contentInput.setAttribute('name', todoDetail.content);
  contentInput.textContent = todoDetail.content;
  registButtonBox.setAttribute('class', 'button-area');
  backButton.setAttribute('type', 'button');
  backButton.setAttribute('class', 'back-button');
  backButton.setAttribute('href', `info?_id=${ _id }`);
  submitRegisterButton.setAttribute('class', 'submit-button');

  sumbmitForm.appendChild(titleInput);
  sumbmitForm.appendChild(contentInput);

  backButton.appendChild(backButtonText);
  submitRegisterButton.appendChild(submitRegisterButtonText);
  registButtonBox.appendChild(backButton);
  registButtonBox.appendChild(submitRegisterButton);

  sumbmitForm.appendChild(registButtonBox);
  page.appendChild(Header('TODO 수정'));
  page.appendChild(sumbmitForm);
  page.appendChild(Footer());



  sumbmitForm.addEventListener('submit', (event) => {
    onClickEditTodo(event, titleInput, contentInput, _id, backButton);
  });

  backButton.addEventListener('click', () => {
    if (confirm('취소 하고 상세 페이지로 이동합니다')) {
      linkTo(backButton.getAttribute('href'));
    }

  });

  return page;
};

export default TodoUpdate;