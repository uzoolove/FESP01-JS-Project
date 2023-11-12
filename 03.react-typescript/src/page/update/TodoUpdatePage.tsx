import Header from "src/layout/header/Header";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import React, { useState, useEffect, useRef } from "react";
import button from "src/styles/Button.module.css";
import styles from "src/page/regist/TodoRegist.module.css";

interface TodoItem {
    _id: number;
    title: string;
    content: string;
    done: boolean;
    createdAt: string;
    updatedAt: string;
}

const TodoUpdate = (): JSX.Element => {
    const [todoDetail, setTodoDetail] = useState<TodoItem>();
    const BASE_URL: string | undefined = process.env.REACT_APP_PORT_NUMBER;
    const navigate = useNavigate();

    const { id } = useParams<string>();

    const handleBackBtnClick = () => {
        if (window.confirm("취소 하시겠습니까?")) {
            navigate(`/detail/${id}`);
        }
    };

    const getTodoData = async (): Promise<void> => {
        try {
            const response = await axios.get<TodoResponse>(
                `${BASE_URL}/api/todolist/${id}`
            );

            if (response.status === 200) {
                const todoData: TodoItem = response.data.item;
                setTodoDetail(todoData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTodoData();
    }, []);

    // 리랜더링 방지
    const titleInputRef = React.useRef<HTMLInputElement>(null);
    const contentInputRef = React.useRef<HTMLTextAreaElement>(null);

    const onClickEditTodo = async (
        titleInput: HTMLInputElement,
        contentInput: HTMLTextAreaElement,
        todoId: string | undefined
    ): Promise<void> => {
        try {
            if (window.confirm("수정하시겠습니까?")) {
                const response = await axios.patch<AxiosResponse>(
                    `${BASE_URL}/api/todoList/${todoId}`,
                    {
                        title: titleInput.value,
                        content: contentInput.value,
                    }
                );

                if (response.status === 200) {
                    navigate(`/detail/${id}`);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (titleInputRef.current && contentInputRef.current) {
            onClickEditTodo(titleInputRef.current, contentInputRef.current, id);
        }
    };

    return (
        <>
            <Header title={"수정 페이지"} />
            <form className={styles["regist-form"]} onSubmit={handleSubmit}>
                <input
                    name="title"
                    type="text"
                    placeholder="할일 제목"
                    defaultValue={todoDetail?.title ?? ""}
                    ref={titleInputRef}
                />
                <textarea
                    name="content"
                    placeholder="할일 내용"
                    defaultValue={todoDetail?.content ?? ""}
                    ref={contentInputRef}
                ></textarea>
                <div className="button-area">
                    <button
                        type="button"
                        className={`${button.backButton} ${button.button}`}
                        onClick={handleBackBtnClick}
                    >
                        취소
                    </button>
                    <button
                        className={`${button.defaultButton} ${button.button}`}
                        type="submit"
                    >
                        수정
                    </button>
                </div>
            </form>
        </>
    );
};

export default TodoUpdate;
