import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';

import { ThemeContext } from 'styled-components';
import { useAuth } from '../../../contexts/auth';

import HeaderComponent from '../../../components/HeaderComponent';
import CardConquest from '../../../components/CardConquest';

import { User } from '../../../models/User';
import { League } from '../../../models/League';

import { getCommomLeagues } from '../../../services/league';

import {
  // ButtonStyle,
  CardImg,
  // ButtonStyleNot,
  CardInfo,
  CardInfoDono,
  // CardInfoTitle,
  CardStyle,
  ContainerSafe,
  ScrollBody,
  ScrollHorizontal,
  // TextButtonStyle,
  TextTitle,
  ViewCards,
  ViewClub,
  ViewClubImg,
  ViewClubName,
} from './styles';

type ParamList = {
  Friend: {
    friend: User;
  };
};

export default function FriendShow() {
  const { colors } = useContext(ThemeContext);
  const { user } = useAuth();
  const route = useRoute<RouteProp<ParamList, 'Friend'>>();
  const { friend } = route.params;
  const [leagues, setLeagues] = useState<League[]>([]);

  async function loadingData() {
    const { data, error } = await getCommomLeagues(
      user?.email || '',
      friend.email
    );
    if (error === '') {
      setLeagues(data);
    } else {
      Snackbar.show({
        text: error,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: colors.textRed,
        textColor: colors.textWhite,
        fontFamily: 'SairaSemiCondensed-Medium',
      });
    }
  }

  useEffect(() => {
    loadingData();
  }, []);

  function viewDono(league: League) {
    if (league.dono.name) {
      return league.dono.email === friend.email ? (
        <CardInfoDono principal>@{league.dono.name}</CardInfoDono>
      ) : (
        <CardInfoDono>@{league.dono.name}</CardInfoDono>
      );
    }
    return <View />;
  }

  return (
    <ContainerSafe>
      <HeaderComponent title={friend.name} back border />
      <ScrollBody>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}
        >
          <TextTitle>Torcedor(a)</TextTitle>
        </View>
        {friend.heartClub.name ? (
          <ViewClub>
            <ViewClubName>{friend.heartClub.name}</ViewClubName>
            <ViewClubImg
              resizeMode="contain"
              source={{ uri: friend.heartClub.logo }}
            />
          </ViewClub>
        ) : (
          <ViewClub>
            <ViewClubName>Sem Clube</ViewClubName>
          </ViewClub>
        )}
        <TextTitle>Maiores Conquistas</TextTitle>
        <ScrollHorizontal horizontal>
          {friend.conquests.map((conquest) => (
            <CardConquest conquest={conquest} key={conquest.id} />
          ))}
        </ScrollHorizontal>
        <TextTitle>Ligas atuais em Comum</TextTitle>
        <ViewCards>
          {leagues.map((league) => (
            <CardStyle key={league.id}>
              <CardImg resizeMode="contain" source={league.logo} />
              <CardInfo>
                <TextTitle>{league.name}</TextTitle>
                {viewDono(league)}
              </CardInfo>
            </CardStyle>
          ))}
        </ViewCards>
      </ScrollBody>
    </ContainerSafe>
  );
}
