import React, { useContext, useEffect, useState } from 'react';
import { View, RefreshControl, ActivityIndicator } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ThemeContext } from 'styled-components';
import { useAuth } from '../../../contexts/auth';

import Header from '../../../components/HeaderComponent';
import ItemStandingLeague from '../../../components/ItemStandingLeague';

import { League } from '../../../models/League';
import { User } from '../../../models/User';
import { Point } from '../../../models/Point';

import * as servicesLeague from '../../../services/league';

import {
  ButtonAction,
  ButtonActionText,
  CardImgStyle,
  CardLeagueInfo,
  CardLeagueInfoDescrip,
  CardLeagueInfoDono,
  CardLeagueStyle,
  CardStandingStyle,
  CardStandingTitle,
  CardStandingTitleText,
  ContainerSafe,
  ContentItensPicker,
  ItemPicker,
  PickerStyle,
  ScrollStyle,
  ViewButtomAction,
  ViewPoint,
} from './styles';

type ParamList = {
  LeagueScreen: {
    league: League;
    isLeagueHeartClub: boolean;
    clubeId: number;
    isDono: boolean;
    user: User;
    position: number;
    point: Point;
  };
};

export default function LeagueShow() {
  const { championship, currentRodada } = useAuth();
  const { colors, title } = useContext(ThemeContext);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigation();
  const {
    league,
    isDono,
    isLeagueHeartClub,
    clubeId,
    user,
    position,
    point,
  } = useRoute<RouteProp<ParamList, 'LeagueScreen'>>().params;
  const limit = 50;
  const [points, setPoints] = useState<Point[]>(league.points);
  const [loading, setLoading] = useState(false);
  const [modeClassification, setModeClassification] = useState(1);
  const [visibleSelect, setVisibleSelect] = useState(false);
  const [numRodada, setNumRodada] = useState(currentRodada);

  function messageSnackbar(message: string, color: string) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: color,
      textColor: colors.textWhite,
      fontFamily: 'SairaSemiCondensed-Medium',
    });
  }

  async function loadingData() {
    setLoading(true);
    if (isLeagueHeartClub) {
      if (modeClassification === 1) {
        const {
          data,
          error,
        } = await servicesLeague.showPointLeagueHeartClubPage(
          league.id,
          clubeId,
          1,
          limit
        );
        if (error === '') {
          setPoints(data.points);
        }
      } else {
        const {
          data,
          error,
        } = await servicesLeague.showPointLeagueHeartClubPageRodada(
          league.id,
          clubeId,
          1,
          limit,
          championship
        );
        if (error === '') {
          setPoints(data.points);
          setNumRodada(data.rodada);
        }
      }
    } else if (modeClassification === 1) {
      const { data, error } = await servicesLeague.showPointLeaguePage(
        league.id,
        1,
        limit
      );
      if (error === '') {
        setPoints(data.points);
      }
    } else {
      const { data, error } = await servicesLeague.showPointLeaguePageRodada(
        league.id,
        1,
        limit,
        championship
      );
      if (error === '') {
        setPoints(data.points);
        setNumRodada(data.rodada);
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    loadingData();
  }, []);

  function viewDono() {
    if (league.dono.name) {
      return isDono ? (
        <CardLeagueInfoDono principal>@{league.dono.name}</CardLeagueInfoDono>
      ) : (
        <CardLeagueInfoDono>@{league.dono.name}</CardLeagueInfoDono>
      );
    }
    return <View />;
  }

  async function onRefreshData() {
    setRefresh(true);
    await loadingData();
    setRefresh(false);
  }

  function handleNavigateExclusion() {
    navigate.navigate('RemoveLeagueScreen', { league, user, position, point });
  }

  function handleNavigateSolicitation() {
    navigate.navigate('SolicitationScreen', { league });
  }

  async function handleParticipationLeague() {
    const { success, error } = await servicesLeague.createSolicitation(
      league.id,
      user.email
    );
    if (error === '') {
      messageSnackbar(success, colors.greenSecundary);
    } else {
      messageSnackbar(error, colors.textRed);
    }
  }

  async function updateModeClassification(value: number) {
    setVisibleSelect(false);
    if (modeClassification !== value) {
      setModeClassification(value);
      await loadingData();
    }
  }

  function itemSelect(text: string, value: number) {
    return (
      <ItemPicker onPress={() => updateModeClassification(value)}>
        <CardStandingTitleText>{text}</CardStandingTitleText>
      </ItemPicker>
    );
  }

  function itemsSelect() {
    return (
      <ContentItensPicker darkMode={title === 'dark'}>
        {itemSelect('Total', 1)}
        {itemSelect('Última rodada', 2)}
      </ContentItensPicker>
    );
  }

  function viewButtomActions() {
    if (isDono) {
      return (
        <ViewButtomAction>
          <ButtonAction principal onPress={handleNavigateSolicitation}>
            <ButtonActionText>Solicitações</ButtonActionText>
          </ButtonAction>
          <ButtonAction onPress={handleNavigateExclusion}>
            <ButtonActionText>Excluir liga</ButtonActionText>
          </ButtonAction>
        </ViewButtomAction>
      );
    }
    if (!point) {
      return (
        <ButtonAction
          principal
          onPress={handleParticipationLeague}
          style={{ width: 150 }}
        >
          <ButtonActionText>Participar da Liga</ButtonActionText>
        </ButtonAction>
      );
    }
    return <View />;
  }

  function viewPointUser() {
    return point ? (
      <ViewPoint>
        <ItemStandingLeague position={position} isUser point={point} />
      </ViewPoint>
    ) : (
      <View />
    );
  }

  return (
    <ContainerSafe>
      <Header title={league.name} back border />
      <ScrollStyle
        refreshControl={
          <RefreshControl
            colors={[colors.greenSecundary]}
            refreshing={refresh}
            onRefresh={onRefreshData}
          />
        }
      >
        <CardLeagueStyle>
          <CardImgStyle resizeMode="contain" source={league.logo} />
          <CardLeagueInfo>
            <CardLeagueInfoDescrip>{league.description}</CardLeagueInfoDescrip>
            {viewDono()}
          </CardLeagueInfo>
        </CardLeagueStyle>
        {viewButtomActions()}
        {viewPointUser()}
        <CardStandingStyle>
          <CardStandingTitle>
            <CardStandingTitleText>
              {modeClassification === 1
                ? 'Classificação'
                : `Classificação ${numRodada}° Rodada`}
            </CardStandingTitleText>
            <PickerStyle onPress={() => setVisibleSelect(!visibleSelect)}>
              <CardStandingTitleText>
                {modeClassification === 1 ? 'Todos' : 'Última rodada'}
              </CardStandingTitleText>
              <Icon
                name={visibleSelect ? 'chevron-up' : 'chevron-down'}
                color={colors.textGray2}
                size={20}
              />
            </PickerStyle>
          </CardStandingTitle>
          {visibleSelect ? itemsSelect() : <View />}
          {loading ? (
            <View style={{ margin: 10, alignItems: 'center' }}>
              <ActivityIndicator size="small" color={colors.greenPrimary} />
            </View>
          ) : (
            points.map((item, index) => (
              <ItemStandingLeague
                key={index.toString()}
                position={index + 1}
                isUser={item.user.email === user.email}
                point={item}
              />
            ))
          )}
        </CardStandingStyle>
      </ScrollStyle>
    </ContainerSafe>
  );
}
