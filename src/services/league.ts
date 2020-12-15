import { AxiosError, AxiosResponse } from 'axios';
import { initLeague, League } from '../models/League';
import api from './api';

import Trophy1Img from '../assets/images/trophy1.png';
import Trophy2Img from '../assets/images/trophy2.png';
import Trophy3Img from '../assets/images/trophy3.png';
import Trophy4Img from '../assets/images/trophy4.png';
import Trophy5Img from '../assets/images/trophy5.png';
import Trophy6Img from '../assets/images/trophy6.png';
import { Point } from '../models/Point';
import { User } from '../models/User';

function logoTrophy(val: string) {
  switch (val) {
    case '0':
      return Trophy1Img;
    case '1':
      return Trophy2Img;
    case '2':
      return Trophy3Img;
    case '3':
      return Trophy4Img;
    case '4':
      return Trophy5Img;
    case '5':
      return Trophy6Img;
    default:
      return { uri: val };
  }
}

interface LeagueResponse {
  data: League;
  error: string;
}

async function getLeaguePitaco(id: number): Promise<LeagueResponse> {
  return api
    .post('/league-pitaco', { id })
    .then((resp: AxiosResponse) => {
      const response = resp.data;
      const league: League = {
        id: response.id,
        name: response.name,
        description: response.description,
        dono: response.dono,
        logo: logoTrophy(response.trophy),
        points: response.points,
      };
      return { data: league, error: '' };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error;
      return { data: initLeague(), error };
    });
}

async function getLeagueHeartPitaco(
  id: number,
  clubeId: number
): Promise<LeagueResponse> {
  return api
    .post('/league-heartClub', { id, clubeId })
    .then((resp: AxiosResponse) => {
      const response = resp.data;
      const league: League = {
        id: response.id,
        name: response.name,
        description: response.description,
        dono: response.dono,
        logo: logoTrophy(response.trophy),
        points: response.points,
      };
      return { data: league, error: '' };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error;
      return { data: initLeague(), error };
    });
}

async function getLeagueDono(
  championship: number,
  email: string
): Promise<LeagueResponse> {
  return api
    .post('/league-dono', { championship, email })
    .then((resp: AxiosResponse) => {
      const response = resp.data;
      const league: League = {
        id: response.id,
        name: response.name,
        description: response.description,
        dono: response.dono,
        logo: logoTrophy(response.trophy),
        points: response.points,
      };
      return { data: league, error: '' };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error;
      return { data: initLeague(), error };
    });
}

async function createLeague(
  championship: number,
  email: string,
  description: string,
  trophy: string,
  name: string
): Promise<LeagueResponse> {
  return api
    .post('/league', { email, description, trophy, name, championship })
    .then((resp: AxiosResponse) => {
      const response = resp.data;
      const league: League = {
        id: response.id,
        name: response.name,
        description: response.description,
        dono: response.dono,
        logo: logoTrophy(response.trophy),
        points: response.points,
      };
      return { data: league, error: '' };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error;
      return { data: initLeague(), error };
    });
}

interface ListLeagueResponse {
  data: League[];
  error: string;
}

interface LeagueDB {
  id: number;
  name: string;
  description: string;
  dono: User;
  trophy: string;
  points: Point[];
}

async function getLeagueGuest(
  championship: number,
  email: string
): Promise<ListLeagueResponse> {
  return api
    .post('/league-guest', { championship, email })
    .then((resp: AxiosResponse) => {
      const response = resp.data;
      const leagues: League[] = response.map((item: LeagueDB) => {
        return {
          id: item.id,
          name: item.name,
          description: item.description,
          dono: item.dono,
          logo: logoTrophy(item.trophy),
          points: item.points,
        };
      });
      return { data: leagues, error: '' };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error;
      return { data: [], error };
    });
}

async function getLeagues(championship: number): Promise<ListLeagueResponse> {
  return api
    .post('/leagues', { championship })
    .then((resp: AxiosResponse) => {
      const response = resp.data;
      const leagues: League[] = response.map((item: LeagueDB) => {
        return {
          id: item.id,
          name: item.name,
          description: item.description,
          dono: item.dono,
          logo: logoTrophy(item.trophy),
          points: item.points,
        };
      });
      return { data: leagues, error: '' };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error;
      return { data: [], error };
    });
}

async function showLeague(id: number): Promise<LeagueResponse> {
  return api
    .get(`/leagues/${id}`)
    .then((resp: AxiosResponse) => {
      const response = resp.data;
      const league: League = {
        id: response.id,
        name: response.name,
        description: response.description,
        dono: response.dono,
        logo: logoTrophy(response.trophy),
        points: response.points,
      };
      return { data: league, error: '' };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error;
      return { data: initLeague(), error };
    });
}

export {
  getLeaguePitaco,
  getLeagueHeartPitaco,
  getLeagueDono,
  getLeagueGuest,
  createLeague,
  getLeagues,
  showLeague,
};
