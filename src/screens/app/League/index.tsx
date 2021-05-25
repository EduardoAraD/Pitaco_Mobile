import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, RefreshControl } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Link } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';

import { useAuth } from '../../contexts/auth';

import LoadingPage from '../../components/LoadingPage';
import CardLeague from '../../components/CardLeague';

import { initLeaguePoint, LeaguePoint } from '../../models/League';
import { initUser } from '../../models/User';

import ThemeLigth from '../../assets/theme/light';
import ThemeDark from '../../assets/theme/dark';

import * as servicesLeague from '../../services/league';

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
  },
  viewTitle: {
    marginTop: 10,
    borderBottomWidth: 1,
  },
  viewTitleText: {
    fontSize: 20,
    fontFamily: 'SairaSemiCondensed-Bold',
    textAlign: 'center',
  },
  buttomContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    height: 30,
    justifyContent: 'space-between',
  },
  buttom: {
    height: 30,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    elevation: 2,
  },
  card: {
    height: 70,
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 14,
    fontFamily: 'SairaSemiCondensed-Light',
  },
});

export default function LeagueScreen() {
  const { user, themeDark, championship } = useAuth();
  const theme = themeDark ? ThemeDark : ThemeLigth;
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
      backgroundColor: theme.textRed,
      textColor: theme.textWhite,
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
      <View
        style={[
          styles.buttom,
          { backgroundColor: theme.whitePrimary, elevation: 0 },
        ]}
      >
        <Text
          style={{
            fontSize: 12,
            color: theme.textGray3,
            fontFamily: 'SairaSemiCondensed-Medium',
          }}
        >
          Você possui uma liga
        </Text>
      </View>
    ) : (
      <Link to="/LeagueCreateScreen">
        <TouchableOpacity
          style={[styles.buttom, { backgroundColor: theme.greenSecundary }]}
        >
          <Text
            style={{
              fontSize: 12,
              color: theme.textWhite,
              fontFamily: 'SairaSemiCondensed-Medium',
            }}
          >
            Criar Liga
          </Text>
        </TouchableOpacity>
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
      <View style={[styles.card, { backgroundColor: theme.whitePrimary }]}>
        <Text style={[styles.cardText, { color: theme.textGray2 }]}>
          Você não escolheu seu clube de coração
        </Text>
        <Link to="/HeartClub">
          <TouchableOpacity
            style={[styles.buttom, { backgroundColor: theme.greenSecundary }]}
          >
            <Text
              style={{
                fontSize: 12,
                color: theme.textWhite,
                fontFamily: 'SairaSemiCondensed-Medium',
              }}
            >
              Escolher Clube
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundWhite }}>
      {!loadingScreen ? (
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
            style={[styles.viewTitle, { borderBottomColor: theme.textGray4 }]}
          >
            <Text style={[styles.viewTitleText, { color: theme.greenPrimary }]}>
              Ligas Gerais
            </Text>
          </View>
          <CardLeague
            league={leaguePitaco.league}
            user={user || initUser()}
            position={leaguePitaco.position}
            point={leaguePitaco.point}
          />
          {leagueOfClubeFavorite()}
          <View
            style={[styles.viewTitle, { borderBottomColor: theme.textGray4 }]}
          >
            <Text style={[styles.viewTitleText, { color: theme.greenPrimary }]}>
              Ligas com Amigos
            </Text>
          </View>
          <View style={styles.buttomContainer}>
            <Link to="/SearchLeagueScreen">
              <TouchableOpacity
                style={[
                  styles.buttom,
                  { backgroundColor: theme.greenSecundary },
                ]}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: theme.textWhite,
                    fontFamily: 'SairaSemiCondensed-Medium',
                  }}
                >
                  Procurar
                </Text>
              </TouchableOpacity>
            </Link>
            {createLeagueView()}
          </View>
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
        </ScrollView>
      ) : (
        <LoadingPage />
      )}
    </View>
  );
}
