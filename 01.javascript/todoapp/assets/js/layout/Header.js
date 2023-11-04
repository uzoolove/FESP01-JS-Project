const Header = function(title){
  const headerNode = document.createElement('header');
  const h1 = document.createElement('h1');
  const headerImage = document.createElement('img');
  headerImage.setAttribute('src', 'assets/img/todo.png');
  headerImage.setAttribute('class', 'img_title');
  h1.appendChild(headerImage);
  const span = document.createElement('span');
  const headerTitle = document.createTextNode(title);
  span.appendChild(headerTitle);
  h1.appendChild(span);
  headerNode.appendChild(h1);
  return headerNode;
};

export default Header;