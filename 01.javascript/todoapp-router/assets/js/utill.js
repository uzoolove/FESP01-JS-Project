//NOTE - 뒤로가기 
export const onClickBackButton = () => {
  if (confirm('목록으로 이동하시겠습니까?')) {
    window.location.pathname = '/';      
  }
}