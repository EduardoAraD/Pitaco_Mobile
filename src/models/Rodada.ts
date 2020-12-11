import { Match } from "./Match";

export interface Rodada {
    name: string,
    number: number,
    prev: number,
    prox: number,
    matchs: Match[]
}