import React, { useState, useEffect, useContext } from 'react';
import { View, RefreshControl } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'styled-components';

import { useAuth } from '../../../contexts/auth';

import CardConquest from '../../../components/CardConquest';
import CardLeague from '../../../components/CardLeague';

import { LeaguePoint } from '../../../models/League';
import { initUser } from '../../../models/User';

import { getLeaguesUser } from '../../../services/league';

import {
  ContainerSafe,
  ViewClubImg,
  InfoImg,
  InfoUser,
  InfoUserButton,
  InfoUserData,
  InfoUserDataPoint,
  ScrollHorizontal,
  ScrollStyle,
  TextInfoButton,
  TextInfoPoint,
  TextInfoPointVal,
  TextTitle,
  ViewCardsLeague,
  ViewClub,
  ViewClubName,
} from './styles';

export default function Perfil() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const { colors } = useContext(ThemeContext);
  const [refresh, setRefresh] = useState(false);
  const [leagues, setLeagues] = useState<LeaguePoint[]>([]);

  async function loadingData() {
    const { data, error } = await getLeaguesUser(user?.email || '');
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

  async function onRefreshData() {
    setRefresh(true);
    await loadingData();
    setRefresh(false);
  }

  return (
    <ContainerSafe>
      <ScrollStyle
        refreshControl={
          <RefreshControl
            colors={[colors.greenSecundary]}
            refreshing={refresh}
            onRefresh={onRefreshData}
          />
        }
      >
        <InfoUser>
          <InfoImg source={{ uri: user?.avatar }} resizeMode="contain" />
          <InfoUserData>
            <TextTitle>{user?.name}</TextTitle>
            <InfoUserDataPoint>
              <TextInfoPoint>Pontos</TextInfoPoint>
              <TextInfoPointVal>{user?.points[0].points}</TextInfoPointVal>
              <TextInfoPointVal>{user?.points[0].exactScore}</TextInfoPointVal>
            </InfoUserDataPoint>
            <View style={{ width: '100%' }}>
              <InfoUserButton
                onPress={() => {
                  navigation.navigate('EditPerfil');
                }}
              >
                <TextInfoButton>Editar Perfil</TextInfoButton>
              </InfoUserButton>
            </View>
          </InfoUserData>
        </InfoUser>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}
        >
          <TextTitle principal>Torcedor(a)</TextTitle>
        </View>
        {user?.heartClub.name ? (
          <ViewClub>
            <ViewClubName>{user?.heartClub.name}</ViewClubName>
            <ViewClubImg
              resizeMode="contain"
              source={{ uri: user?.heartClub.logo }}
            />
          </ViewClub>
        ) : (
          <ViewClub>
            <ViewClubName>Sem Clube</ViewClubName>
          </ViewClub>
        )}
        <TextTitle principal>Maiores Conquistas</TextTitle>
        <ScrollHorizontal horizontal>
          {user?.conquests.map((conquest) => (
            <CardConquest conquest={conquest} key={conquest.id} />
          ))}
        </ScrollHorizontal>
        <TextTitle principal>Ligas atuais em Comum</TextTitle>
        <ViewCardsLeague>
          {leagues.map((leaguePoint) => (
            <CardLeague
              key={leaguePoint.league.id}
              league={leaguePoint.league}
              point={leaguePoint.point}
              position={leaguePoint.position}
              user={user || initUser()}
              isClicked={false}
            />
          ))}
        </ViewCardsLeague>
      </ScrollStyle>
    </ContainerSafe>
  );
}
