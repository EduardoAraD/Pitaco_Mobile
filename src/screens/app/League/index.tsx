import React, { useContext, useEffect, useState } from 'react';
import { View, RefreshControl } from 'react-native';
import { Link } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import { ThemeContext } from 'styled-components';

import { useAuth } from '../../../contexts/auth';

import LoadingPage from '../../../components/LoadingPage';
import CardLeague from '../../../components/CardLeague';

import { initLeaguePoint, LeaguePoint } from '../../../models/League';
import { initUser } from '../../../models/User';

import * as servicesLeague from '../../../services/league';

import {
  ButtomStyle,
  TextButtom,
  CardStyle,
  ButtonContainer,
  CardText,
  ContainerSafe,
  ScrollStyle,
  ViewButtonStyle,
  ViewTitle,
  ViewTitleText,
  TextDefault,
} from './styles';

export default function LeagueScreen() {
  const { colors } = useContext(ThemeContext);
  const { user, championship } = useAuth();
  const [refresh, setRefresh] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [leaguePitaco, setLeaguePitaco] = useState<LeaguePoint>(
    initLeaguePoint()
  );
  const [leagueHeartClub, setLeagueHeartClub] = useState<LeaguePoint | null>(
    null
  );
  const [leagueUser, setLeagueUser] = useState<LeaguePoint | null>(null);
  const [leagueGuest, setLeagueGuest] = useState<LeaguePoint[]>([]);

  function snackbarMessageError(message: string) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: colors.textRed,
      textColor: colors.textWhite,
    });
  }

  async function loadingData() {
    const leaguePitacoResponse = await servicesLeague.getLeaguePitaco(
      championship,
      user?.email || ''
    );
    if (leaguePitacoResponse.error === '') {
      setLeaguePitaco(leaguePitacoResponse.data);
    } else {
      snackbarMessageError(leaguePitacoResponse.error);
    }
    if (user?.heartClub.id) {
      const leagueHeartClubResponse = await servicesLeague.getLeagueHeartPitaco(
        championship,
        user.heartClub.id,
        user?.email || ''
      );
      if (leagueHeartClubResponse.error === '') {
        setLeagueHeartClub(leagueHeartClubResponse.data);
      } else {
        snackbarMessageError(leagueHeartClubResponse.error);
      }
    }
    const leagueUserResponse = await servicesLeague.getLeagueDono(
      championship,
      user?.email || ''
    );
    if (leagueUserResponse.error === '') {
      setLeagueUser(leagueUserResponse.data);
    } else {
      setLeagueUser(null);
    }
    const leagueGuestResponse = await servicesLeague.getLeagueGuest(
      championship,
      user?.email || ''
    );
    if (leagueGuestResponse.error === '') {
      setLeagueGuest(leagueGuestResponse.data);
    }
    setLoadingScreen(false);
  }

  useEffect(() => {
    loadingData();
    return () => {};
  }, []);

  async function onRefreshData() {
    setRefresh(true);
    await loadingData();
    setRefresh(false);
  }

  function createLeagueView() {
    return leagueUser ? (
      <ViewButtonStyle>
        <TextDefault>Você possui uma liga</TextDefault>
      </ViewButtonStyle>
    ) : (
      <Link to="/LeagueCreateScreen">
        <ButtomStyle>
          <TextButtom>Criar Liga</TextButtom>
        </ButtomStyle>
      </Link>
    );
  }

  function leagueOfClubeFavorite() {
    return leagueHeartClub ? (
      <CardLeague
        league={leagueHeartClub.league}
        user={user || initUser()}
        position={leagueHeartClub.position}
        point={leagueHeartClub.point}
        isLeagueHeartClub
        clubeId={user?.heartClub.id || 0}
      />
    ) : (
      <CardStyle>
        <CardText>Você não escolheu seu clube de coração</CardText>
        <Link to="/HeartClub">
          <ButtomStyle>
            <TextButtom>Escolher Clube</TextButtom>
          </ButtomStyle>
        </Link>
      </CardStyle>
    );
  }

  return (
    <ContainerSafe>
      {!loadingScreen ? (
        <ScrollStyle
          refreshControl={
            <RefreshControl
              colors={[colors.greenSecundary]}
              refreshing={refresh}
              onRefresh={onRefreshData}
            />
          }
        >
          <ViewTitle>
            <ViewTitleText>Ligas Gerais</ViewTitleText>
          </ViewTitle>
          <CardLeague
            league={leaguePitaco.league}
            user={user || initUser()}
            position={leaguePitaco.position}
            point={leaguePitaco.point}
          />
          {leagueOfClubeFavorite()}
          <ViewTitle>
            <ViewTitleText>Ligas com Amigos</ViewTitleText>
          </ViewTitle>
          <ButtonContainer>
            <Link to="/SearchLeagueScreen">
              <ButtomStyle>
                <TextButtom>Procurar</TextButtom>
              </ButtomStyle>
            </Link>
            {createLeagueView()}
          </ButtonContainer>
          {leagueUser?.league ? (
            <CardLeague
              league={leagueUser.league}
              user={user || initUser()}
              position={leagueUser.position}
              point={leagueUser.point}
            />
          ) : (
            <View />
          )}
          {leagueGuest.map((leaguePoint) => (
            <CardLeague
              key={leaguePoint.league.id}
              league={leaguePoint.league}
              user={user || initUser()}
              position={leaguePoint.position}
              point={leaguePoint.point}
            />
          ))}
        </ScrollStyle>
      ) : (
        <LoadingPage />
      )}
    </ContainerSafe>
  );
}
