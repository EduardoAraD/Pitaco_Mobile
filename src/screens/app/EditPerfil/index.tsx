import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import Axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';
import { CommonActions, useNavigation } from '@react-navigation/native';

import { ThemeContext } from 'styled-components';
import { useAuth } from '../../../contexts/auth';

import InputComponent from '../../../components/InputComponent';
import ButtonConfirmComponent from '../../../components/ButtonConfirm';
import TitleComponent from '../../../components/TitleComponent';
import LoadingResponse from '../../../components/LoadingResponse';

import {
  ButtonStyle,
  ImgStyle,
  ImgStyleView,
  ContainerSafe,
  InfoUrl,
  InfoUrlvalid,
  TextButton,
  TextImg,
} from './styles';

export default function EditPerfil() {
  const { colors } = useContext(ThemeContext);
  const { user, updateUserPerfil } = useAuth();
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
      textColor: colors.textWhite,
      fontFamily: 'SairaSemiCondensed-Medium',
    });
  }

  function getAvatar() {
    return validedUrl ? (
      <ImgStyle source={{ uri: avatarValid }} resizeMode="contain" />
    ) : (
      <ImgStyleView>
        <TextImg>Imagem não encontrada</TextImg>
      </ImgStyleView>
    );
  }

  async function handleConfirm() {
    setLoadingResponse(true);
    await checkUrlLogo(avatarValid);
    if (!validedUrl) {
      messageSnackbar('Link de imagem não validado', colors.textRed);
      setLoadingResponse(false);
      return;
    }
    const error = await updateUserPerfil(user?.email || '', name, avatar);
    if (error !== '') {
      messageSnackbar(error, colors.textRed);
      setLoadingResponse(false);
      return;
    }
    setLoadingResponse(false);
    messageSnackbar('Alterado com sucesso!', colors.greenSecundary);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Perfil' }],
      })
    );
  }

  return (
    <ContainerSafe>
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
        <InfoUrl>
          {getAvatar()}
          <InfoUrlvalid>
            <InputComponent
              label="Escreva um link de imagem"
              placeholder="Link url"
              keyboardType="url"
              value={avatar}
              onChange={setAvatar}
            />
            <ButtonStyle onPress={() => checkUrlLogo(avatar)}>
              <TextButton>Validar Url</TextButton>
            </ButtonStyle>
          </InfoUrlvalid>
        </InfoUrl>
        <View style={{ height: 30 }} />
        <ButtonConfirmComponent onPress={handleConfirm} />
      </ScrollView>
    </ContainerSafe>
  );
}
