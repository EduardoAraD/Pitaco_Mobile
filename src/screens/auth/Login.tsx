import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Link, useNavigation, CommonActions } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';

import { useAuth } from '../../contexts/auth';

import InputComponent from '../../components/InputComponent';
import ButtonConfirmComponent from '../../components/buttons/BottonConfirmComponent';
import LoadingResponse from '../../components/LoadingResponse';

import colors from '../../assets/theme/light';
import logoPitacoImg from '../../assets/images/logo_pitaco_green.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundWhite,
  },
  scroll: {
    paddingHorizontal: 20,
    width: '100%',
  },
  leagueImg: {
    height: 250,
    width: 250,
    margin: 20,
    alignSelf: 'center',
  },
  linkContainer: {
    width: '100%',
    marginBottom: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  linkText: {
    color: colors.textGray2,
    fontFamily: 'SairaSemiCondensed-Light',
  },
});

export default function Login() {
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
    <View style={styles.container}>
      {loading ? <LoadingResponse /> : <View />}
      <ScrollView style={styles.scroll}>
        <Image
          style={styles.leagueImg}
          resizeMode="contain"
          source={logoPitacoImg}
        />
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
        <View style={styles.linkContainer}>
          <Link to="/ForgotPassword">
            <TouchableOpacity style={{ paddingVertical: 10, paddingRight: 10 }}>
              <Text style={styles.linkText}>Esqueceu a senha?</Text>
            </TouchableOpacity>
          </Link>
          <Link to="/SignUp">
            <TouchableOpacity style={{ paddingVertical: 10, paddingLeft: 10 }}>
              <Text style={styles.linkText}>Cadastra-se</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <ButtonConfirmComponent onPress={handleSignIn} />
      </ScrollView>
    </View>
  );
}
