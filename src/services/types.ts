import { CriptoData } from "../types/criptoData";

export interface RequestCriptoListData {
    data: CriptoData[];
    timestamp: number;
}

export interface RequestCriptoData {
    data: CriptoData;
    timestamp: number;
}