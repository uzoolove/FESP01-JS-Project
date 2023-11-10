import styles from "src/page/list/list.module.css";
import Header from "../../layout/header/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface TodoItem {
  _id: number;
  title: string;
  content: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

const TodoList = (): JSX.Element => {
  const BASE_URL = "http://localhost:33088";
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const navigate = useNavigate();


  const getTodoList = async () => {
    try {
    const response = await axios.get(`${ BASE_URL }/api/todolist`);

    if (response.status === 200) {
      const todoListData: TodoItem[] = response.data.items;

      setTodoList(todoListData);
      return;
    }
    } 
    catch (error) {
    console.log(error);
    }
  };


  const onChangeCheckBox = async (todoId: number): Promise<void> => {
    try {
      const todo: TodoItem | undefined 
      = todoList.find((todo) => {
        return todo._id === todoId;
      })

      const updateTodoDone = !todo?.done;

      const response = 
      await axios.patch(`${ BASE_URL }/api/todoList/${ todoId }`,{
        done: updateTodoDone
      });

      if (response.status === 200) {
        await getTodoList();
      }
    }
    catch (error) {
      console.log(error);
    }
  }


  const onClickDeleteTodo = async (todoId: number): Promise<void> => {
    try {
      const isConfirmed: boolean = window.confirm("정말로 삭제하시겠습니까?");

      if (isConfirmed) {
        const response = 
        await axios.delete(`${ BASE_URL }/api/todoList/${ todoId }`);

        if (response.status === 200) {
          await getTodoList(); 
        }
      }
    } 
    catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <>
    <Header title = { "List" } />
    <div className = { styles.content } >
      <ul>
      {
      todoList?.map((todo: TodoItem) => {
        const TODO_ID: number = todo._id;

        return (
        <li 
        key = { TODO_ID }
        className = { styles.link } >
          <input 
          key = { TODO_ID } 
          type = "checkbox" 
          checked = { todo.done }
          className = { styles.input }
          onChange = {() => {
            onChangeCheckBox(TODO_ID);
          }} />
          <h3 
          className = {
            todo.done ? `${ styles.title } ${ styles.checked }` 
            : styles.title }
          onClick = {() => navigate(`/detail${ TODO_ID }`)} >
            { todo.title }
          </h3>
          <FontAwesomeIcon 
          icon = { faTrashCan }
          className = { styles.faTrashCan } 
          onClick = { () => onClickDeleteTodo(TODO_ID) }/>
        </li>
        );
      })}
      </ul>
      <button 
      className = { styles.button }
      onClick={ () => navigate('/regist') } >
          +
      </button>
    </div>
    </>
  );
};

export default TodoList;
