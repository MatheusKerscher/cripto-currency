import { Link } from "react-router-dom";

import styles from "./header.module.css";

const Header = () => {
  return (
    <header className={styles.container}>
      <Link to="/" className={styles.logo}>
        Cripto <span>Currency</span>
      </Link>
    </header>
  );
};

export default Header;
