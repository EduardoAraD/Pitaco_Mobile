import React, { useContext, useState } from 'react';
import { View } from 'react-native';
/* eslint import/no-unresolved: */
import CheckBox from '@react-native-community/checkbox';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';

import { useNavigation, CommonActions } from '@react-navigation/native';
import { ThemeContext } from 'styled-components';
import { useAuth } from '../../../contexts/auth';

import TitleComponent from '../../../components/TitleComponent';
import ButtonConfirm from '../../../components/ButtonConfirm';
import InputComponent from '../../../components/InputComponent';
import ModalComponent from '../../../components/ModalComponent';
import LoadingResponse from '../../../components/LoadingResponse';

import {
  ContainerSafe,
  CheckBoxContextView,
  CheckBoxText,
  Container,
  InputContentView,
} from './styles';

export default function SignUp() {
  const navigation = useNavigation();
  const { colors } = useContext(ThemeContext);
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  async function handleSignUp() {
    setLoading(true);
    const error = await signUp(
      name,
      email,
      password,
      confirmPassword,
      acceptTerms
    );
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
    <ContainerSafe>
      {loading ? <LoadingResponse /> : <View />}
      <Container>
        <ScrollView>
          <TitleComponent text="Cadastre-se e desafie seus amigos no Appitacos" />
          <InputContentView>
            <InputComponent
              label="Nickname"
              placeholder="Nickname"
              onChange={setName}
              value={name}
            />
            <InputComponent
              label="E-mail"
              placeholder="E-mail"
              keyboardType="email-address"
              onChange={setEmail}
              value={email}
            />
            <InputComponent
              label="Senha"
              placeholder="Senha"
              password
              onChange={setPassword}
              value={password}
            />
            <InputComponent
              label="Confirme a senha"
              placeholder="Senha"
              password
              onChange={setConfirmPassword}
              value={confirmPassword}
            />
            <CheckBoxContextView>
              <CheckBox
                value={acceptTerms}
                onValueChange={(value) => setAcceptTerms(value)}
              />
              <TouchableOpacity
                style={{ marginLeft: 2, padding: 5 }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <CheckBoxText>Termos de uso</CheckBoxText>
              </TouchableOpacity>
            </CheckBoxContextView>
            <ModalComponent
              visible={modalVisible}
              setVisible={setModalVisible}
            />
          </InputContentView>
          <ButtonConfirm onPress={handleSignUp} />
        </ScrollView>
      </Container>
    </ContainerSafe>
  );
}
