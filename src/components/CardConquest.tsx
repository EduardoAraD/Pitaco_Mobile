import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { Conquest } from '../models/Conquest';

import { useAuth } from '../contexts/auth';

const styles = StyleSheet.create({
  card: {
    height: 50,
    width: 180,
    marginRight: 10,
    borderRadius: 10,
    padding: 5,
    flexDirection: 'row',
    elevation: 1,
  },
  cardImg: {
    height: 40,
    width: 40,
    marginRight: 2,
  },
  cardInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardInfoName: {
    fontSize: 13,
    fontFamily: 'SairaSemiCondensed-Bold',
  },
  cardInfoPos: {
    fontSize: 10,
    fontFamily: 'SairaSemiCondensed-Medium',
  },
});

interface Props {
  conquest: Conquest;
}

export default function CardConquest({ conquest }: Props) {
  const { theme } = useAuth();

  return (
    <View style={[styles.card, { backgroundColor: theme.whitePrimary }]}>
      <Image
        style={styles.cardImg}
        resizeMode="contain"
        source={conquest.league.logo}
      />
      <View style={styles.cardInfo}>
        <Text style={[styles.cardInfoName, { color: theme.yellowPrimary }]}>
          {conquest.league.name}
        </Text>
        <Text style={[styles.cardInfoPos, { color: theme.textGray2 }]}>
          {conquest.position}° Lugar
        </Text>
      </View>
    </View>
  );
}
