import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';

import { useAuth } from '../../contexts/auth';

import TitleComponent from '../../components/TitleComponent';
import InputComponent from '../../components/InputComponent';
import ContinuarComponent from '../../components/buttons/ContinuarComponent';
import LoadingResponse from '../../components/LoadingResponse';

import colors from '../../assets/theme/light';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.backgroundWhite,
  },
  containerEmail: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonEmail: {
    height: 64,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,

    backgroundColor: colors.bluePrimary,
  },
});

export default function ForgotPassword() {
  const navigation = useNavigation();
  const { forgotPassword } = useAuth();
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
    <View style={{ flex: 1 }}>
      {loading ? <LoadingResponse /> : <View />}
      <View style={styles.container}>
        <TitleComponent text="Será enviado um código para seu email para redefinição de senha" />
        <View style={styles.containerEmail}>
          <InputComponent
            label="E-mail"
            placeholder="E-mail"
            onChange={setEmail}
            value={email}
            keyboardType="email-address"
          />
        </View>
        <ContinuarComponent onPress={handleForgotPassword} />
      </View>
    </View>
  );
}
