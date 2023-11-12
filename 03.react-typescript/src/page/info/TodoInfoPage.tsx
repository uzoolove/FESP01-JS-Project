import { useNavigate, useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import Header from 'src/layout/header/Header';
import styles from 'src/page/info/TodoInfo.module.css';
import button from 'src/styles/Button.module.css';

interface TodoItem {
  _id: number;
  title: string;
  content: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ContentKey {
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}



const TodoInfo = (): JSX.Element => {
  const BASE_URL: string | undefined = 
  process.env.REACT_APP_PORT_NUMBER;

  const { id } = useParams<string>();
  const navigate = useNavigate();
  const [todoDetail, setTodoDetail] = useState<TodoItem>();

  const substituteKeyName: ContentKey = {
      title: '제목',
      content: '내용',
      createdAt: '생성일',
      updatedAt: '수정일',
  }


  const getTodoData = async (): Promise<void> => {
    try {
      const response = 
      await axios.get<TodoResponse>(`${ BASE_URL }/api/todolist/${ id }`);

      if (response.status === 200) {
        const todoData: TodoItem = response.data.item;
        setTodoDetail(todoData);
      }
    }
    catch (error) {
      console.log(error);
    }
  }


  const onClickDeleteInInfo = async (): Promise<void> => {
    try {
      if (window.confirm('정말 삭제 하시겠습니까?')) {
        const response = 
        await axios.delete<AxiosResponse>(
          `${ BASE_URL }/api/todolist/${ id }`);

        if (response.status === 200) {
          navigate('/');
        }
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTodoData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header title = '상세 페이지' />
      <div className = { styles.detailContainer } >
        <div className = { styles.detailArea } >
          {
            todoDetail && 
            Object.keys(substituteKeyName).map((key: string) => {

              return(
                <div 
                key = { key }
                className = { styles.detailRow } >
                  <div 
                  className = { styles.detailTitleContentBox } >
                    <h3 className ={ styles.title } >
                      { substituteKeyName[key as keyof ContentKey] }
                    </h3>
                  </div>

                  <div 
                  className = { styles.detailTitleContentBox } >
                    <span 
                    className = { styles.content } >
                      { todoDetail[key as keyof TodoItem] }
                    </span>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>

      <div className = { button.buttonArea } >
        <button 
        className = 
        { `${ button.backButton } 
        ${ button.button }` }
        onClick = { () => navigate('/') } >
          취소
        </button>

        <button  
        className = 
        { `${ button.defaultButton } 
        ${ button.button }` }
        onClick = 
        { () => navigate(`/detail/update/${ id }`) } >
          수정
        </button>

        <button className = 
        { `${ button.defaultButton } 
        ${ button.button }` } 
        onClick = { onClickDeleteInInfo } >
          삭제
        </button>
      </div>
    </>
  );
};

export default TodoInfo;