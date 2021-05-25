import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import { ThemeContext } from 'styled-components';

import { useAuth } from '../../../contexts/auth';

import TitleComponent from '../../../components/TitleComponent';
import InputComponent from '../../../components/InputComponent';
import ContinuarComponent from '../../../components/ButtonContinue';
import LoadingResponse from '../../../components/LoadingResponse';

import { Container, ContainerEmail, ContainerSafe } from './styles';

export default function ForgotPassword() {
  const navigation = useNavigation();
  const { forgotPassword } = useAuth();
  const { colors } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  async function handleForgotPassword() {
    setLoading(true);
    const { success, error } = await forgotPassword(email);
    if (success !== '') {
      Snackbar.show({
        text: success,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: colors.greenPrimary,
        textColor: colors.textWhite,
        fontFamily: 'SairaSemiCondensed-Medium',
      });
      navigation.navigate('ResetPassword');
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
        <TitleComponent text="Será enviado um código para seu email para redefinição de senha" />
        <ContainerEmail>
          <InputComponent
            label="E-mail"
            placeholder="E-mail"
            onChange={setEmail}
            value={email}
            keyboardType="email-address"
          />
        </ContainerEmail>
        <ContinuarComponent onPress={handleForgotPassword} />
      </Container>
    </ContainerSafe>
  );
}
