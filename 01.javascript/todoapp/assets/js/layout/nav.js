const Nav = function () {
  const navNode = document.createElement("nav");
  const arrowBack = document.createElement("i");
  arrowBack.className = "fa-solid fa-arrow-left";
  arrowBack.addEventListener("click", () => {
    window.history.back();
  });

  navNode.appendChild(arrowBack);
  return navNode;
};
export default Nav;
