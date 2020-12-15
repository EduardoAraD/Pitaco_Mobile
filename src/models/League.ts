import { ImageSourcePropType } from 'react-native';
import { Point } from './Point';
import { User, initUser } from './User';

export interface League {
  id: number;
  name: string;
  description: string;
  logo: ImageSourcePropType;
  dono: User;
  points: Point[];
}

export function initLeague(): League {
  return {
    id: -1,
    name: '',
    description: '',
    logo: { uri: '' },
    dono: initUser(),
    points: [],
  };
}
