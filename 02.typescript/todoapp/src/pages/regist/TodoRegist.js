// 할일 등록
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';

const TodoRegist = function(){
  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  const content = document.createElement('div');
  const text = document.createTextNode('등록 화면');
  content.appendChild(text);

  page.appendChild(Header('등록'));
  page.appendChild(content);
  page.appendChild(Footer());

  return page;
};

export default TodoRegist;