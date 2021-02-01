import { AxiosError, AxiosResponse } from 'axios';

import api from './api';
import { initUser, User } from '../models/User';

interface Response {
  data: {
    token: string;
    user: User;
    championship: number;
    rodada: number;
  };
  error: string;
}

async function signIn(email: string, password: string): Promise<Response> {
  return api
    .post('/login', { email, password })
    .then((resp: AxiosResponse) => {
      const { data } = resp;
      const response: Response = { data, error: '' };
      return response;
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error || err.message;
      const response: Response = {
        data: {
          token: '',
          user: initUser(),
          championship: -1,
          rodada: 0,
        },
        error: error === 'Network Error' ? 'Sem conexão ao servidor' : error,
      };
      return response;
    });
}

async function register(
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): Promise<Response> {
  return api
    .post('/signup', { name, email, password, confirmPassword })
    .then((resp: AxiosResponse) => {
      const { data } = resp;
      const response: Response = { data, error: '' };
      return response;
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error || err.message;
      const response: Response = {
        data: {
          token: '',
          user: initUser(),
          championship: -1,
          rodada: 0,
        },
        error: error === 'Network Error' ? 'Sem conexão ao servidor' : error,
      };
      return response;
    });
}

async function initUserApp(email: string): Promise<Response> {
  return api
    .post('/init-user', { email })
    .then((resp: AxiosResponse) => {
      const { data } = resp;
      const response: Response = { data, error: '' };
      return response;
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error || err.message;
      const response: Response = {
        data: {
          token: '',
          user: initUser(),
          championship: -1,
          rodada: 0,
        },
        error: error === 'Network Error' ? 'Sem conexão ao servidor' : error,
      };
      return response;
    });
}

interface MessageResponse {
  success: string;
  error: string;
}

async function forgotPassword(email: string): Promise<MessageResponse> {
  return api
    .post('/forgot-password', { email })
    .then(() => {
      return { success: 'E-mail enviado com sucesso', error: '' };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error || err.message;
      return {
        success: '',
        error: error === 'Network Error' ? 'Sem conexão ao servidor' : error,
      };
    });
}

async function resetPassword(
  code: string,
  password: string,
  confirmPassword: string
): Promise<MessageResponse> {
  return api
    .post('/reset-password', { code, password, confirmPassword })
    .then(() => {
      return { success: 'Senha alterada com sucesso', error: '' };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error || err.message;
      return {
        success: '',
        error: error === 'Network Error' ? 'Sem conexão ao servidor' : error,
      };
    });
}

interface UserResponse {
  user: User;
  error: string;
}

async function updateUser(
  email: string,
  nickname: string,
  avatar: string
): Promise<UserResponse> {
  return api
    .post('/edit-user', { email, nickname, avatar })
    .then((resp: AxiosResponse) => {
      const { data } = resp;
      return { user: data, error: '' };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error || err.message;
      return {
        user: initUser(),
        error: error === 'Network Error' ? 'Sem conexão ao servidor' : error,
      };
    });
}

export {
  signIn,
  register,
  forgotPassword,
  resetPassword,
  initUserApp,
  updateUser,
};
