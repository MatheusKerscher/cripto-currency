import { CriptoData } from "../types/criptoData";
import { RequestCriptoData, RequestCriptoListData } from "./types";

const URL = "https://rest.coincap.io/v3/assets";

const myHeaders = new Headers();
myHeaders.append(
  "Authorization",
  "Bearer 076e71f3ed83fe61b0549408a8291488142b4f7113380dd4aa17854a23cc46ba"
);

const priceFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const priceCompactFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
});

const getCriptoList = async (
  params: URLSearchParams
): Promise<CriptoData[]> => {
  try {
    const response = await fetch(`${URL}?${params}`, {
      headers: myHeaders,
    });

    const result: RequestCriptoListData = await response.json();

    if (result.data) {
      const formattedData: CriptoData[] = result.data.map(
        (item: CriptoData) => {
          return {
            ...item,
            priceUsd: priceFormatter.format(Number(item.priceUsd)),
            marketCapUsd: priceCompactFormatter.format(
              Number(item.marketCapUsd)
            ),
            volumeUsd24Hr: priceCompactFormatter.format(
              Number(item.volumeUsd24Hr)
            ),
          };
        }
      );

      return formattedData;
    }

    throw new Error("Falha ao carregar lista de cripto moedas");
  } catch {
    throw new Error("Falha ao carregar lista de cripto moedas");
  }
};

const getCriptoDetails = async (criptoId: string) => {
  try {
    const response = await fetch(`${URL}/${criptoId}`, {
      headers: myHeaders,
    });
    const result: RequestCriptoData = await response.json();

    const cripto: CriptoData = result.data;

    if (cripto) {
      const formattedCripto = {
        ...result.data,
        priceUsd: priceFormatter.format(Number(cripto.priceUsd)),
        marketCapUsd: priceCompactFormatter.format(Number(cripto.marketCapUsd)),
        volumeUsd24Hr: priceCompactFormatter.format(
          Number(cripto.volumeUsd24Hr)
        ),
      };

      return formattedCripto;
    }

    throw new Error("Cripto moeda não encontrada");
  } catch {
    throw new Error("Cripto moeda não encontrada");
  }
};

export { getCriptoList, getCriptoDetails };
