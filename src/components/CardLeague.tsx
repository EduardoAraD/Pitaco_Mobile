import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../contexts/auth';

import { League } from '../models/League';
import { Point } from '../models/Point';
import { User } from '../models/User';

const styles = StyleSheet.create({
  card: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    borderRadius: 20,
    elevation: 3,
  },
  cardImg: {
    height: 60,
    width: 60,
  },
  cardInfo: {
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  cardInfoTitle: {
    fontSize: 15,
    fontFamily: 'SairaSemiCondensed-Bold',
  },
  cardInfoDono: {
    fontSize: 10,
    fontFamily: 'SairaSemiCondensed-Light',
  },
  cardInfoUser: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardInfoUserPos: {
    fontSize: 13,
    fontFamily: 'SairaSemiCondensed-Light',
  },
  cardInfoUserName: {
    marginLeft: 2,
    fontSize: 15,
    fontFamily: 'SairaSemiCondensed-Bold',
  },
  cardInfoUserPoint: {
    fontSize: 15,
    fontFamily: 'SairaSemiCondensed-Bold',
    flex: 1,
    textAlign: 'right',
  },
});

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
  const { theme } = useAuth();
  const navigation = useNavigation();

  function viewDono() {
    if (league.dono.name) {
      return league.dono.email === user.email ? (
        <Text style={[styles.cardInfoDono, { color: theme.yellowPrimary }]}>
          @{league.dono.name}
        </Text>
      ) : (
        <Text style={[styles.cardInfoDono, { color: theme.textGray3 }]}>
          @{league.dono.name}
        </Text>
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
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.whitePrimary }]}
      onPress={handleNavigateLeague}
    >
      <Image style={styles.cardImg} resizeMode="contain" source={league.logo} />
      <View style={styles.cardInfo}>
        <Text
          style={[styles.cardInfoTitle, { color: theme.greenPrimary }]}
          numberOfLines={1}
        >
          {league.name}
        </Text>
        {viewDono()}
        <View style={styles.cardInfoUser}>
          <Text style={[styles.cardInfoUserPos, { color: theme.textGray3 }]}>
            {position ? `${position}.` : ''}
          </Text>
          <Text
            style={[styles.cardInfoUserName, { color: theme.textGray1 }]}
            numberOfLines={1}
          >
            {point.user.name || ''}
          </Text>
          <Text
            style={[styles.cardInfoUserPoint, { color: theme.greenPrimary }]}
          >
            {point.points || ''}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
