import styles from "src/styles/App.module.css";
import Footer from "./layout/footer/Footer";
import { Route, Routes } from "react-router-dom";
import TodoList from "./page/list/TodoListPage";
import TodoRegist from "./page/regist/TodoRegistPage";
import TodoInfo from "./page/info/TodoInfoPage";
import TodoUpdate from "./page/update/TodoUpdatePage";

function App() {
    return (
        <div className={styles.page}>
            <Routes>
                <Route path="/" element={<TodoList />} />
                <Route path="/regist" element={<TodoRegist />} />
                <Route path="/detail/:id" element={<TodoInfo />} />
                <Route path="/detail/update/:id" element={<TodoUpdate />} />
            </Routes>

            <Footer />
        </div>
    );
}

export default App;
