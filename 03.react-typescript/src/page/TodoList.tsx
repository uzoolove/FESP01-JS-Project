import React from "react";
import { TodoItem } from "../types/types";
import { useNavigate } from "react-router-dom";
import Header from "../layout/header/Header";

interface TodoListProps {
    todos: TodoItem[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }): JSX.Element => {
    const navigate = useNavigate();

    // 목록이 비어 있는 경우
    if (todos.length === 0) {
        return (
            <>
                <Header title={"List"} />
                <p>ㅌㅌ없음</p>
            </>
        );
    }
    return (
        <>
            <Header title={"List"} />
            <ul>
                {todos.map((todo) => (
                    <li
                        key={todo._id}
                        onClick={() => navigate(`/todo/${todo._id}`)}
                    >
                        {todo.title}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default TodoList;
