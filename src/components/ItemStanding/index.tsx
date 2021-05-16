import React, { useContext } from 'react';
import { View } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from 'styled-components';

import { Clube } from '../../models/Clube';

import {
  AreaText,
  TextValor,
  TextPos,
  TextName,
  ImageContent,
  AreaValor,
  Container,
  // AreaVariacao,
} from './styles';

interface Props {
  position: number;
  clube: Clube;
  points: number;
  matchs: number;
  wins: number;
  golsScore: number;
  golsDiff: number;
  positionVariation: number;
  status: string;
}

export default function ItemStanding({
  position,
  clube,
  points,
  matchs,
  wins,
  golsScore,
  golsDiff,
  // positionVariation,
  status,
}: Props) {
  const { colors } = useContext(ThemeContext);

  /* function textVariacao(num: number) {
      if (num > 0)
        return (
          <AreaVariacao>
            <Icon name="chevron-up-box" size={13} color={theme.greenSecundary} />
            <TextValor>
              {num}
            </TextValor>
          </AreaVariacao>
        );
      if (num === 0)
        return (
          <AreaVariacao>
            <Icon name="square" size={12} color={theme.bluePrimary} />
            <TextValor>
              {num}
            </TextValor>
          </AreaVariacao>
        );
      return (
        <AreaVariacao>
          <Icon name="chevron-down-box" size={13} color={theme.textRed} />
          <TextValor>
            {num * -1}
          </TextValor>
        </AreaVariacao>
      );
    } */

  function colorBorderLeft() {
    switch (status) {
      case 'L':
        return colors.bluePrimary;
      case 'LQ':
        return colors.blueSecundary;
      case 'S':
        return colors.yellowPrimary;
      case 'R':
        return colors.textRed;
      default:
        return colors.whitePrimary;
    }
  }

  return (
    <Container color={colorBorderLeft()}>
      <TextPos>{position}.</TextPos>
      <ImageContent resizeMode="contain" source={{ uri: clube.logo }} />
      <AreaValor>
        <TextName>{clube.name}</TextName>
        <AreaText>
          {/* textVariacao(positionVariation || 0) */}
          <View style={{ width: '40%' }} />
          <TextValor>{points}</TextValor>
          <TextValor>{matchs}</TextValor>
          <TextValor>{wins}</TextValor>
          <TextValor>{golsDiff}</TextValor>
          <TextValor>{golsScore}</TextValor>
        </AreaText>
      </AreaValor>
    </Container>
  );
}
