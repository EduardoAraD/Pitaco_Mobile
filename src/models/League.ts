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
    logo: {
      uri:
        'https://img2.gratispng.com/20180513/gle/kisspng-computer-icons-icon-design-trophy-5af8bc89bcd005.6013339115262506337734.jpg',
    },
    dono: initUser(),
    points: [],
  };
}
