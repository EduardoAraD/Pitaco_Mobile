import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { Link, useNavigation, CommonActions } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';
import { ThemeContext } from 'styled-components';

import { useAuth } from '../../../contexts/auth';

import InputComponent from '../../../components/InputComponent';
import ButtonConfirm from '../../../components/ButtonConfirm';
import LoadingResponse from '../../../components/LoadingResponse';

import logoPitacoImg from '../../../assets/images/logo_pitaco_green.png';
import {
  Container,
  Scroll,
  ImageLeague,
  ViewLeagueContainer,
  TextLink,
} from './styles';

export default function Login() {
  const { colors } = useContext(ThemeContext);
  const navigation = useNavigation();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn() {
    setLoading(true);
    const error = await signIn(email, password);
    if (error !== '') {
      Snackbar.show({
        text: error,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: colors.textRed,
        textColor: colors.textWhite,
        fontFamily: 'SairaSemiCondensed-Medium',
      });
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        })
      );
    }
    setLoading(false);
  }

  return (
    <Container>
      {loading ? <LoadingResponse /> : <View />}
      <Scroll>
        <ImageLeague resizeMode="contain" source={logoPitacoImg} />
        <InputComponent
          label="E-mail"
          placeholder="E-mail"
          keyboardType="email-address"
          value={email}
          onChange={setEmail}
        />
        <InputComponent
          label="Senha"
          placeholder="Senha"
          value={password}
          password
          onChange={setPassword}
        />
        <ViewLeagueContainer>
          <Link to="/ForgotPassword">
            <TouchableOpacity style={{ paddingVertical: 10, paddingRight: 10 }}>
              <TextLink>Esqueceu a senha?</TextLink>
            </TouchableOpacity>
          </Link>
          <Link to="/SignUp">
            <TouchableOpacity style={{ paddingVertical: 10, paddingLeft: 10 }}>
              <TextLink>Cadastra-se</TextLink>
            </TouchableOpacity>
          </Link>
        </ViewLeagueContainer>
        <ButtonConfirm onPress={handleSignIn} />
      </Scroll>
    </Container>
  );
}
