import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useAuth } from '../../contexts/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 20,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'SairaSemiCondensed-Bold',
  },
  bottom: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    height: 64,
    borderRadius: 20,
  },
});

export default function SucessPassword() {
  const { theme } = useAuth();
  const navigation = useNavigation();

  function handleContinuar() {
    navigation.navigate('Login');
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.greenPrimary }]}>
      <Text style={[styles.text, { color: theme.textWhite }]}>
        Senha alterada com sucesso.
      </Text>
      <TouchableOpacity
        onPress={handleContinuar}
        style={[styles.bottom, { backgroundColor: theme.greenSecundary }]}
      >
        <Text style={[styles.text, { color: theme.textWhite }]}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}
