// 할일 등록
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import { linkTo } from '../../Router.js';
import { onClickBackButton } from '../../utill.js';

//NOTE - 조회 , 등록 , 체크 , 삭제 기능 코드 컨벤션, 스타일까지 완료 
//TODO - 상세 페이지 만들고 수정 페이지 등록 페이지(스타일) 

const TodoRegist = () => {

  const BASE_URL = 'http://localhost:33088';

  const onSubmitTodoRegister = async (event) => {
    event.preventDefault();

    if (todoTitleInput.value === '' || todoContentInput.value === '') {
        alert("할일을 입력하세요^^");
        return;
    }

    const body = {
      title: todoTitleInput.value,
      content: todoContentInput.value,
      done: false
    }

    try {
      const response = 
      await axios.post(`${ BASE_URL }/api/todolist`, body);

      if (confirm('등록 하시겠습니까?')) {
        if (response) {
          linkTo('/');
        }
      }
    }
    catch (err) {
      console.log(err);
    }
}


  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  const sumbmitForm = document.createElement('form');
  const todoTitleInput = document.createElement('input');
  const todoContentInput = document.createElement('textarea');
  const registButtonBox = document.createElement('div');
  const backButton = document.createElement('button');
  const submitRegisterButton = document.createElement('button');
  const backButtonText = document.createTextNode('취소');
  const submitRegisterButtonText = document.createTextNode('등록');


  sumbmitForm.setAttribute('id', 'regist-form');
  todoTitleInput.setAttribute('type', 'text');
  todoTitleInput.setAttribute('placeholder', '할일 제목');
  todoContentInput.setAttribute('placeholder', '할일 내용');
  registButtonBox.setAttribute('id', 'regist-button-box');
  backButton.setAttribute('type', 'button');
  backButton.setAttribute('class', 'back-button');
  submitRegisterButton.setAttribute('class', 'submit-button');


  backButton.appendChild(backButtonText);
  submitRegisterButton.appendChild(submitRegisterButtonText);
  registButtonBox.appendChild(backButton);
  registButtonBox.appendChild(submitRegisterButton);
  sumbmitForm.appendChild(todoTitleInput);
  sumbmitForm.appendChild(todoContentInput);
  sumbmitForm.appendChild(registButtonBox);
  page.appendChild(Header('TODO 등록'));
  page.appendChild(sumbmitForm);
  page.appendChild(Footer());


  sumbmitForm.addEventListener('submit', onSubmitTodoRegister);
  backButton.addEventListener('click', onClickBackButton);

  return page;
};

export default TodoRegist;