import { AxiosError, AxiosResponse } from 'axios';
import { initUser, User } from '../models/User';
import api from './api';

async function chooseClub(
  email: string,
  clubeId: number
): Promise<{ data: User; error: string }> {
  return api
    .post('/choose-club', { email, clubeId })
    .then((resp: AxiosResponse) => {
      const response = resp.data;
      return { data: response, error: '' };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error || err.message;
      return {
        data: initUser(),
        error: error === 'Network Error' ? 'Sem conexão ao servidor' : error,
      };
    });
}

export { chooseClub };
