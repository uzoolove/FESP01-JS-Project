import React, { useEffect } from "react";
import { useTodos } from "src/hooks/useTodo";
import { useParams } from "react-router-dom";
import Header from "../layout/header/Header";

const TodoInfo = () => {
    const { todoData, fetchTodoData, deleteTodo } = useTodos();
    const { todoId } = useParams();

    useEffect(() => {
        if (todoId) {
            fetchTodoData(todoId);
        }
    }, [todoId, fetchTodoData]);

    return (
        <>
            <Header title="수정 페이지" />
            {todoData && (
                <div>
                    <h2>{todoData.title}</h2>
                    <p>{todoData.description}</p>
                    {/* 기타 필요한 UI 요소 추가 */}
                </div>
            )}
            <button onClick={() => deleteTodo(todoId || "")}>삭제하기</button>
        </>
    );
};

export default TodoInfo;
