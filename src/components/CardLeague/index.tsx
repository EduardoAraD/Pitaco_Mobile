import React, { useContext } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'styled-components';

import { League } from '../../models/League';
import { Point } from '../../models/Point';
import { User } from '../../models/User';

import {
  CardImage,
  CardInfoTitle,
  CardInfoUserName,
  CardInfoUserPoint,
  CardInfoUserPos,
  CardInfoUserView,
  CardInfoView,
  CardTouch,
  CardInfoDono,
} from './styles';

interface Props {
  league: League;
  isLeagueHeartClub?: boolean;
  clubeId?: number;
  position: number;
  point: Point;
  user: User;
  isClicked?: boolean;
}

export default function CardLeague({
  league,
  isLeagueHeartClub = false,
  clubeId = 0,
  user,
  position,
  point,
  isClicked = true,
}: Props) {
  const { colors } = useContext(ThemeContext);
  const navigation = useNavigation();

  function viewDono() {
    if (league.dono.name) {
      return league.dono.email === user.email ? (
        <CardInfoDono style={{ color: colors.yellowPrimary }}>
          @{league.dono.name}
        </CardInfoDono>
      ) : (
        <CardInfoDono style={{ color: colors.textGray3 }}>
          @{league.dono.name}
        </CardInfoDono>
      );
    }
    return <View />;
  }

  function handleNavigateLeague() {
    if (isClicked) {
      const isDono = league.dono.email === user?.email;
      navigation.navigate('LeagueShowScreen', {
        league,
        isLeagueHeartClub,
        clubeId,
        isDono,
        user,
        position,
        point,
      });
    }
  }

  return (
    <CardTouch onPress={handleNavigateLeague}>
      <CardImage resizeMode="contain" source={league.logo} />
      <CardInfoView>
        <CardInfoTitle numberOfLines={1}>{league.name}</CardInfoTitle>
        {viewDono()}
        <CardInfoUserView>
          <CardInfoUserPos>{position ? `${position}.` : ''}</CardInfoUserPos>
          <CardInfoUserName numberOfLines={1}>
            {point.user.name || ''}
          </CardInfoUserName>
          <CardInfoUserPoint>{point.points || ''}</CardInfoUserPoint>
        </CardInfoUserView>
      </CardInfoView>
    </CardTouch>
  );
}
