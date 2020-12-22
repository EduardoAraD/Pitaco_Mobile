import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useAuth } from '../contexts/auth';

import { Clube } from '../models/Clube';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderLeftWidth: 3,
  },
  textPos: {
    width: 25,
    textAlign: 'right',
    fontSize: 16,
    fontFamily: 'SairaSemiCondensed-Bold',
  },
  img: {
    margin: 3,
    height: 34,
    width: 34,
    alignSelf: 'center',
  },
  areaValor: {
    display: 'flex',
    flexDirection: 'column',
    height: 40,
    width: '100%',
  },
  areaVariacao: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
  },
  textNome: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'SairaSemiCondensed-Bold',
  },
  areaText: {
    flex: 1,
    flexDirection: 'row',
  },
  textValor: {
    width: 20,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'SairaSemiCondensed-Light',
  },
});

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
  positionVariation,
  status,
}: Props) {
  const { theme } = useAuth();

  function textVariacao(num: number) {
    if (num > 0)
      return (
        <View style={styles.areaVariacao}>
          <Icon name="chevron-up-box" size={13} color={theme.greenSecundary} />
          <Text style={[styles.textValor, { color: theme.textGray2 }]}>
            {num}
          </Text>
        </View>
      );
    if (num === 0)
      return (
        <View style={styles.areaVariacao}>
          <Icon name="square" size={12} color={theme.bluePrimary} />
          <Text style={[styles.textValor, { color: theme.textGray2 }]}>
            {num}
          </Text>
        </View>
      );
    return (
      <View style={styles.areaVariacao}>
        <Icon name="chevron-down-box" size={13} color={theme.textRed} />
        <Text style={[styles.textValor, { color: theme.textGray2 }]}>
          {num * -1}
        </Text>
      </View>
    );
  }

  function colorBorderLeft() {
    switch (status) {
      case 'L':
        return theme.bluePrimary;
      case 'LQ':
        return theme.blueSecundary;
      case 'S':
        return theme.yellowPrimary;
      case 'R':
        return theme.textRed;
      default:
        return theme.whitePrimary;
    }
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.whitePrimary,
          borderBottomColor: theme.textGray4,
          borderLeftColor: colorBorderLeft(),
        },
      ]}
    >
      <Text style={[styles.textPos, { color: theme.textGray2 }]}>
        {position}.
      </Text>
      <Image
        style={styles.img}
        resizeMode="contain"
        source={{ uri: clube.logo }}
      />
      <View style={styles.areaValor}>
        <Text style={[styles.textNome, { color: theme.textGray2 }]}>
          {clube.name}
        </Text>
        <View style={styles.areaText}>
          {textVariacao(positionVariation || 0)}
          <Text style={[styles.textValor, { color: theme.textGray2 }]}>
            {points}
          </Text>
          <Text style={[styles.textValor, { color: theme.textGray2 }]}>
            {matchs}
          </Text>
          <Text style={[styles.textValor, { color: theme.textGray2 }]}>
            {wins}
          </Text>
          <Text style={[styles.textValor, { color: theme.textGray2 }]}>
            {golsDiff}
          </Text>
          <Text style={[styles.textValor, { color: theme.textGray2 }]}>
            {golsScore}
          </Text>
        </View>
      </View>
    </View>
  );
}
