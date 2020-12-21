import { AxiosError, AxiosResponse } from 'axios';
import api from './api';
import { ItemStanding } from '../models/ItemStanding';
import { initRodada, Rodada } from '../models/Rodada';
import { Clube } from '../models/Clube';

interface StandingResponse {
  data: ItemStanding[];
  error: string;
}

async function getStandingChampionship(
  championshipId: number
): Promise<StandingResponse> {
  return api
    .get(`/championship/${championshipId}/tabela/`)
    .then((resp: AxiosResponse) => {
      const { data } = resp;
      const response = { data, error: '' };
      return response;
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error;
      const response = { data: [], error };
      return response;
    });
}

interface RodadaResponse {
  data: Rodada;
  error: string;
}

async function getRodada(
  championship: number,
  rodada: number
): Promise<RodadaResponse> {
  return api
    .get(`/championship/${championship}/rodadas/${rodada}`)
    .then((resp: AxiosResponse) => {
      const { data } = resp;
      return { data, error: '' };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error;
      return { data: initRodada(), error };
    });
}

async function getClubes(): Promise<{ data: Clube[]; error: string }> {
  return api
    .get('/championship/clubes')
    .then((resp: AxiosResponse) => {
      const { data } = resp;
      return { data, error: '' };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error;
      return { data: [], error };
    });
}

export { getStandingChampionship, getRodada, getClubes };
