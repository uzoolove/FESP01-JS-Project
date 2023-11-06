import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import { linkTo } from '../../Router';
<<<<<<< HEAD
import { getTodoList, onChangeCheckbox, onClickDeleteTodo } from '../../api/todos.api';
import './TodoList.css'
import axios from 'axios';
=======
import { 
  getTodoList, 
  onChangeCheckbox, 
  onClickDeleteTodo } from '../../api/todos.api';

>>>>>>> 04b8bbb3c18cb09f6494dd2637ed1ab1e8fe61b0


const TodoList = async (): Promise<HTMLDivElement> => {
  //NOTE - 페이지 요소 생성
  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  //NOTE - 내용 요소 생성
  const content = document.createElement('div');
  content.setAttribute('id', 'content');

  //NOTE - 할일 목록을 담을 ul 요소 생성
  const ul = document.createElement('ul');
  ul.setAttribute('class', 'todo-list');

  //NOTE - 할일 등록 버튼 생성
  const registButton = document.createElement('button');
  const buttonTitle = document.createTextNode('+');
  registButton.setAttribute('id', 'regist-button');

  try {
    //NOTE - 할일 목록 가져오기
    const response = await getTodoList();

    //NOTE - 할일 목록을 순회하며 요소 생성
    response.data?.items.map((todo: TodoItem) => {

      const li = document.createElement('li');
      const checkbox = document.createElement('input');
      const todoInfoLink = document.createElement('h3');
      const title = document.createTextNode(todo.title);
      todoInfoLink.appendChild(title);
      const deleteButton = document.createElement('i');

      //NOTE - 요소에 속성 및 클래스 추가
      li.setAttribute('id', `${ todo._id }`);
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('id', `checkbox_${ todo._id }`);
      todoInfoLink.setAttribute('href', `info?_id=${ todo._id }`);
      deleteButton.setAttribute('class', 'fa-regular fa-trash-can');

      //NOTE - 요소 구성
      li.appendChild(checkbox);
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
      checkbox.addEventListener('change', (event) => {
        onChangeCheckbox(event, checkbox, todo);
      });

      //NOTE - 할일 상세 정보 페이지로 이동하는 이벤트 리스너 추가
      todoInfoLink.addEventListener('click', (event) => {
        event.preventDefault();
        linkTo(todoInfoLink.getAttribute('href') as string);
      });

      //NOTE - 할일 삭제 이벤트 리스너 추가
      deleteButton.addEventListener('click', () => {
        onClickDeleteTodo(todo._id, li);
      });
    });


    //NOTE - 할일 등록 버튼 클릭 시 이벤트 설정
    registButton.addEventListener('click', () => {
      return linkTo('/regist' as string);
    });
  } catch (error) {
    console.log(error);
  }

  //NOTE - 요소들을 페이지에 추가
  content.appendChild(ul);
  registButton.appendChild(buttonTitle);
  content.appendChild(registButton);

  //NOTE - 페이지 구성
  page.appendChild(Header('TODO'));
  page.appendChild(content);
  page.appendChild(Footer());

  return page;
};

export default TodoList;
