import { linkTo } from "../Router";
<<<<<<< HEAD
import axios, { AxiosResponse } from "axios";

export interface Todo {
  _id: string;
  title: string;
  content: string;
  done: boolean;
}

interface TodoListResponse {
  data: Todo[];
}

const BASE_URL = "http://localhost:33088";

export const getTodoList = async (): Promise<AxiosResponse<TodoListResponse>> => {
  const response = await axios.get<TodoListResponse>(`${BASE_URL}/api/todolist`);
=======
import axios from "../../node_modules/axios/index";

const BASE_URL = "http://localhost:33088";

//NOTE - 할일 목록을 가져오는 함수
export const getTodoList = async () => {
  const response = 
  await axios<TodoListResponse>(`${ BASE_URL }/api/todolist`);
>>>>>>> 04b8bbb3c18cb09f6494dd2637ed1ab1e8fe61b0
  return response;
};

//NOTE - 할일 등록을 처리하는 함수
<<<<<<< HEAD
export const onSubmitTodoRegister = async (event: Event, titleInput: HTMLInputElement, contentInput: HTMLTextAreaElement) => {
=======
export const onSubmitTodoRegister = async (event: any, titleInput: any, contentInput: any) => {
>>>>>>> 04b8bbb3c18cb09f6494dd2637ed1ab1e8fe61b0
  event.preventDefault();

  if (titleInput.value === "" || contentInput.value === "") {
    alert("할일을 입력하세요^^");
    return;
  }

  const body = {
    title: titleInput.value,
    content: contentInput.value,
    done: false,
  };

  try {
    if (confirm("등록 하시겠습니까?")) {
      const response = 
      await axios.post(`${ BASE_URL }/api/todolist`, body);

      if (response) {
        linkTo("/");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

//NOTE - 체크박스 상태 변경을 처리하는 함수
<<<<<<< HEAD
export const onChangeCheckbox = async (event: Event, checkbox: HTMLInputElement, todo: Todo) => {
  console.log(typeof event, typeof checkbox, typeof todo);
  const isChecked = checkbox.checked;
=======
export const onChangeCheckbox = async (
  event: Event, checkbox: HTMLInputElement, todo: TodoItem): Promise<void> => {

    const isChecked: boolean = checkbox.checked;
>>>>>>> 04b8bbb3c18cb09f6494dd2637ed1ab1e8fe61b0

  try {
    const response = 
    await axios.patch(`${ BASE_URL }/api/todolist/${ todo._id }`, { done: isChecked });

    if (response) {
<<<<<<< HEAD
      const target = event.target as HTMLInputElement;
      const NEXT_SIBLING = target.nextSibling as HTMLElement;
=======
      const NEXT_SIBLING = (event.target as HTMLElement)?.nextSibling;
>>>>>>> 04b8bbb3c18cb09f6494dd2637ed1ab1e8fe61b0

      todo.done = isChecked;

      if (isChecked) {
        todo.done = false;
        (NEXT_SIBLING as HTMLElement)?.classList.add("line-through");
      } else {
        todo.done = true;
        (NEXT_SIBLING as HTMLElement)?.classList.remove("line-through");
      }
    }
  } catch (error) {
    console.error("API 업데이트에 실패했습니다:", error);
  }
};

//NOTE - TodoList 화면에서 할일 삭제를 처리하는 함수
<<<<<<< HEAD
export const onClickDeleteTodo = async (todoId: string, li: HTMLLIElement) => {
  console.log(typeof todoId, typeof li);
=======
export const onClickDeleteTodo = async (
  todoId: number, li: HTMLElement): Promise<void> => {

>>>>>>> 04b8bbb3c18cb09f6494dd2637ed1ab1e8fe61b0
  try {
    if (confirm("정말 삭제 하시겠습니까?")) {
      const response = 
      await axios.delete<TodoListResponse>(`${ BASE_URL }/api/todolist/${ todoId }`);

      if (response) {
        li.remove();
      }
    }
  } catch (error) {
    console.error("API 삭제에 실패했습니다:", error);
  }
};

//NOTE - 할일의 상세 정보 데이터를 가져오는 함수
export const getTodoData = async (todoId: string) => {
  try {
    const response = await axios(`${BASE_URL}/api/todolist/${todoId}`);

    const data = response.data.item;

    return data;
  } catch (error) {
    console.log(error);
  }
};

//NOTE - 할일 삭제를 처리하는 함수 (상세 정보 페이지에서 사용)
export const onClickDeleteInInfo = async (todoId: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/todolist/${todoId}`);

    if (confirm("삭제 하시겠습니까?")) {
      if (response) {
        linkTo("/");
      }
    }
  } catch (error) {
    console.error(error);
  }
};

//NOTE - 할일 수정을 처리하는 함수
<<<<<<< HEAD
export const onClickEditTodo = async (event: Event, titleInput: HTMLInputElement, contentInput: HTMLTextAreaElement, todoId: string) => {
=======
export const onClickEditTodo = async (event: any, titleInput: any, contentInput: any, todoId: any, backButton: any) => {
>>>>>>> 04b8bbb3c18cb09f6494dd2637ed1ab1e8fe61b0
  event.preventDefault();

  if (titleInput.value === "" || contentInput.value === "") {
    alert("할일을 입력하세요^^");
    return;
  }

  let newTitleValue = "";
  let newContentValue = "";

  newTitleValue = titleInput.value;
  newContentValue = contentInput.value;

  const body = {
    title: newTitleValue,
    content: newContentValue,
  };

  try {
    if (confirm("수정 하시겠습니까?")) {
      const response = await axios.patch(`${BASE_URL}/api/todolist/${todoId}`, body);

      if (response) {
        window.history.back();
      }
    }
  } catch (error) {
    console.log(error);
  }
};