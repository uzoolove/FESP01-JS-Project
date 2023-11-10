import styles from './header.module.css';


interface HeaderProps {
  title: string
}

const Header = ({ title }: HeaderProps ): JSX.Element => {
  return (
    <header className = { styles.header }>
      <h1>
        { `Todo ${ title }` }
      </h1>
    </header>
  );
};

export default Header;