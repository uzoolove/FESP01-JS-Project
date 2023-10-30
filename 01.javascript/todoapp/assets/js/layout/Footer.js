const Footer = function () {
  //인자를 받지 않는 함수, 여기서 수정할 것
  const footerNode = document.createElement("footer");
  const pNode = document.createElement("p");
  const content = document.createTextNode("FESP 1기 미니 프로젝트- TODO List");
  pNode.appendChild(content);
  footerNode.appendChild(pNode);
  return footerNode;
};

export default Footer;
