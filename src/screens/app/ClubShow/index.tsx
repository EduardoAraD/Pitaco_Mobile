import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';

import { ThemeContext } from 'styled-components';
import { useAuth } from '../../../contexts/auth';

import HeaderComponent from '../../../components/HeaderComponent';
import ButtonConfirmComponent from '../../../components/ButtonConfirm';
import LoadingResponse from '../../../components/LoadingResponse';

import { Clube } from '../../../models/Clube';

import { chooseClub } from '../../../services/club';

import {
  CardImg,
  CardStyle,
  CardText,
  Container,
  ContainerSafe,
  ImgStyle,
  TextStyle,
  TitleTextInfo,
  ViewInfo,
} from './styles';

type ParamList = {
  Club: {
    clube: Clube;
  };
};

export default function ClubShow() {
  const { colors } = useContext(ThemeContext);
  const { user, updateUser } = useAuth();
  const route = useRoute<RouteProp<ParamList, 'Club'>>();
  const { clube } = route.params;
  const [loading, setLoading] = useState(false);

  function messageSnackbar(message: string, color: string) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: color,
      textColor: colors.textWhite,
      fontFamily: 'SairaSemiCondensed-Medium',
    });
  }

  async function handleConfirmButtom() {
    setLoading(true);
    const { data, error } = await chooseClub(user?.email || '', clube.id);
    if (error === '') {
      if (user) {
        user.heartClub = data.heartClub;
        updateUser({ ...user });
      }
      messageSnackbar('Clube escolhido com sucesso.', colors.greenSecundary);
    } else {
      messageSnackbar(error, colors.textRed);
    }
    setLoading(false);
  }

  function viewClubChoose() {
    return user?.heartClub.name ? (
      <CardStyle>
        <CardImg resizeMode="contain" source={{ uri: user.heartClub.logo }} />
        <CardText>{user.heartClub.name}</CardText>
      </CardStyle>
    ) : (
      <CardStyle style={{ justifyContent: 'center' }}>
        <CardText>Sem Clube</CardText>
      </CardStyle>
    );
  }

  return (
    <ContainerSafe>
      {loading ? <LoadingResponse /> : <View />}
      <HeaderComponent title={clube.name} back border />
      <Container>
        <TextStyle>Definir clube de coração</TextStyle>
        <ImgStyle source={{ uri: clube.logo }} />
        <TextStyle colorGreen>{clube.name}</TextStyle>
        <ViewInfo>
          <TitleTextInfo>Seu clube de coração atual</TitleTextInfo>
          {viewClubChoose()}
          <ButtonConfirmComponent onPress={handleConfirmButtom} />
        </ViewInfo>
      </Container>
    </ContainerSafe>
  );
}
