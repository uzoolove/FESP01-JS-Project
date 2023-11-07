import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import { linkTo } from '../../Router';
import { getTodoData, onClickEditTodo } from '../../api/todos.api';

const TodoUpdate = async (): Promise<HTMLDivElement> => {
  //NOTE - URL 매개변수에서 _id 값 추출
  const params = new URLSearchParams(location.search);
  const _id: number = parseInt(params.get('_id')!);

  //NOTE - 특정 할일의 정보 가져오기
  const todoDetail = await getTodoData(_id) as TodoItem;

  //NOTE - 페이지 요소 생성
  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  //NOTE - 수정 폼 요소 생성
  const sumbmitForm: HTMLFormElement 
  = document.createElement('form');

  const titleInput: HTMLInputElement 
  = document.createElement('input');

  const contentInput: HTMLTextAreaElement 
  = document.createElement('textarea');

  const ButtonBox: HTMLElement 
  = document.createElement('div');

  const backButton: HTMLButtonElement 
  = document.createElement('button');

  const backButtonText: Text 
  = document.createTextNode('취소');

  const submitEditButton: HTMLButtonElement 
  = document.createElement('button');

  const submitEditButtonText: Text 
  = document.createTextNode('수정');


  //NOTE - 요소에 속성 및 클래스 추가
  sumbmitForm.setAttribute('id', 'regist-form');
  titleInput.setAttribute('type', 'text');
  titleInput.setAttribute('maxLength', '24');
  titleInput.setAttribute('value', todoDetail.title);
  contentInput.textContent = todoDetail.content;

  ButtonBox.setAttribute('class', 'button-area');
  backButton.setAttribute('type', 'button');
  backButton.setAttribute('class', 'back-button');
  backButton.setAttribute('href', `info?_id=${ _id }`);

  submitEditButton.setAttribute('class', 'submit-button');
  submitEditButton.setAttribute('type', 'submit');

  //NOTE - 요소 구성
  backButton.appendChild(backButtonText);
  submitEditButton.appendChild(submitEditButtonText);
  ButtonBox.appendChild(backButton);
  ButtonBox.appendChild(submitEditButton);

  sumbmitForm.appendChild(titleInput);
  sumbmitForm.appendChild(contentInput);
  sumbmitForm.appendChild(ButtonBox);

  page.appendChild(Header('TODO 수정'));
  page.appendChild(sumbmitForm);
  page.appendChild(Footer());

  //NOTE - 폼 제출 이벤트 리스너 추가
  sumbmitForm.addEventListener('submit', (event: Event) => {
    onClickEditTodo(event, titleInput, contentInput, _id);
  });

  //NOTE - 취소 버튼 클릭 시 이벤트 설정
  backButton.addEventListener('click', (): void => {
    if (confirm('취소 하고 상세 페이지로 이동합니다')) {
      linkTo(backButton.getAttribute('href') as string);
    }
  });

  return page;
};

export default TodoUpdate;
