import React from 'react';
import { StyleSheet } from 'react-native';
import Lottie from 'lottie-react-native';

import animate from '../../assets/animate/17378-soccer-loading.json';
import { SafeLoading, ViewAnimate } from './styles';

const styles = StyleSheet.create({
  animate: {
    height: 100,
    width: 100,
  },
});

export default function LoadingResponse() {
  return (
    <SafeLoading>
      <ViewAnimate>
        <Lottie
          style={styles.animate}
          resizeMode="contain"
          source={animate}
          autoPlay
          loop
        />
      </ViewAnimate>
    </SafeLoading>
  );
}
