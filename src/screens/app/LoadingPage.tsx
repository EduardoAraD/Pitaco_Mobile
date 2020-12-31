import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import { useAuth } from '../../contexts/auth';

import ThemeLigth from '../../assets/theme/light';
import ThemeDark from '../../assets/theme/dark';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function LoadingPage() {
  const { themeDark } = useAuth();
  const theme = themeDark ? ThemeDark : ThemeLigth;

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundWhite }]}
    >
      <ActivityIndicator size="large" color={theme.greenPrimary} />
    </View>
  );
}
