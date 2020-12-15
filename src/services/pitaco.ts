import { AxiosError, AxiosResponse } from 'axios';
import { Match } from '../models/Match';
import { Pitaco } from '../models/Pitaco';
import api from './api';

interface PitacoMatch {
  match: Match;
  pitaco: Pitaco;
}

interface ListPitacoMatchResponse {
  data: PitacoMatch[];
  error: string;
}

async function getPitacoMatchToday(
  email: string
): Promise<ListPitacoMatchResponse> {
  const date = new Date();
  const dataString = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  return api
    .post('/pitacos-today/user', { email, date: dataString })
    .then((resp: AxiosResponse) => {
      const { matchs, pitacos } = resp.data;
      const matchPitaco = matchs.map(
        (match: Match): PitacoMatch => {
          for (let i = 0; i < pitacos.length; i += 1) {
            const pitaco = pitacos[i];
            if (match.id === pitaco.match.id) return { pitaco, match };
          }
          const pitaco: Pitaco = {
            golsHome: '',
            golsAway: '',
            point: 0,
            exactScore: 0,
            update: false,
            match,
          };
          return { pitaco, match };
        }
      );
      return { data: matchPitaco, error: '' };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error;
      return { data: [], error };
    });
}

async function getPitacoMatchRodada(
  email: string,
  championship: number,
  rodada: number
): Promise<ListPitacoMatchResponse> {
  return api
    .post('/pitacos-rodada/user', { email, championship, rodada })
    .then((resp: AxiosResponse) => {
      const { matchs, pitacos } = resp.data;
      const matchPitaco = matchs.map(
        (match: Match): PitacoMatch => {
          for (let i = 0; i < pitacos.length; i += 1) {
            const pitaco = { ...pitacos[i], update: false };
            if (match.id === pitaco.match.id) return { pitaco, match };
          }
          const pitaco: Pitaco = {
            golsHome: '',
            golsAway: '',
            point: 0,
            exactScore: 0,
            update: false,
            match,
          };
          return { pitaco, match };
        }
      );
      return { data: matchPitaco, error: '' };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error;
      return { data: [], error };
    });
}

interface PitacoRequest {
  golsHome: number;
  golsAway: number;
  id: number;
}

async function createPitacoMatch(
  email: string,
  pitacos: PitacoRequest[]
): Promise<{ pitacos: Pitaco[]; error: string }> {
  return api
    .post('/pitacos', { email, pitacos })
    .then((resp: AxiosResponse) => {
      const response = resp.data;
      return { pitacos: response, error: '' };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error;
      return { pitacos: [], error };
    });
}

export { getPitacoMatchToday, getPitacoMatchRodada, createPitacoMatch };
