// 체크박스 클릭 시 호출될 함수
function handleCheckbox(e) {
  const checkbox = e.target;
  const li = checkbox.parentElement;

  if (checkbox.checked) {
    contentDone.appendChild(li);
  } else {
    contentNotDone.appendChild(li);
  }
}

export default handleCheckbox;
