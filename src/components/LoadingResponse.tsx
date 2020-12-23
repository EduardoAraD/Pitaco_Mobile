import React from 'react';
import { StyleSheet, View } from 'react-native';
import Lottie from 'lottie-react-native';

import animate from '../assets/animate/17378-soccer-loading.json';

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#44444477',
    zIndex: 55,
  },
  viewAnimate: {
    position: 'absolute',
    bottom: 2,
    right: 2,
  },
  animate: {
    height: 100,
    width: 100,
  },
});

export default function LoadingResponse() {
  return (
    <View style={styles.loading}>
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
