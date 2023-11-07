import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import { linkTo } from '../../Router';
import { 
  getTodoList, 
  onChangeCheckbox, 
  onClickDeleteTodo 
} from '../../api/todos.api';

const TodoList = async (): Promise<HTMLDivElement> => {
  //NOTE - 페이지 요소 생성
  const page: HTMLDivElement 
  = document.createElement('div');
  page.setAttribute('id', 'page');

  //NOTE - 내용 요소 생성
  const content: HTMLDivElement 
  = document.createElement('div');
  content.setAttribute('id', 'content');

  //NOTE - 할일 목록을 담을 ul 요소 생성
  const ul: HTMLUListElement 
  = document.createElement('ul');
  ul.setAttribute('class', 'todo-list');

  //NOTE - 할일 등록 버튼 생성
  const registButton: HTMLButtonElement 
  = document.createElement('button');
  registButton.setAttribute('id', 'regist-button');

  const buttonTitle: Text 
  = document.createTextNode('+');
  registButton.appendChild(buttonTitle);


  try {
    //NOTE - 할일 목록 가져오기
    const response = await getTodoList() as TodoItem[];

    //NOTE - 할일 목록을 순회하며 요소 생성
    response?.map((todo: TodoItem): void => {

      const TODO_ID: number = todo._id;

      const li: HTMLLIElement 
      = document.createElement('li');

      const checkbox: HTMLInputElement 
      = document.createElement('input');

      const todoInfoLink: HTMLAnchorElement 
      = document.createElement('a');

      const title: Text 
      = document.createTextNode(todo.title);

      const deleteButton: HTMLElement 
      = document.createElement('i');

      //NOTE - 요소에 속성 및 클래스 추가
      li.setAttribute('id', `${ TODO_ID }`);
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('id', `checkbox_${ TODO_ID }`);
      todoInfoLink.setAttribute('href', `info?_id=${ TODO_ID }`);
      deleteButton.setAttribute('class', 'fa-regular fa-trash-can');

      //NOTE - 요소 구성
      li.appendChild(checkbox);
      todoInfoLink.appendChild(title);
      li.appendChild(todoInfoLink);
      li.appendChild(deleteButton);
      ul.appendChild(li);

      //NOTE - 체크박스 디폴트 상태 설정
      checkbox.checked = todo.done;

      //NOTE - 완료된 할일에는 취소선 추가
      if (todo.done) {
        todoInfoLink.classList.add('line-through');
      }

      //NOTE - 체크박스 변경 이벤트 리스너 추가
      checkbox.addEventListener('change', (event: Event) => {
        onChangeCheckbox(
          event, 
          checkbox , 
          todo as TodoItem);
      });

      //NOTE - 할일 상세 정보 페이지로 이동하는 이벤트 리스너 추가
      todoInfoLink.addEventListener('click', (event: Event) => {
        event.preventDefault();
        linkTo(todoInfoLink.getAttribute('href') as string);
      });

      //NOTE - 할일 삭제 이벤트 리스너 추가
      deleteButton.addEventListener('click', () => {
        onClickDeleteTodo(TODO_ID , li)
      });
    });

    //NOTE - 할일 등록 버튼 클릭 시 이벤트 설정
    registButton.addEventListener('click', () => {
      linkTo('/regist');
    });
  } 
  catch (error) {
    console.log(error);
  }

  //NOTE - 요소들을 페이지에 추가
  content.appendChild(ul);
  content.appendChild(registButton);

  //NOTE - 페이지 구성
  page.appendChild(Header('TODO'));
  page.appendChild(content);
  page.appendChild(Footer());

  return page;
};

export default TodoList;
