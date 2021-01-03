import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import { useAuth } from '../../contexts/auth';

import ThemeLigth from '../../assets/theme/light';
import ThemeDark from '../../assets/theme/dark';

const styles = StyleSheet.create({
  botton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    height: 64,
    borderRadius: 20,
    elevation: 2,
  },
  text: {
    fontSize: 20,
    fontFamily: 'SairaSemiCondensed-Bold',
  },
});

interface Props {
  onPress: Function;
}

export default function ButtonConfirmComponent(props: Props) {
  const { themeDark } = useAuth();
  const theme = themeDark ? ThemeDark : ThemeLigth;

  return (
    <TouchableOpacity
      onPress={() => props.onPress()}
      style={[styles.botton, { backgroundColor: theme.greenSecundary }]}
    >
      <Text style={[styles.text, { color: theme.textWhite }]}>Confirmar</Text>
    </TouchableOpacity>
  );
}
