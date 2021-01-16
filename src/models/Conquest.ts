import { League, LeagueApi } from './League';

export interface Conquest {
  id: number;
  league: League;
  position: number;
  description: string;
}

export interface ConquestApi {
  id: number;
  league: LeagueApi;
  position: number;
  description: string;
}
