import { Clube, initClube } from './Clube';
import { Conquest } from './Conquest';
import { Point } from './Point';

export interface User {
  name: string;
  email: string;
  avatar: string;
  points: Point[];
  heartClub: Clube;
  conquests: Conquest[];
}

export function initUser(): User {
  return {
    name: '',
    email: '',
    avatar:
      'https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-outline-user-icon-png-image_1727916.jpg',
    points: [],
    heartClub: initClube(),
    conquests: [],
  };
}
