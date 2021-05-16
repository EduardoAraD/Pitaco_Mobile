import React, { useContext } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import Lottie from 'lottie-react-native';
import { ThemeContext } from 'styled-components';
import { useAuth } from '../contexts/auth';

import AuthRoutes from './auth.routes';

import logoPitaco from '../assets/images/logo_pitaco_white.png';
import animate from '../assets/animate/17378-soccer-loading.json';

import { Container, ImageLogo, ViewAnimate } from './styles';

const styles = StyleSheet.create({
  animate: {
    height: 100,
    width: 100,
  },
});

export default function Routes() {
  const { loading } = useAuth();
  const { colors, title } = useContext(ThemeContext);

  if (loading) {
    return (
      <Container>
        <ImageLogo source={logoPitaco} resizeMode="contain" />
        <ViewAnimate>
          <Lottie
            style={styles.animate}
            resizeMode="contain"
            source={animate}
            autoPlay
            loop
          />
        </ViewAnimate>
      </Container>
    );
  }

  return (
    <>
      <StatusBar
        backgroundColor={colors.greenPrimary}
        barStyle={title === 'dark' ? 'dark-content' : 'light-content'}
      />
      <AuthRoutes />
    </>
  );
}
