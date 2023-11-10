import { useEffect, useState } from "react";
import {
    getTodoList,
    getTodoData,
    onClickDeleteInInfo,
} from "../api/getTodoInfo.api";
import { TodoItem } from "../types/types";
import { useNavigate } from "react-router-dom";

export const useTodos = () => {
    const navigate = useNavigate();
    const [todoList, setTodoList] = useState<TodoItem[]>([]);
    const [todoData, setTodoData] = useState<TodoItem | null>(null);

    useEffect(() => {
        const fetchTodoList = async () => {
            try {
                const response = await getTodoList();
                setTodoList(response);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTodoList();
    }, []);

    const fetchTodoData = async (id: string) => {
        try {
            const response = await getTodoData(id);
            if (response !== undefined) {
                setTodoData(response);
            } else {
                setTodoData(null);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTodo = async (id: string) => {
        try {
            await onClickDeleteInInfo(id);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return { todoList, todoData, fetchTodoData, deleteTodo };
};
