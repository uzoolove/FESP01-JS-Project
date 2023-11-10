//NOTE - 정보
interface TodoItem {
  _id: number;
  title: string;
  content: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

//NOTE - 등록, 수정할때
interface TodoRegist {
  title: string;
  content: string;
  done?: boolean;
}

//NOTE - 목록 조회 응답
interface TodoListResponse {
  ok: number;
  items: TodoItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

//NOTE - 상세 조회 응답
interface TodoResponse {
  ok: number;
  item: TodoItem;
}
