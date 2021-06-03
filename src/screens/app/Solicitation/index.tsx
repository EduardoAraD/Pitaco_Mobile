import React, { useContext, useEffect, useState } from 'react';
import { View, RefreshControl } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';

import { ThemeContext } from 'styled-components';

import TitleComponent from '../../../components/TitleComponent';

import { User } from '../../../models/User';
import { League } from '../../../models/League';

import {
  getSolitationLeague,
  resultSolicitation,
} from '../../../services/league';

import {
  CardAction,
  CardActionButton,
  CardActionButtonText,
  CardInfo,
  CardInfoImg,
  CardInfoUser,
  CardInfoUserClub,
  CardInfoUserClubeImg,
  CardInfoUserClubeName,
  CardInfoUserName,
  CardView,
  ContainerSafe,
  ScrollStyle,
} from './styles';

type ParamList = {
  League: {
    league: League;
  };
};

export default function Solicitation() {
  const { colors } = useContext(ThemeContext);
  const [refresh, setRefresh] = useState(false);
  const { league } = useRoute<RouteProp<ParamList, 'League'>>().params;
  const [users, setUsers] = useState<User[]>([]);

  function snackbarMessage(message: string, color: string) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: color,
      textColor: colors.textWhite,
      fontFamily: 'SairaSemiCondensed-Medium',
    });
  }

  async function loadingData() {
    const { data, error } = await getSolitationLeague(league.id);
    if (error === '') {
      setUsers(data.map((item) => item.user));
    } else {
      snackbarMessage(error, colors.textRed);
    }
  }

  useEffect(() => {
    loadingData();
  }, []);

  async function onRefreshData() {
    setRefresh(true);
    await loadingData();
    setRefresh(false);
  }

  async function handleUserInLeague(index: number, result: string) {
    const userList = users.find((item, i) => i === index);
    const { success, error } = await resultSolicitation(
      league.id,
      userList?.email || '',
      result
    );
    if (success !== '') {
      snackbarMessage(success, colors.greenSecundary);

      users.splice(index, 1);
      setUsers([...users]);
    } else {
      snackbarMessage(error, colors.textRed);
    }
  }

  return (
    <ContainerSafe>
      <View style={{ margin: 20 }}>
        <TitleComponent text="Pitaqueiros que pediram para participar de sua liga" />
      </View>
      <ScrollStyle
        refreshControl={
          <RefreshControl
            colors={[colors.greenSecundary]}
            refreshing={refresh}
            onRefresh={onRefreshData}
          />
        }
      >
        {users.map((user, index) => (
          <CardView key={user.email}>
            <CardInfo>
              <CardInfoImg resizeMode="contain" source={{ uri: user.avatar }} />
              <CardInfoUser>
                <CardInfoUserName>@{user.name}</CardInfoUserName>
                {user.heartClub.name ? (
                  <CardInfoUserClub>
                    <CardInfoUserClubeName>
                      {user.heartClub.name}
                    </CardInfoUserClubeName>
                    <CardInfoUserClubeImg
                      resizeMode="contain"
                      source={{ uri: user.heartClub.logo }}
                    />
                  </CardInfoUserClub>
                ) : (
                  <View />
                )}
              </CardInfoUser>
            </CardInfo>
            <CardAction>
              <CardActionButton
                principal
                onPress={() => handleUserInLeague(index, 'true')}
              >
                <CardActionButtonText>Aceitar</CardActionButtonText>
              </CardActionButton>
              <CardActionButton
                onPress={() => handleUserInLeague(index, 'false')}
              >
                <CardActionButtonText>Recusar</CardActionButtonText>
              </CardActionButton>
            </CardAction>
          </CardView>
        ))}
      </ScrollStyle>
    </ContainerSafe>
  );
}
