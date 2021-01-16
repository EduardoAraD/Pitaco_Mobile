import { ImageSourcePropType } from 'react-native';
import { initPoint, Point } from './Point';
import { User, initUser } from './User';

import Trophy1Img from '../assets/images/trophy1.png';
import Trophy2Img from '../assets/images/trophy2.png';
import Trophy3Img from '../assets/images/trophy3.png';
import Trophy4Img from '../assets/images/trophy4.png';
import Trophy5Img from '../assets/images/trophy5.png';
import Trophy6Img from '../assets/images/trophy6.png';

export interface League {
  id: number;
  name: string;
  description: string;
  logo: ImageSourcePropType;
  dono: User;
  points: Point[];
}

export interface LeagueApi {
  id: number;
  name: string;
  description: string;
  trophy: string;
  dono: User;
  points: Point[];
}

export interface LeaguePoint {
  league: League;
  position: number;
  point: Point;
}

export function initLeague(): League {
  return {
    id: -1,
    name: '',
    description: '',
    logo: {
      uri:
        'https://img2.gratispng.com/20180513/gle/kisspng-computer-icons-icon-design-trophy-5af8bc89bcd005.6013339115262506337734.jpg',
    },
    dono: initUser(),
    points: [],
  };
}

export function initLeaguePoint(): LeaguePoint {
  return {
    league: initLeague(),
    position: -1,
    point: initPoint(),
  };
}

export function logoTrophy(val: string) {
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
