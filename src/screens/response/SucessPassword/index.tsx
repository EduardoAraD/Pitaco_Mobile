import React from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';

import { ButtonStyle, ContainerSafe, TextStyle } from './styles';

export default function SucessPassword() {
  const navigation = useNavigation();

  function handleContinuar() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  }

  return (
    <ContainerSafe>
      <TextStyle>Senha alterada com sucesso.</TextStyle>
      <ButtonStyle onPress={handleContinuar}>
        <TextStyle>Continuar</TextStyle>
      </ButtonStyle>
    </ContainerSafe>
  );
}
