import styles from "./App.module.css";
import Footer from "./layout/footer/Footer";
import { Route, Routes } from "react-router-dom";
import TodoList from "./page/list/TodoList";
import TodoRegist from "./page/regist/TodoRegistPage";
import TodoInfo from "./page/TodoInfo";

function App() {
  return (
    <div className = {styles.page}>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/regist" element={<TodoRegist />} />
        <Route path="/detail" element={<TodoInfo />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
