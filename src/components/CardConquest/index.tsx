import React from 'react';
import { View } from 'react-native';

import { Conquest } from '../../models/Conquest';

import {
  CardImage,
  CardInfoDesc,
  CardInfoName,
  CardInfoPos,
  CardInfoView,
  CardView,
} from './styles';

interface Props {
  conquest: Conquest;
}

export default function CardConquest({ conquest }: Props) {
  return (
    <CardView>
      <CardImage resizeMode="contain" source={conquest.league.logo} />
      <CardInfoView>
        <CardInfoName>{conquest.league.name}</CardInfoName>
        <View style={{ flexDirection: 'row' }}>
          <CardInfoDesc>{conquest.description.toUpperCase()}</CardInfoDesc>
          <CardInfoPos>{conquest.position}° Lugar</CardInfoPos>
        </View>
      </CardInfoView>
    </CardView>
  );
}
