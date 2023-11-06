import TodoList from "./pages/list/TodoList.js";
import TodoRegist from "./pages/regist/TodoRegist.js";
import TodoInfo from "./pages/info/TodoInfo.ts";
import TodoUpdate from "./pages/update/TodoUpdate.ts";
import Error404 from "./pages/errors/Error404.js";

async function getPage(): Promise<HTMLElement> {
  let page: HTMLElement;
  switch (location.pathname) {
    case "/":
      page = await TodoList();
      break;
    case "/regist":
      page = TodoRegist();
      break;
    case "/info":
      page = await TodoInfo();
      break;
    case "/update":
      page = await TodoUpdate();
      break;
    default:
      page = Error404();
      break;
  }

  return page;
}

async function render(): Promise<void> {
  const page = await getPage();
  const pageElement = document.querySelector("#app");
  if (pageElement && page) {
    pageElement.replaceWith(page); 
  }
}

window.addEventListener("popstate", async () => {
  await render();
});

export function linkTo(url: string): void {
  history.pushState({}, "todo", url);
  render();
}

const Router: () => Promise<HTMLElement> = async () => {
  return await getPage();
};

export default Router;
