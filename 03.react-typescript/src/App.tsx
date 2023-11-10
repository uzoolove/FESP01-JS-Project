import "./App.css";
import Footer from "./layout/Footer";
import { Route, Routes } from "react-router-dom";
import TodoList from "./page/TodoList";
import TodoRegist from "./page/TodoRegist";
import TodoInfo from "./page/TodoInfo";

function App() {
 return (
  <div id="page">
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
