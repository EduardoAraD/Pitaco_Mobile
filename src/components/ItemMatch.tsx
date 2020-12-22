import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { useAuth } from '../contexts/auth';

import { Match } from '../models/Match';

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    paddingVertical: 2,
    paddingHorizontal: 4,
    alignItems: 'center',
    borderTopWidth: 1,
  },
  cardGame: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardGameImg: {
    height: 30,
    width: 30,
  },
  cardGameItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  cardGamePlacar: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  textCardStadium: {
    fontSize: 9,
    fontFamily: 'SairaSemiCondensed-Medium',
  },
  textCardHora: {
    fontSize: 7,
    fontFamily: 'SairaSemiCondensed-Light',
  },
  textCardPlacar: {
    fontSize: 25,
    fontFamily: 'SairaSemiCondensed-Bold',
  },
  textCardName: {
    fontSize: 12,
    fontFamily: 'SairaSemiCondensed-Bold',
  },
});

interface Props {
  match: Match;
}

export default function ItemMatch({ match }: Props) {
  const { theme } = useAuth();

  return (
    <View style={[styles.cardContainer, { borderColor: theme.textGray4 }]}>
      <Text style={[styles.textCardStadium, { color: theme.textGray2 }]}>
        Campeonato Brasileiro A 2020 - {match.stadium}
      </Text>
      <View style={styles.cardGame}>
        <View style={styles.cardGameItem}>
          <Image
            style={styles.cardGameImg}
            resizeMode="contain"
            source={{ uri: match.clubeHome.logo }}
          />
          <Text
            style={[styles.textCardName, { color: theme.textGray2 }]}
            numberOfLines={1}
          >
            {match.clubeHome.name}
          </Text>
        </View>
        <View style={styles.cardGamePlacar}>
          <Text
            style={[styles.textCardHora, { color: theme.textGray3 }]}
          >{`${match.date} - ${match.hour}`}</Text>
          <Text style={[styles.textCardPlacar, { color: theme.textGray1 }]}>
            {match.status === 'finished'
              ? `${match.golsHome} - ${match.golsAway}`
              : '  -  '}
          </Text>
        </View>
        <View style={[styles.cardGameItem, { alignItems: 'flex-start' }]}>
          <Image
            style={styles.cardGameImg}
            resizeMode="contain"
            source={{ uri: match.clubeAway.logo }}
          />
          <Text
            style={[styles.textCardName, { color: theme.textGray2 }]}
            numberOfLines={1}
          >
            {match.clubeAway.name}
          </Text>
        </View>
      </View>
    </View>
  );
}
