import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useAuth } from '../../contexts/auth';

import Header from '../../components/HeaderComponent';
import ItemStandingLeague from '../../components/ItemStandingLeague';

import { League } from '../../models/League';
import { User } from '../../models/User';
import { Point } from '../../models/Point';

import ThemeLigth from '../../assets/theme/light';
import ThemeDark from '../../assets/theme/dark';

import * as servicesLeague from '../../services/league';

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
  },
  viewButtomAction: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttomAction: {
    height: 30,
    width: 130,
    marginVertical: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  buttomActionText: {
    fontSize: 12,
    fontFamily: 'SairaSemiCondensed-Light',
  },
  cardLeague: {
    height: 90,
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    marginVertical: 20,
    borderRadius: 20,
    elevation: 3,
  },
  cardLeagueImg: {
    height: 70,
    width: 70,
  },
  cardLeagueInfo: {
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  cardLeagueInfoDescrip: {
    fontSize: 14,
    fontFamily: 'SairaSemiCondensed-Light',
  },
  cardLeagueInfoDono: {
    fontSize: 14,
    fontFamily: 'SairaSemiCondensed-Bold',
  },
  viewPoint: {
    marginVertical: 10,
    width: '100%',
    elevation: 2,
    borderRadius: 6,
  },
  cardStanding: {
    marginVertical: 20,
    width: '100%',
    minHeight: 120,
    borderRadius: 20,
    elevation: 3,
  },
  cardStandingTitle: {
    height: 40,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  cardStandingTitleText: {
    fontSize: 14,
    fontFamily: 'SairaSemiCondensed-Medium',
  },
  picker: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentItensPicker: {
    position: 'absolute',
    width: 110,
    height: 80,
    right: 10,
    top: 41,
    zIndex: 999,
    elevation: 5,
  },
  itemPicker: {
    justifyContent: 'center',
    height: 40,
    borderBottomWidth: 1,
    paddingHorizontal: 4,
  },
});

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
  const { themeDark, championship } = useAuth();
  const theme = themeDark ? ThemeDark : ThemeLigth;
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
  const [numRodada, setNumRodada] = useState(0);

  function messageSnackbar(message: string, color: string) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: color,
      textColor: theme.textWhite,
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
        <Text
          style={[styles.cardLeagueInfoDono, { color: theme.yellowPrimary }]}
        >
          @{league.dono.name}
        </Text>
      ) : (
        <Text
          style={[styles.cardLeagueInfoDono, { color: theme.greenSecundary }]}
        >
          @{league.dono.name}
        </Text>
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
      messageSnackbar(success, theme.greenSecundary);
    } else {
      messageSnackbar(error, theme.textRed);
    }
  }

  async function updateModeClassification(value: number) {
    setModeClassification(value);
    setVisibleSelect(false);
    await loadingData();
  }

  function itemSelect(text: string, value: number) {
    return (
      <TouchableOpacity
        style={[styles.itemPicker, { borderBottomColor: theme.textGray2 }]}
        onPress={() => updateModeClassification(value)}
      >
        <Text
          style={[styles.cardStandingTitleText, { color: theme.textGray2 }]}
        >
          {text}
        </Text>
      </TouchableOpacity>
    );
  }

  function itemsSelect() {
    return (
      <View
        style={[
          styles.contentItensPicker,
          { backgroundColor: themeDark ? theme.textGray4 : theme.whitePrimary },
        ]}
      >
        {itemSelect('Total', 1)}
        {itemSelect('Última rodada', 2)}
      </View>
    );
  }

  function viewButtomActions() {
    if (isDono) {
      return (
        <View style={styles.viewButtomAction}>
          <TouchableOpacity
            style={[
              styles.buttomAction,
              { backgroundColor: theme.greenSecundary },
            ]}
            onPress={handleNavigateSolicitation}
          >
            <Text style={[styles.buttomActionText, { color: theme.textWhite }]}>
              Solicitações
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttomAction, { backgroundColor: theme.textRed }]}
            onPress={handleNavigateExclusion}
          >
            <Text style={[styles.buttomActionText, { color: theme.textWhite }]}>
              Excluir liga
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (!point) {
      return (
        <TouchableOpacity
          onPress={handleParticipationLeague}
          style={[
            styles.buttomAction,
            { backgroundColor: theme.greenSecundary, width: 150 },
          ]}
        >
          <Text style={[styles.buttomActionText, { color: theme.textWhite }]}>
            Participar da Liga
          </Text>
        </TouchableOpacity>
      );
    }
    return <View />;
  }

  function viewPointUser() {
    return point ? (
      <View style={[styles.viewPoint, { backgroundColor: theme.whitePrimary }]}>
        <ItemStandingLeague position={position} isUser point={point} />
      </View>
    ) : (
      <View />
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundWhite }}>
      <Header title={league.name} back border />
      <ScrollView
        style={styles.scroll}
        refreshControl={
          <RefreshControl
            colors={[theme.greenSecundary]}
            refreshing={refresh}
            onRefresh={onRefreshData}
          />
        }
      >
        <View
          style={[styles.cardLeague, { backgroundColor: theme.whitePrimary }]}
        >
          <Image
            style={styles.cardLeagueImg}
            resizeMode="contain"
            source={league.logo}
          />
          <View style={styles.cardLeagueInfo}>
            <Text
              style={[styles.cardLeagueInfoDescrip, { color: theme.textGray2 }]}
            >
              {league.description}
            </Text>
            {viewDono()}
          </View>
        </View>
        {viewButtomActions()}
        {viewPointUser()}
        <View
          style={[styles.cardStanding, { backgroundColor: theme.whitePrimary }]}
        >
          <View
            style={[styles.cardStandingTitle, { borderColor: theme.textGray3 }]}
          >
            <Text
              style={[styles.cardStandingTitleText, { color: theme.textGray2 }]}
            >
              {modeClassification === 1
                ? 'Classificação'
                : `Classificação ${numRodada}° Rodada`}
            </Text>
            <TouchableOpacity
              style={styles.picker}
              onPress={() => setVisibleSelect(!visibleSelect)}
            >
              <Text
                style={[
                  styles.cardStandingTitleText,
                  { color: theme.textGray2 },
                ]}
              >
                {modeClassification === 1 ? 'Todos' : 'Última rodada'}
              </Text>
              <Icon
                name={visibleSelect ? 'chevron-up' : 'chevron-down'}
                color={theme.textGray2}
                size={20}
              />
            </TouchableOpacity>
          </View>
          {visibleSelect ? itemsSelect() : <View />}
          {loading ? (
            <View style={{ margin: 10, alignItems: 'center' }}>
              <ActivityIndicator size="small" color={theme.greenPrimary} />
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
        </View>
      </ScrollView>
    </View>
  );
}
