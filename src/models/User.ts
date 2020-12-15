import { Clube, initClube } from './Clube';
import { Point } from './Point';

export interface User {
  name: string;
  email: string;
  avatar: string;
  points: Point[];
  heartClub: Clube;
}

export function initUser(): User {
  return {
    name: '',
    email: '',
    avatar: '',
    points: [],
    heartClub: initClube(),
  };
}
