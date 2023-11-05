import { linkTo } from "../js/Router.js";

//NOTE - 뒤로가기 
export const onClickBackButton = () => {
  if (confirm('목록으로 이동하시겠습니까?')) {
    linkTo('/');
  }
}