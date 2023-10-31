export default async function useSelectTodoInfo(ID) {
  try {
    const response = await axios.get(
      `http://localhost:33088/api/todolist/${ID}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
