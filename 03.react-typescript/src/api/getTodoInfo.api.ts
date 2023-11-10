import defaultInstance from "src/types/baseURL";
import { AxiosResponse } from "axios";
import { TodoItem, TodoResponse } from "../types/types";

    //NOTE - 할일 목록을 가져오는 함수
    export const getTodoList = async (): Promise<TodoItem[]> => {
        try {
            const response = await defaultInstance.get<TodoResponse>(
                "/todolist"
            );
            
            console.log("목ㄹ까져오기:", response);
            
            if (response.status === 200) {
                const todoListData: TodoItem[] = Array.isArray(response.data.item) ? response.data.item : [response.data.item]
                return todoListData;
            }
                return []
        } catch (error) {
            console.log("목록가져오기싫패: ", error);
            // 에러 발생 시 빈 배열 반환
            return [];
        }
    };

    //NOTE - 할일의 상세 정보 데이터를 가져오는 함수
    export  const getTodoData = async (todoId: string): Promise<TodoItem | undefined> => {
        try {
            const response = await defaultInstance.get(`/todolist/${todoId}`);

            if (response.status === 200) {
                const todoData: TodoItem = response.data.item;
                return(todoData);
            }
            return undefined
        } catch (error) {
            console.log(error);

            // 에러 발생 시 todoData 초기화
            return undefined
        }
    };

    //NOTE - TodoList 화면에서 할일 삭제를 처리하는 함수
    // const onClickDeleteTodo = async (
    //   todoId: number,
    //   li: HTMLElement
    //   ): Promise<void> => {

    //   try {
    //     if (window.confirm('정말 삭제 하시겠습니까?')) {
    //       const response =
    //       await defaultInstance.delete<AxiosResponse>(`/todolist/${ todoId }`);

    //       if (response.status === 200) {
    //         li.remove();
    //       }
    //     }
    //   } catch (error) {
    //     console.error('API 삭제에 실패했습니다:', error);
    //   }
    // };

    //NOTE - 할일 삭제를 처리하는 함수 (상세 정보 페이지에서 사용)
    export const onClickDeleteInInfo = async (todoId: string): Promise<void> => {
        try {
            if (window.confirm("삭제 하시겠습니까?")) {
                const response = await defaultInstance.delete<AxiosResponse>(
                    `/todolist/${todoId}`
                );

                if (response.status === 200) {
                    // navigate("/");
                }
            }
        } catch (error) {
            console.error(error);
        }
    };