import { Link } from "react-router-dom";
import styles from "./notFound.module.css";

const NotFound = () => {
  return (
    <main className={styles["not-found-container"]}>
      <h2>404</h2>

      <p>Não encontramos o que você estava procurando :(</p>

      <Link to="/">Voltar</Link>
    </main>
  );
};

export default NotFound;
