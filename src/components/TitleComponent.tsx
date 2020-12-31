import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useAuth } from '../contexts/auth';

import ThemeLigth from '../assets/theme/light';
import ThemeDark from '../assets/theme/dark';

interface Props {
  text: string;
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    borderBottomWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  text: {
    fontSize: 20,
    fontFamily: 'SairaSemiCondensed-Medium',
    textAlign: 'center',
  },
});

export default function TitleComponent({ text }: Props) {
  const { themeDark } = useAuth();
  const theme = themeDark ? ThemeDark : ThemeLigth;

  return (
    <View style={[styles.content, { borderBottomColor: theme.textGray4 }]}>
      <Text style={[styles.text, { color: theme.textGray3 }]}>{text}</Text>
    </View>
  );
}
