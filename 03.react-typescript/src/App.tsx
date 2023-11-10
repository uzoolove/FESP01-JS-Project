import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "./layout/Footer";
import { Route, Routes } from "react-router-dom";
import TodoList from "./page/TodoList";
import TodoRegist from "./page/TodoRegist";
import TodoInfo from "./page/TodoInfo";
import { TodoItem } from "./types/types";

function App() {
    const [todos, setTodos] = useState<TodoItem[]>([]);

    useEffect(() => {
        const mockData: TodoItem[] = [
            {
                _id: 1,
                title: "제목",
                content: "내용",
                done: false,
                createdAt: "2023-11-10T12:00:00Z",
                updatedAt: "2023-11-10T12:00:00Z",
                description: "설명",
            },
        ];

        setTodos(mockData);
    }, []);
    return (
        <div id="page">
            <Routes>
                <Route path="/" element={<TodoList todos={todos} />} />
                <Route path="/regist" element={<TodoRegist />} />
                <Route path="/detail" element={<TodoInfo />} />
            </Routes>

            <Footer />
        </div>
    );
}

export default App;
