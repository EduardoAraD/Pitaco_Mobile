import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { useAuth } from '../contexts/auth';

import { Point } from '../models/Point';

import ThemeLigth from '../assets/theme/light';
import ThemeDark from '../assets/theme/dark';

const styles = StyleSheet.create({
  container: {
    height: 40,
    padding: 5,
    paddingHorizontal: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  text: {
    fontSize: 14,
    fontFamily: 'SairaSemiCondensed-Light',
  },
  img: {
    height: 30,
    width: 30,
    marginHorizontal: 5,
  },
  textName: {
    fontFamily: 'SairaSemiCondensed-Bold',
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  textPoint: {
    fontSize: 17,
    fontFamily: 'SairaSemiCondensed-Medium',
  },
});

interface Props {
  point: Point;
  position: number;
  isUser: boolean;
}

export default function ItemStandingLeague({ point, position, isUser }: Props) {
  const { themeDark } = useAuth();
  const theme = themeDark ? ThemeDark : ThemeLigth;

  return (
    <View
      style={[
        styles.container,
        {
          borderTopColor: theme.textGray4,
          backgroundColor: theme.whitePrimary,
        },
      ]}
    >
      <Text style={[styles.text, { color: theme.textGray3 }]}>{position}.</Text>
      <Image
        style={styles.img}
        resizeMode="contain"
        source={{ uri: point.user.avatar }}
      />
      <Text
        numberOfLines={1}
        style={[
          styles.textName,
          { color: isUser ? theme.greenPrimary : theme.textGray2 },
        ]}
      >
        {point.user.name}
      </Text>
      <Text style={[styles.textPoint, { color: theme.greenPrimary }]}>
        {point.points}
      </Text>
      <Text
        style={[
          styles.text,
          { color: theme.textGray3, width: 34, textAlign: 'right' },
        ]}
      >
        {point.exactScore}
      </Text>
    </View>
  );
}
