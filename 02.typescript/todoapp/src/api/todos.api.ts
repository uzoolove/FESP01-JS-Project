import { linkTo } from '../Router';
import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:33088';

//NOTE - 할일 목록을 가져오는 함수
export const getTodoList = async () => {
  try {
    const response = 
    await axios.get<TodoListResponse>(
      `${ BASE_URL }/api/todolist`);

      if (response.status === 200) {
        const todoListData: TodoItem[] = response.data.items;
        return todoListData;
      }
  }
  catch (error) {
    console.log(error);
  }
}


//NOTE - 할일 등록을 처리하는 함수
export const onSubmitTodoRegister = async (
  event: Event,
  titleInput: HTMLInputElement,
  contentInput: HTMLTextAreaElement
  ):Promise<void> => {

  event.preventDefault();

  if (titleInput.value === '' || contentInput.value === '') {
    alert('할일을 입력하세요^^');
    return;
  }

  const body: TodoRegist = {
    title: titleInput.value,
    content: contentInput.value,
    done: false,
  };

  try {
    if (confirm('등록 하시겠습니까?')) {
      const response =
      await axios.post<AxiosResponse>(
        `${ BASE_URL }/api/todolist`, body);

      if (response.status === 200) {
        linkTo('/');
      }
    }
  } catch (error) {
    console.log(error);
  }
};



//NOTE - 체크박스 상태 변경을 처리하는 함수
export const onChangeCheckbox = async (
  event: Event,
  checkbox: HTMLInputElement,
  todo: TodoItem
): Promise<void> => {

  const isChecked: boolean = checkbox.checked;

  try {
    const response = 
    await axios.patch<AxiosResponse>(
      `${ BASE_URL }/api/todolist/${ todo._id }`, 
      {
        done: isChecked,
      });

    if (response.status === 200) {
      const target = event.target as HTMLInputElement;
      const NEXT_SIBLING = target.nextSibling as HTMLElement;

      todo.done = isChecked;

      if (isChecked) {
        todo.done = true;
        NEXT_SIBLING.classList.add('line-through');
      } 
      else {
        todo.done = false;
        NEXT_SIBLING.classList.remove('line-through');
      }
    }
  } catch (error) {
    console.error('API 업데이트에 실패했습니다:', error);
  }
};



//NOTE - TodoList 화면에서 할일 삭제를 처리하는 함수
export const onClickDeleteTodo = async (
  todoId: number, 
  li: HTMLElement
  ): Promise<void> => {

  try {
    if (confirm('정말 삭제 하시겠습니까?')) {
      const response = 
      await axios.delete<AxiosResponse>(
        `${ BASE_URL }/api/todolist/${ todoId }`);

      if (response.status === 200) {
        li.remove();
      }
    }
  } catch (error) {
    console.error('API 삭제에 실패했습니다:', error);
  }
};



//NOTE - 할일의 상세 정보 데이터를 가져오는 함수
export const getTodoData = async (todoId: number):Promise<TodoItem | undefined> => {
  try {
    const response = 
    await axios.get(
      `${ BASE_URL }/api/todolist/${ todoId }`);

    if (response.status === 200) {
      const todoData: TodoItem = response.data.item;
      return todoData;
    }
  } 
  catch (error) {
    console.log(error);
  }
};



//NOTE - 할일 삭제를 처리하는 함수 (상세 정보 페이지에서 사용)
export const onClickDeleteInInfo = async (todoId: number): Promise<void> => {

  try {
    if (confirm('삭제 하시겠습니까?')) {
      const response = 
      await axios.delete<AxiosResponse>(
        `${ BASE_URL }/api/todolist/${ todoId }`);

      if (response.status === 200) {
        linkTo('/');
      }
    }
  } catch (error) {
    console.error(error);
  }
};



//NOTE - 할일 수정을 처리하는 함수
export const onClickEditTodo = async (
  event: Event,
  titleInput: HTMLInputElement,
  contentInput: HTMLTextAreaElement,
  todoId: number
): Promise<void> => {

  event.preventDefault();

  if (titleInput.value === '' || contentInput.value === '') {
    alert('할일을 입력하세요^^');
    return;
  }

  let newTitleValue = '';
  let newContentValue = '';

  newTitleValue = titleInput.value;
  newContentValue = contentInput.value;

  const body: TodoRegist = {
    title: newTitleValue,
    content: newContentValue,
  };

  try {
    if (confirm('수정 하시겠습니까?')) {
      const response = 
      await axios.patch<AxiosResponse>(
        `${ BASE_URL }/api/todolist/${ todoId }`, body);

      if (response.status === 200) {
        window.history.back();
      }
    }
  } 
  catch (error) {
    console.log(error);
  }
};
