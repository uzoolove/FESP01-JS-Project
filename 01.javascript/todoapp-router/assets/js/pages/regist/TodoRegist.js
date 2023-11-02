// 할일 등록
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import { linkTo } from '../../Router.js';

//NOTE - 조회 , 등록 , 체크 , 삭제 기능 코드 컨벤션, 스타일까지 완료 
//TODO - 상세 페이지 만들고 수정 페이지 등록 페이지(스타일) 

const TodoRegist = () => {

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

      if (response) {
        todoTitleInput.value = "";
        todoContentInput.value = "";
        linkTo('/');
      }
    }
    catch (err) {
      console.log(err);
    }
}


  const BASE_URL = 'http://localhost:33088';

  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  const sumbmitForm = document.createElement('form');
  const todoTitleInput = document.createElement('input');
  const todoContentInput = document.createElement('textarea');
  const submitRegisterButton = document.createElement('button');
  const buttonText = document.createTextNode('할일 추가');

  todoTitleInput.setAttribute('type', 'text');
  todoTitleInput.setAttribute('placeholder', '할일 제목');
  todoContentInput.setAttribute('placeholder', '할일 내용');
  

  sumbmitForm.addEventListener('submit', onSubmitTodoRegister);


  sumbmitForm.appendChild(todoTitleInput);
  sumbmitForm.appendChild(todoContentInput);
  sumbmitForm.appendChild(submitRegisterButton);
  submitRegisterButton.appendChild(buttonText);

  page.appendChild(Header('TODO App 등록'));
  page.appendChild(sumbmitForm);
  page.appendChild(Footer());

  return page;
};

export default TodoRegist;