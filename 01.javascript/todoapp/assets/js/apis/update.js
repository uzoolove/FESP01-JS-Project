export default async function update(_id, title, content, done) {
  try {
    await axios.patch(`http://localhost:33088/api/todolist/${_id}`, {
      title,
      content,
      done,
    });
    alert("할 일이 등록되었습니다.");
    window.location.replace("/");
  } catch (err) {
    console.log(err);
  }
}
