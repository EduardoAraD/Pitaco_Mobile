import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import { useAuth } from '../../contexts/auth';

import ThemeLigth from '../../assets/theme/light';
import ThemeDark from '../../assets/theme/dark';

const styles = StyleSheet.create({
  textbutton: {
    fontSize: 20,
    fontFamily: 'SairaSemiCondensed-Bold',
  },
  buttonContinuar: {
    height: 64,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});

interface Props {
  onPress: Function;
}

export default function ContinuarComponent(props: Props) {
  const { themeDark } = useAuth();
  const theme = themeDark ? ThemeDark : ThemeLigth;

  return (
    <TouchableOpacity
      style={[
        styles.buttonContinuar,
        { backgroundColor: theme.greenSecundary },
      ]}
      onPress={() => props.onPress()}
    >
      <Text style={[styles.textbutton, { color: theme.whitePrimary }]}>
        Continuar
      </Text>
    </TouchableOpacity>
  );
}
