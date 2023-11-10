export interface TodoItem {
    _id: number;
    title: string;
    content: string;
    done: boolean;
    createdAt: string;
    updatedAt: string;
    description: string;
  }
  
  export interface TodoListMain {
      _id: number
      title: string
      done: boolean
      createdAt: string
      updatedAt: string
  }
  
  export interface TodoListResponse {
    ok: number;
    items: TodoItem[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }
  
  export interface TodoResponse {
    ok: number;
    item: TodoItem;
  }
  