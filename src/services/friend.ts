import { AxiosError, AxiosResponse } from 'axios';
import { Conquest } from '../models/Conquest';
import { User, UserApi, initUser } from '../models/User';
import { logoTrophy } from '../models/League';
import api from './api';

interface ListUserResponse {
  data: User[];
  error: string;
}

interface ListUserPageResponse {
  data: {
    page: number;
    limit: number;
    filter: string;
    users: User[];
    total: number;
  };
  error: string;
}

async function getFriends(email: string): Promise<ListUserResponse> {
  return api
    .post('/friends', { email })
    .then((resp: AxiosResponse) => {
      const response = resp.data;
      const data: User[] = response.map((item: UserApi) => {
        const user: User = {
          name: item.name,
          avatar: item.avatar,
          email: item.email,
          points: item.points,
          heartClub: item.heartClub,
          conquests: item.conquests.map((itemConquest) => {
            const conquest: Conquest = {
              id: itemConquest.id,
              league: {
                name: itemConquest.league.name,
                description: itemConquest.league.description,
                dono: initUser(),
                id: itemConquest.league.id,
                logo: logoTrophy(itemConquest.league.trophy),
                points: [],
              },
              position: itemConquest.position,
              description: itemConquest.description,
            };
            return conquest;
          }),
        };
        return user;
      });
      return { data, error: '' };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error;
      return { data: [], error };
    });
}

async function getListNotFriends(email: string): Promise<ListUserResponse> {
  return api
    .post('/not-friends', { email })
    .then((resp: AxiosResponse) => {
      const response = resp.data;
      return { data: response, error: '' };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error;
      return { data: [], error };
    });
}

async function getListNotFriendsPage(
  page: number,
  limit: number,
  filter: string,
  email: string
): Promise<ListUserPageResponse> {
  return api
    .post('/not-friends-page', { email, page, limit, filter })
    .then((resp: AxiosResponse) => {
      const response = resp.data;
      return { data: response, error: '' };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error;
      return {
        data: { limit: 1, page: 1, users: [], filter: '', total: 0 },
        error,
      };
    });
}

async function addFriend(
  emailUser: string,
  emailFriend: string
): Promise<{ success: string; error: string }> {
  return api
    .post('/friend', { emailUser, emailFriend })
    .then(() => {
      return { success: 'Pitaqueiro adicionado como amigo.', error: '' };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error;
      return { success: '', error };
    });
}

export { getFriends, getListNotFriends, getListNotFriendsPage, addFriend };
