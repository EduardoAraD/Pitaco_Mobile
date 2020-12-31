import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useAuth } from '../contexts/auth';

import ThemeLigth from '../assets/theme/light';
import ThemeDark from '../assets/theme/dark';

const styles = StyleSheet.create({
  titleCard: {
    height: 50,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 18,
    fontFamily: 'SairaSemiCondensed-Light',
  },
});

interface Props {
  title: string;
}

export default function CardTitlePage({ title }: Props) {
  const { themeDark } = useAuth();
  const theme = themeDark ? ThemeDark : ThemeLigth;

  return (
    <View style={[styles.titleCard, { backgroundColor: theme.whitePrimary }]}>
      <Text style={[styles.textTitle, { color: theme.textGray2 }]}>
        {title}
      </Text>
    </View>
  );
}
