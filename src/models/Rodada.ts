import { Match } from './Match';

export interface Rodada {
  name: string;
  number: number;
  prev: number;
  prox: number;
  matchs: Match[];
}

export function initRodada(): Rodada {
  return { name: '', number: 0, prev: 0, prox: 0, matchs: [] };
}
