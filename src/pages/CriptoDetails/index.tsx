import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./criptoDetails.module.css";
import { getCriptoDetails } from "../../services/criptoApi";
import { CriptoData } from "../../types/criptoData";
import { toast } from "react-toastify";

const CriptoDetails = () => {
  const { criptoId } = useParams();
  const navigate = useNavigate();

  const [cripto, setCripto] = useState<CriptoData>();

  useEffect(() => {
    async function getCoin() {
      try {
        if (criptoId) {
          getCriptoDetails(criptoId)
            .then((data: CriptoData) => {
              setCripto(data);
            })
            .catch((error: Error) => {
              toast.error(error.message)
              navigate("/");
            });
        }
      } catch {
        toast.error("Erro ao buscar informações da cripto moeda")
        navigate("/");
      }
    }

    getCoin();
  }, [criptoId, navigate]);

  return (
    <main>
      {cripto && (
        <section className={styles.content}>
          <img
            src={`https://assets.coincap.io/assets/icons/${cripto?.symbol.toLowerCase()}@2x.png`}
            alt="Logo da moeda"
            className={styles.logo}
          />

          <h1>
            {cripto?.name} | {cripto?.symbol}
          </h1>

          <p>Preço: {cripto?.priceUsd}</p>

          <p>Valor de mercado: {cripto?.marketCapUsd}</p>

          <p>Volume: {cripto?.volumeUsd24Hr}</p>

          <p>
            Variação 24h:{" "}
            <span
              className={
                Number(cripto?.changePercent24Hr) > 0
                  ? styles.profit
                  : styles.loss
              }
            >
              {Number(cripto?.changePercent24Hr).toFixed(2)}%
            </span>
          </p>
        </section>
      )}
    </main>
  );
};

export default CriptoDetails;
