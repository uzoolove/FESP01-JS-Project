// 할일 등록
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';

const TodoInfo = async function({_id} = {}){
  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  const BASE_URL = 'http://localhost:33088';
  let response = await axios(`${ BASE_URL }/api/todolist/${_id}`)
  console.log(response)
  const data = response.data.item

  const content = document.createElement('div');
  console.log(data)

  for (let key in data){
    let item = data[key]
    const text = document.createTextNode(`${item}`);
    content.appendChild(text)
  }

  page.appendChild(Header('TODO App 상세 조회'));
  page.appendChild(content);
  page.appendChild(Footer());

  return page;
};

export default TodoInfo;