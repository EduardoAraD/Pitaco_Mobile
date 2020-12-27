import { User, initUser } from './User';

export interface Point {
  points: number;
  exactScore: number;
  user: User;
}

export function initPoint(): Point {
  return { points: 0, exactScore: 0, user: initUser() };
}
