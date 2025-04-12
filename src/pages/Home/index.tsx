import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";

import { CriptoData } from "../../types/criptoData";

import styles from "./home.module.css";
import { getCriptoList } from "../../services/criptoApi";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();

  const [inputSearchCripto, setInputSearchCripto] = useState("");
  const [criptos, setCriptos] = useState<CriptoData[]>([]);

  useEffect(() => {
    getCriptos();
  }, []);

  const getCriptos = async () => {
    const myParams = new URLSearchParams();
    myParams.append("limit", "10");
    myParams.append("offset", `${criptos.length}`);

    await getCriptoList(myParams)
    .then((data) => {
      setCriptos([...criptos, ...data])
    })
    .catch((error: Error) => {
      toast.error(error.message)
    })
  };

  const searchCripto = (ev: FormEvent) => {
    ev.preventDefault();

    if (inputSearchCripto === "") return;

    navigate(`/cripto/${inputSearchCripto}`);
  };

  const loadMoreCriptos = () => {
    getCriptos();
  };

  return (
    <main className={styles.container}>
      <form className={styles["form-container"]} onSubmit={searchCripto}>
        <input
          type="text"
          placeholder="Digite o nome da moeda..."
          value={inputSearchCripto}
          onChange={(ev) => setInputSearchCripto(ev.target.value)}
        />

        <button>
          <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
        </button>
      </form>

      <section>
        <table>
          <thead>
            <tr>
              <th scope="col">Moeda</th>
              <th scope="col">Valor de mercado</th>
              <th scope="col">Preço</th>
              <th scope="col">Volume</th>
              <th scope="col">Variação 24h</th>
            </tr>
          </thead>

          <tbody id="table-body">
            {criptos.length > 0 &&
              criptos.map((cripto: CriptoData) => (
                <tr key={cripto.id} className={styles["table-line"]}>
                  <td className={styles["table-line-label"]} data-label="Moeda">
                    <div className={styles["cripto-name"]}>
                      <img
                        src={`https://assets.coincap.io/assets/icons/${cripto.symbol.toLowerCase()}@2x.png`}
                        alt={`Simbolo da cripto moeda ${cripto.name.toLowerCase()}`}
                      />

                      <Link to={`/cripto/${cripto.id}`}>
                        <span>{cripto.name}</span> | {cripto.symbol}
                      </Link>
                    </div>
                  </td>

                  <td data-label="Valor de mercado">{cripto.marketCapUsd}</td>
                  <td data-label="Preço">{cripto.priceUsd}</td>
                  <td data-label="Volume">{cripto.volumeUsd24Hr}</td>
                  <td data-label="Variação 24h">
                    <span
                      className={
                        Number(cripto.changePercent24Hr) > 0
                          ? styles["table-line-profit"]
                          : styles["table-line-loss"]
                      }
                    >
                      {Number(cripto.changePercent24Hr).toFixed(2)}%
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <button
          className={styles["load-more-button"]}
          onClick={loadMoreCriptos}
        >
          <FontAwesomeIcon icon={faPlus} />
          Carregar mais
        </button>
      </section>
    </main>
  );
};

export default Home;
