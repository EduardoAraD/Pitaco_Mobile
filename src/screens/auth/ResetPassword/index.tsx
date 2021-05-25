import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';
import { ThemeContext } from 'styled-components';

import { useAuth } from '../../../contexts/auth';

import TitleComponent from '../../../components/TitleComponent';
import InputComponent from '../../../components/InputComponent';
import ButtonConfirm from '../../../components/ButtonConfirm';
import LoadingResponse from '../../../components/LoadingResponse';

import { Container, ContainerSafe } from './styles';

export default function ResetPassword() {
  const navigation = useNavigation();
  const { colors } = useContext(ThemeContext);
  const { resetPassword } = useAuth();

  const [codig, setCodig] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleConfirm() {
    setLoading(true);
    const { success, error } = await resetPassword(
      codig,
      password,
      confirmPassword
    );
    if (success !== '') {
      navigation.navigate('SuccessPassword');
    } else {
      Snackbar.show({
        text: error,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: colors.textRed,
        textColor: colors.textWhite,
        fontFamily: 'SairaSemiCondensed-Medium',
      });
    }
    setLoading(false);
  }

  return (
    <ContainerSafe>
      {loading ? <LoadingResponse /> : <View />}
      <Container>
        <ScrollView>
          <View style={{ height: 20 }} />
          <TitleComponent text="Escreva o código recebido pelo e-mail junto com a nova senha" />
          <InputComponent
            label="Código"
            placeholder="Código"
            value={codig}
            onChange={setCodig}
          />
          <InputComponent
            label="Senha"
            placeholder="Senha"
            password
            value={password}
            onChange={setPassword}
          />
          <InputComponent
            label="Confirme a senha"
            placeholder="Senha"
            password
            value={confirmPassword}
            onChange={setConfirmPassword}
          />
        </ScrollView>
        <ButtonConfirm onPress={handleConfirm} />
      </Container>
    </ContainerSafe>
  );
}
