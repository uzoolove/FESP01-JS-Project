// 할일 목록
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import { linkTo } from '../../Router.js';
import { 
  getTodoList,
  onChangeCheckbox, 
  onClickDeleteTodo
} from '../../api/todos.api.js';



const TodoList = async () => {

  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  const content = document.createElement('div');
  content.setAttribute('id', 'content');

  const ul = document.createElement('ul');
  ul.setAttribute('class', 'todolist');

  const registButton = document.createElement('button');
  const buttonTitle = document.createTextNode('+');
  registButton.setAttribute('id', 'regist-button');

  try {
    const response = await getTodoList();

    response.data?.items.map((todo) => {

      const li = document.createElement('li');
      const checkbox = document.createElement('input');
      const todoInfoLink = document.createElement('h4');
      const title = document.createTextNode(todo.title);
      const deleteButton = document.createElement('i');

      li.setAttribute('id', `${ todo._id }`);
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('id', `checkbox_${ todo._id }`);
      todoInfoLink.setAttribute('href', `info?_id=${ todo._id }`);
      deleteButton.setAttribute('class', 'fa-regular fa-trash-can');


      li.appendChild(checkbox);
      todoInfoLink.appendChild(title);
      li.appendChild(todoInfoLink);
      li.appendChild(deleteButton);
      ul.appendChild(li);


      checkbox.checked = todo.done;

      if (todo.done) {
        todoInfoLink.classList.add('line-through');
      }


      checkbox.addEventListener('change', (event) => {
        onChangeCheckbox(event, checkbox, todo);
      });


      todoInfoLink.addEventListener('click', (event) => {
        event.preventDefault();
        linkTo(todoInfoLink.getAttribute('href'));
      });


      deleteButton.addEventListener('click', () => {
        onClickDeleteTodo(todo._id, li);
      });
    });


    content.appendChild(ul);
    registButton.appendChild(buttonTitle);
    content.appendChild(registButton);


    registButton.addEventListener('click', () => {
      return linkTo('/regist');
    });
  }
  catch (error) {
    console.log(error);
  }

  page.appendChild(Header('TODO'));
  page.appendChild(content);
  page.appendChild(Footer());

  return page;
};

export default TodoList;