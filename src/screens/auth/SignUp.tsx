import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
/* eslint import/no-unresolved: */
import CheckBox from '@react-native-community/checkbox';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';

import { useNavigation, CommonActions } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth';

import TitleComponent from '../../components/TitleComponent';
import ButtonConfirm from '../../components/buttons/BottonConfirmComponent';
import InputComponent from '../../components/InputComponent';
import ModalComponent from '../../components/ModalComponent';
import LoadingResponse from '../../components/LoadingResponse';

import colors from '../../assets/theme/light';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.backgroundWhite,
  },
  inputContent: {
    minHeight: 350,
    flex: 1,
    justifyContent: 'space-around',
  },
  checkboxContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkboxText: {
    color: colors.textGray2,
    fontFamily: 'SairaSemiCondensed-Light',
  },
});

export default function SignUp() {
  const navigation = useNavigation();
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
    <View style={{ flex: 1 }}>
      {loading ? <LoadingResponse /> : <View />}
      <View style={styles.container}>
        <ScrollView>
          <TitleComponent text="Cadastre-se e desafie seus amigos no Appitacos" />
          <View style={styles.inputContent}>
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
            <View style={styles.checkboxContent}>
              <CheckBox
                value={acceptTerms}
                onValueChange={(value) => setAcceptTerms(value)}
              />
              <TouchableOpacity
                style={{ marginLeft: 2, padding: 5 }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.checkboxText}>Termos de uso</Text>
              </TouchableOpacity>
            </View>
            <ModalComponent
              visible={modalVisible}
              setVisible={setModalVisible}
            />
          </View>
          <ButtonConfirm onPress={handleSignUp} />
        </ScrollView>
      </View>
    </View>
  );
}
