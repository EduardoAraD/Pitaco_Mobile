import { AxiosError, AxiosResponse } from 'axios';
import api from './api';

import { initLeague, League, logoTrophy } from '../models/League';
import { Point, initPoint } from '../models/Point';
import { User } from '../models/User';

interface LeaguePointResponse {
  data: {
    league: League;
    position: number;
    point: Point;
  };
  error: string;
}

interface LeagueResponse {
  data: League;
  error: string;
}

async function getLeaguePitaco(
  championship: number,
  email: string
): Promise<LeaguePointResponse> {
  return api
    .post('/league-pitaco', { championship, email })
    .then((resp: AxiosResponse) => {
      const response = resp.data;
      const { position } = response;
      const { point } = response;
      const league: League = {
        id: response.league.id,
        name: response.league.name,
        description: response.league.description,
        dono: response.league.dono,
        logo: logoTrophy(response.league.trophy),
        points: response.league.points,
      };
      return { data: { position, point, league }, error: '' };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error || err.message;
      return {
        data: { league: initLeague(), point: initPoint(), position: -1 },
        error: error === 'Network Error' ? 'Sem conexão ao servidor' : error,
      };
    });
}

async function getLeagueHeartPitaco(
  championship: number,
  clubeId: number,
  email: string
): Promise<LeaguePointResponse> {
  return api
    .post('/league-heartClub', { championship, clubeId, email })
    .then((resp: AxiosResponse) => {
      const response = resp.data;
      const { position } = response;
      const { point } = response;
      const league: League = {
        id: response.league.id,
        name: response.league.name,
        description: response.league.description,
        dono: response.league.dono,
        logo: logoTrophy(response.league.trophy),
        points: response.league.points,
      };
      return { data: { position, point, league }, error: '' };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error || err.message;
      return {
        data: { league: initLeague(), point: initPoint(), position: -1 },
        error: error === 'Network Error' ? 'Sem conexão ao servidor' : error,
      };
    });
}

async function getLeagueDono(
  championship: number,
  email: string
): Promise<LeaguePointResponse> {
  return api
    .post('/league-dono', { championship, email })
    .then((resp: AxiosResponse) => {
      const response = resp.data;
      const { position } = response;
      const { point } = response;
      const league: League = {
        id: response.league.id,
        name: response.league.name,
        description: response.league.description,
        dono: response.league.dono,
        logo: logoTrophy(response.league.trophy),
        points: response.league.points,
      };
      return { data: { position, point, league }, error: '' };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error || err.message;
      return {
        data: { league: initLeague(), point: initPoint(), position: -1 },
        error: error === 'Network Error' ? 'Sem conexão ao servidor' : error,
      };
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
      const error = err.response?.data.error || err.message;
      return {
        data: initLeague(),
        error: error === 'Network Error' ? 'Sem conexão ao servidor' : error,
      };
    });
}

interface ListLeaguePointResponse {
  data: {
    league: League;
    position: number;
    point: Point;
  }[];
  error: string;
}

interface ListLeagueResponse {
  data: League[];
  error: string;
}

interface LeaguePointDB {
  point: Point;
  position: number;
  league: {
    id: number;
    name: string;
    description: string;
    dono: User;
    trophy: string;
    points: Point[];
  };
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
): Promise<ListLeaguePointResponse> {
  return api
    .post('/league-guest', { championship, email })
    .then((resp: AxiosResponse) => {
      const response = resp.data;
      const leaguesResp = response.map((item: LeaguePointDB) => {
        return {
          point: item.point,
          position: item.position,
          league: {
            id: item.league.id,
            name: item.league.name,
            description: item.league.description,
            dono: item.league.dono,
            logo: logoTrophy(item.league.trophy),
            points: item.league.points,
          },
        };
      });
      return { data: leaguesResp, error: '' };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error || err.message;
      return {
        data: [],
        error: error === 'Network Error' ? 'Sem conexão ao servidor' : error,
      };
    });
}

async function getCommomLeagues(
  emailUser: string,
  emailFriend: string
): Promise<ListLeagueResponse> {
  return api
    .post('/commom-leagues', { emailUser, emailFriend })
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
      const error = err.response?.data.error || err.message;
      return {
        data: [],
        error: error === 'Network Error' ? 'Sem conexão ao servidor' : error,
      };
    });
}

interface LeaguePaginate {
  limit: number;
  page: number;
  filter: string;
  leagues: League[];
  total: number;
}

async function getLeaguesPage(
  championship: number,
  page: number,
  limit: number,
  filter: string
): Promise<{ data: LeaguePaginate; error: string }> {
  return api
    .post('/leagues-page', { championship, page, limit, filter })
    .then((resp: AxiosResponse) => {
      const response = resp.data;
      const pageRes = response.page;
      const limitRes = response.limit;
      const filterRes = response.filter;
      const { total } = response;
      const leagues: League[] = response.leagues.map((item: LeagueDB) => {
        return {
          id: item.id,
          name: item.name,
          description: item.description,
          dono: item.dono,
          logo: logoTrophy(item.trophy),
          points: item.points,
        };
      });
      return {
        data: {
          page: pageRes,
          limit: limitRes,
          filter: filterRes,
          leagues,
          total,
        },
        error: '',
      };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error || err.message;
      return {
        data: { limit: 1, page: 1, filter: '', total: 0, leagues: [] },
        error: error === 'Network Error' ? 'Sem conexão ao servidor' : error,
      };
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
      const error = err.response?.data.error || err.message;
      return {
        data: initLeague(),
        error: error === 'Network Error' ? 'Sem conexão ao servidor' : error,
      };
    });
}

interface PointsLeague {
  limit: number;
  page: number;
  points: Point[];
  total: number;
}

interface PointLeagueResponse {
  data: PointsLeague;
  error: string;
}

