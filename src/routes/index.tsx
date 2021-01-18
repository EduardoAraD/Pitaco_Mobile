import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Lottie from 'lottie-react-native';
import { useAuth } from '../contexts/auth';

import AuthRoutes from './auth.routes';

import colors from '../assets/theme/light';

import logoPitaco from '../assets/images/logo_pitaco_white.png';
import animate from '../assets/animate/17378-soccer-loading.json';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.greenPrimary,
  },
  logo: {
    height: 200,
    width: 200,
  },
  viewAnimate: {
    position: 'absolute',
    bottom: 1,
    right: 1,
  },
  animate: {
    height: 100,
    width: 100,
  },
});

export default function Routes() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.container}>
        <Image source={logoPitaco} style={styles.logo} resizeMode="contain" />
        <View style={styles.viewAnimate}>
          <Lottie
            style={styles.animate}
            resizeMode="contain"
            source={animate}
            autoPlay
            loop
          />
        </View>
      </View>
    );
  }

  return <AuthRoutes />;
}
