import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useAuth } from '../contexts/auth';

const styles = StyleSheet.create({
  titleCard: {
    height: 50,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
});

interface Props {
  title: string;
}

export default function CardTitlePage({ title }: Props) {
  const { theme } = useAuth();

  return (
    <View style={[styles.titleCard, { backgroundColor: theme.whitePrimary }]}>
      <Text style={[styles.textTitle, { color: theme.textGray2 }]}>
        {title}
      </Text>
    </View>
  );
}
