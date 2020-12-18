import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '../../contexts/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function LoadingPage() {
  const { theme } = useAuth();

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.greenPrimary} />
    </View>
  );
}
