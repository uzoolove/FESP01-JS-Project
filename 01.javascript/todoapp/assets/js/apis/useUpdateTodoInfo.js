export default async function useUpdateTodoInfo({ _id, title, content, done }) {
  try {
    await axios.patch(`http://localhost:33088/api/todolist/${_id}`, {
      title,
      content,
      done,
    });
  } catch (err) {
    console.log(err);
  }
}
