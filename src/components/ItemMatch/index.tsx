import React from 'react';

import { Match } from '../../models/Match';

import {
  CardContainer,
  CardGame,
  CardGameImage,
  CardGameItem,
  CardGamePlacar,
  TextCardHour,
  TextCardName,
  TextCardPlacar,
  TextCardStadium,
} from './styles';

interface Props {
  match: Match;
}

export default function ItemMatch({ match }: Props) {
  return (
    <CardContainer>
      <TextCardStadium>
        Campeonato Brasileiro A 2020 - {match.stadium}
      </TextCardStadium>
      <CardGame>
        <CardGameItem>
          <CardGameImage
            resizeMode="contain"
            source={{ uri: match.clubeHome.logo }}
          />
          <TextCardName numberOfLines={1}>{match.clubeHome.name}</TextCardName>
        </CardGameItem>
        <CardGamePlacar>
          <TextCardHour>{`${match.date} - ${match.hour}`}</TextCardHour>
          <TextCardPlacar bool={match.status === 'progress'}>
            {match.status !== 'notstarted'
              ? `${match.golsHome} - ${match.golsAway}`
              : '  -  '}
          </TextCardPlacar>
        </CardGamePlacar>
        <CardGameItem style={{ alignItems: 'flex-start' }}>
          <CardGameImage
            resizeMode="contain"
            source={{ uri: match.clubeAway.logo }}
          />
          <TextCardName numberOfLines={1}>{match.clubeAway.name}</TextCardName>
        </CardGameItem>
      </CardGame>
    </CardContainer>
  );
}
