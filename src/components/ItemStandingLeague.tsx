import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { useAuth } from '../contexts/auth';

import { Point } from '../models/Point';

const styles = StyleSheet.create({
  container: {
    height: 40,
    padding: 5,
    paddingHorizontal: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderTopWidth: 1,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
  img: {
    height: 30,
    width: 30,
    marginHorizontal: 5,
  },
  textName: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  textPoint: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

interface Props {
  point: Point;
  position: number;
  isUser: boolean;
}

export default function ItemStandingLeague({ point, position, isUser }: Props) {
  const { theme } = useAuth();

  return (
    <View style={[styles.container, { borderTopColor: theme.textGray4 }]}>
      <Text style={[styles.text, { color: theme.textGray3 }]}>{position}.</Text>
      <Image
        style={styles.img}
        resizeMode="contain"
        source={{ uri: point.user.avatar }}
      />
      <Text
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
