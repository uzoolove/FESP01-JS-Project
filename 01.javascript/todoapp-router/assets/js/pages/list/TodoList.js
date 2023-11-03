// 할일 목록
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import { linkTo } from '../../Router.js';



const TodoList = async () => {

  const BASE_URL = 'http://localhost:33088';

  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  const content = document.createElement('div');
  content.setAttribute('id', 'content');

  const ul = document.createElement('ul');
  ul.setAttribute('class', 'todolist');

  try {    
    const response = await axios.get(`${ BASE_URL }/api/todolist`);

    response.data?.items.map((todo) => {

      const onChangeCheckbox = async (event) => {

        const isChecked = checkbox.checked;

        try {
          const response = 
          await axios
          .patch(`${ BASE_URL }/api/todolist/${ todo._id }`, 
          { done: isChecked });

          if (response) {
            const NEXT_SIBLING = event.target.nextSibling;

            todo.done = isChecked;

            if (isChecked) {
              todo.done = false;
              NEXT_SIBLING.classList.add('line-through');
            } 
            else {
              todo.done = true;
              NEXT_SIBLING.classList.remove('line-through');
            }
          }
        } 
        catch (error) {
          console.error('API 업데이트에 실패했습니다:', error);
        }
      }

      const onClickDeleteTodo =  async () => {
        try {
          if (confirm('정말 삭제 하시겠습니까?')) {
            const response = 
            await axios
            .delete(`${BASE_URL}/api/todolist/${ todo._id }`);

            if (response) {
              li.remove();
            }
          }
        } 
        catch (error) {
          console.error('API 삭제에 실패했습니다:', error);
        }
      }


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


      checkbox.checked = todo.done;

      if (todo.done) {
        todoInfoLink.classList.add('line-through');
      }

      checkbox.addEventListener('change', onChangeCheckbox);

      todoInfoLink.addEventListener('click', (event) => {
        event.preventDefault();
        linkTo(todoInfoLink.getAttribute('href'));
      });

      deleteButton.addEventListener('click', onClickDeleteTodo);


      li.appendChild(checkbox);
      todoInfoLink.appendChild(title);
      li.appendChild(todoInfoLink);
      li.appendChild(deleteButton);
      ul.appendChild(li);
    });

    content.appendChild(ul);

    const registButton = document.createElement('button');
    const buttonTitle = document.createTextNode('+');

    registButton.setAttribute('id', 'regist-button');


    registButton.appendChild(buttonTitle);
    content.appendChild(registButton);

    registButton.addEventListener('click', () => {
      linkTo('/regist');
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