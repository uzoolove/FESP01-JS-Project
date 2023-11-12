import { Route, Routes } from "react-router-dom";
import styles from "src/styles/App.module.css";
import Footer from "src/layout/footer/Footer";
import TodoList from "src/page/list/TodoListPage";
import TodoRegist from "src/page/regist/TodoRegistPage";
import TodoInfo from "src/page/info/TodoInfoPage";
import TodoUpdate from "src/page/update/TodoUpdatePage";

function App(): JSX.Element {
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
