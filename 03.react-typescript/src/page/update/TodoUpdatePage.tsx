import Header from 'src/layout/header/Header';

const TodoUpdate = (): JSX.Element => {
  const BASE_URL: string | undefined = 
  process.env.REACT_APP_PORT_NUMBER;
  return (
    <>
      <Header title = { '수정 페이지' }/>
    </>
  );
};

export default TodoUpdate;