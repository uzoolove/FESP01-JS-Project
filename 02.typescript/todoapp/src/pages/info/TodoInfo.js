// 할일 등록
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';

const TodoInfo = async function(){
  const params = new URLSearchParams(location.search);
  const _id = params.get('_id');

  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  const content = document.createElement('div');
  const text = document.createTextNode(`_id=${_id} 상세 조회 화면`);
  content.appendChild(text);

  page.appendChild(Header('상세 조회'));
  page.appendChild(content);
  page.appendChild(Footer());

  return page;
};

export default TodoInfo;