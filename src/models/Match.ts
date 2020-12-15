import { Clube } from './Clube';

export interface Match {
  id: number;
  matchIdApi: number;
  clubeHome: Clube;
  clubeAway: Clube;
  date: string;
  hour: string;
  stadium: string;
  golsHome: number;
  golsAway: number;
  status: string;
  finishPitaco: boolean;
}
