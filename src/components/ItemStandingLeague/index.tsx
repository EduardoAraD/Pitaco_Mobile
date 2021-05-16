import React from 'react';

import { Point } from '../../models/Point';

import {
  Container,
  ImageStyle,
  TextStyle,
  TextPoint,
  TextName,
} from './styles';

interface Props {
  point: Point;
  position: number;
  isUser: boolean;
}

export default function ItemStandingLeague({ point, position, isUser }: Props) {
  return (
    <Container>
      <TextStyle>{position}.</TextStyle>
      <ImageStyle resizeMode="contain" source={{ uri: point.user.avatar }} />
      <TextName bool={isUser} numberOfLines={1}>
        {point.user.name}
      </TextName>
      <TextPoint>{point.points}</TextPoint>
      <TextStyle style={{ width: 34, textAlign: 'right' }}>
        {point.exactScore}
      </TextStyle>
    </Container>
  );
}