interface PointLeagueRodadaResponse {
  data: {
    limit: number;
    page: number;
    points: Point[];
    total: number;
    rodada: number;
  };
  error: string;
}

async function showPointLeaguePage(
  id: number,
  page: number,
  limit: number
): Promise<PointLeagueResponse> {
  return api
    .post('/leagues-points', { id, page, limit })
    .then((resp: AxiosResponse) => {
      const response = resp.data;
      const pageRes = response.page;
      const limitRes = response.limit;
      const filterRes = response.filter;
      const { total, points } = response;
      return {
        data: {
          page: pageRes,
          limit: limitRes,
          filter: filterRes,
          points,
          total,
        },
        error: '',
      };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error || err.message;
      return {
        data: { limit: 1, page: 1, filter: '', total: 0, points: [] },
        error: error === 'Network Error' ? 'Sem conexão ao servidor' : error,
      };
    });
}

async function showPointLeagueHeartClubPage(
  id: number,
  clubeId: number,
  page: number,
  limit: number
): Promise<PointLeagueResponse> {
  return api
    .post('/leagues-heartClub-points', { id, clubeId, page, limit })
    .then((resp: AxiosResponse) => {
      const response = resp.data;
      const pageRes = response.page;
      const limitRes = response.limit;
      const filterRes = response.filter;
      const { total, points } = response;
      return {
        data: {
          page: pageRes,
          limit: limitRes,
          filter: filterRes,
          points,
          total,
        },
        error: '',
      };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error || err.message;
      return {
        data: { limit: 1, page: 1, filter: '', total: 0, points: [] },
        error: error === 'Network Error' ? 'Sem conexão ao servidor' : error,
      };
    });
}

async function showPointLeaguePageRodada(
  id: number,
  page: number,
  limit: number,
  championship: number
): Promise<PointLeagueRodadaResponse> {
  return api
    .post('/leagues-points-last', { id, page, limit, championship })
    .then((resp: AxiosResponse) => {
      const response = resp.data;
      const pageRes = response.page;
      const limitRes = response.limit;
      const filterRes = response.filter;
      const { total, points, rodada } = response;
      return {
        data: {
          page: pageRes,
          limit: limitRes,
          filter: filterRes,
          points,
          total,
          rodada,
        },
        error: '',
      };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error || err.message;
      return {
        data: {
          limit: 1,
          page: 1,
          filter: '',
          total: 0,
          points: [],
          rodada: 0,
        },
        error: error === 'Network Error' ? 'Sem conexão ao servidor' : error,
      };
    });
}

async function showPointLeagueHeartClubPageRodada(
  id: number,
  clubeId: number,
  page: number,
  limit: number,
  championship: number
): Promise<PointLeagueRodadaResponse> {
  return api
    .post('/leagues-heartClub-points-last', {
      id,
      clubeId,
      page,
      limit,
      championship,
    })
    .then((resp: AxiosResponse) => {
      const response = resp.data;
      const pageRes = response.page;
      const limitRes = response.limit;
      const filterRes = response.filter;
      const { total, points, rodada } = response;
      return {
        data: {
          page: pageRes,
          limit: limitRes,
          filter: filterRes,
          points,
          total,
          rodada,
        },
        error: '',
      };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error || err.message;
      return {
        data: {
          limit: 1,
          page: 1,
          filter: '',
          total: 0,
          points: [],
          rodada: 0,
        },
        error: error === 'Network Error' ? 'Sem conexão ao servidor' : error,
      };
    });
}

async function getSolitationLeague(
  id: number
): Promise<{ data: Point[]; error: string }> {
  return api
    .get(`/league-solicitation/${id}`)
    .then((resp: AxiosResponse) => {
      const response = resp.data;
      return { data: response, error: '' };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error || err.message;
      return {
        data: [],
        error: error === 'Network Error' ? 'Sem conexão ao servidor' : error,
      };
    });
}

interface MessageResponse {
  success: string;
  error: string;
}

async function createSolicitation(
  id: number,
  email: string
): Promise<MessageResponse> {
  return api
    .post(`/league-solicitation/${id}`, { email })
    .then(() => {
      return { success: 'Solicitação realizada com sucesso', error: '' };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error || err.message;
      return {
        success: '',
        error: error === 'Network Error' ? 'Sem conexão ao servidor' : error,
      };
    });
}

async function resultSolicitation(
  id: number,
  email: string,
  result: string
): Promise<MessageResponse> {
  return api
    .post('/result-solicitation', { id, email, result })
    .then(() => {
      if (result === 'true')
        return { success: 'Pitaqueiro adicionado na liga.', error: '' };
      return { success: 'Removido a solicitação do pitaqueiro.', error: '' };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error || err.message;
      return {
        success: '',
        error: error === 'Network Error' ? 'Sem conexão ao servidor' : error,
      };
    });
}

async function deleteLeague(
  id: number,
  email: string
): Promise<MessageResponse> {
  return api
    .post(`/league-delete/${id}`, { email })
    .then(() => {
      return { success: 'Liga excluída com sucesso', error: '' };
    })
    .catch((err: AxiosError) => {
      const error = err.response?.data.error || err.message;
      return {
        success: '',
        error: error === 'Network Error' ? 'Sem conexão ao servidor' : error,
      };
    });
}

export {
  getLeaguePitaco,
  getLeagueHeartPitaco,
  getLeagueDono,
  getLeagueGuest,
  getCommomLeagues,
  createLeague,
  getLeaguesPage,
  showLeague,
  showPointLeaguePage,
  showPointLeaguePageRodada,
  showPointLeagueHeartClubPage,
  showPointLeagueHeartClubPageRodada,
  deleteLeague,
  getSolitationLeague,
  createSolicitation,
  resultSolicitation,
};
