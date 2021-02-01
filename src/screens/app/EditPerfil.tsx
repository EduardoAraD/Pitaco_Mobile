import React, { useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import Axios from 'axios';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';
import { CommonActions, useNavigation } from '@react-navigation/native';

import { useAuth } from '../../contexts/auth';

import InputComponent from '../../components/InputComponent';
import ButtonConfirmComponent from '../../components/buttons/BottonConfirmComponent';
import TitleComponent from '../../components/TitleComponent';

import ColorsDark from '../../assets/theme/dark';
import ColorsLight from '../../assets/theme/light';
import LoadingResponse from '../../components/LoadingResponse';

const styles = StyleSheet.create({
  img: {
    height: 100,
    width: 100,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
  },
  textImg: {
    fontFamily: 'SairaSemiCondensed-Regular',
    textAlign: 'center',
  },
  infoUrl: {
    flexDirection: 'row',
    marginVertical: 20,
    alignItems: 'center',
  },
  infoUrlValid: {
    flex: 1,
    justifyContent: 'space-around',
  },
  button: {
    width: '100%',
    height: 30,
    borderRadius: 15,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontFamily: 'SairaSemiCondensed-Medium',
    fontSize: 16,
  },
});

export default function EditPerfil() {
  const { themeDark, user, updateUserPerfil } = useAuth();
  const theme = themeDark ? ColorsDark : ColorsLight;
  const navigation = useNavigation();
  const [name, setName] = useState(user?.name || '');
  const [validedUrl, setValidedUrl] = useState(false);
  const [avatarValid, setAvatarValid] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loadingResponse, setLoadingResponse] = useState(false);

  async function checkUrlLogo(url: string) {
    Axios.get(url)
      .then(() => {
        setAvatarValid(url);
        setValidedUrl(true);
      })
      .catch(() => {
        setValidedUrl(false);
        setAvatarValid('');
      });
  }

  function messageSnackbar(message: string, color: string) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: color,
      textColor: theme.textWhite,
      fontFamily: 'SairaSemiCondensed-Medium',
    });
  }

  function getAvatar() {
    return validedUrl ? (
      <Image
        style={[styles.img, { borderColor: theme.textGray4 }]}
        source={{ uri: avatarValid }}
        resizeMode="contain"
      />
    ) : (
      <View style={[styles.img, { borderColor: theme.textGray4 }]}>
        <Text style={[styles.textImg, { color: theme.textGray2 }]}>
          Imagem não encontrada
        </Text>
      </View>
    );
  }

  async function handleConfirm() {
    setLoadingResponse(true);
    await checkUrlLogo(avatarValid);
    if (!validedUrl) {
      messageSnackbar('Link de imagem não validado', theme.textRed);
      setLoadingResponse(false);
      return;
    }
    const error = await updateUserPerfil(user?.email || '', name, avatar);
    if (error !== '') {
      messageSnackbar(error, theme.textRed);
      setLoadingResponse(false);
      return;
    }
    setLoadingResponse(false);
    messageSnackbar('Alterado com sucesso!', theme.greenSecundary);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Perfil' }],
      })
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundWhite }}>
      {loadingResponse ? <LoadingResponse /> : <View />}
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <View style={{ height: 20 }} />
        <TitleComponent text="Você poderá alterar seu NickName e sua imagem de Avatar." />
        <View style={{ height: 20 }} />
        <InputComponent
          label="Nickname"
          placeholder="Nickname"
          keyboardType="default"
          value={name}
          onChange={setName}
        />
        <View style={styles.infoUrl}>
          {getAvatar()}
          <View style={styles.infoUrlValid}>
            <InputComponent
              label="Escreva um link de imagem"
              placeholder="Link url"
              keyboardType="url"
              value={avatar}
              onChange={setAvatar}
            />
            <TouchableOpacity
              onPress={() => checkUrlLogo(avatar)}
              style={[styles.button, { backgroundColor: theme.greenSecundary }]}
            >
              <Text style={[styles.textButton, { color: theme.whitePrimary }]}>
                Validar Url
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 30 }} />
        <ButtonConfirmComponent onPress={handleConfirm} />
      </ScrollView>
    </View>
  );
}
