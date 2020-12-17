import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Link } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';

import { useAuth } from '../../contexts/auth';

import CardLeague from '../../components/CardLeague';

import { initLeague, League } from '../../models/League';
import { initUser } from '../../models/User';

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
    fontWeight: 'bold',
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
    height: 90,
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderRadius: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default function LeagueScreen() {
  const { user, theme, championship } = useAuth();
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [leaguePitaco, setLeaguePitaco] = useState<League>(initLeague());
  const [leagueHeartClub, setLeagueHeartClub] = useState<League | null>(null);
  const [leagueUser, setLeagueUser] = useState<League | null>(null);
  const [leagueGuest, setLeagueGuest] = useState<League[]>([]);

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
      championship
    );
    if (leaguePitacoResponse.error === '') {
      setLeaguePitaco(leaguePitacoResponse.data);
    } else {
      snackbarMessageError(leaguePitacoResponse.error);
    }
    if (user?.heartClub.id) {
      const leagueHeartClubResponse = await servicesLeague.getLeagueHeartPitaco(
        championship,
        user.heartClub.id
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
  }, []);

  function createLeagueView() {
    return leagueUser ? (
      <View
        style={[
          styles.buttom,
          { backgroundColor: theme.whitePrimary, elevation: 0 },
        ]}
      >
        <Text style={{ fontSize: 12, color: theme.textGray3 }}>
          Você possui uma liga
        </Text>
      </View>
    ) : (
      <Link to="/LeagueCreateScreen">
        <TouchableOpacity
          style={[styles.buttom, { backgroundColor: theme.greenSecundary }]}
        >
          <Text style={{ fontSize: 12, color: theme.textWhite }}>
            Criar Liga
          </Text>
        </TouchableOpacity>
      </Link>
    );
  }

  function leagueOfClubeFavorite() {
    return leagueHeartClub ? (
      <CardLeague league={leagueHeartClub} user={user || initUser()} />
    ) : (
      <View style={[styles.card, { backgroundColor: theme.whitePrimary }]}>
        <Text style={[styles.cardText, { color: theme.textGray2 }]}>
          Você não escolheu seu clube de coração
        </Text>
        <Link to="/HeartClub">
          <TouchableOpacity
            style={[styles.buttom, { backgroundColor: theme.greenSecundary }]}
          >
            <Text style={{ fontSize: 12, color: theme.textWhite }}>
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
        <ScrollView style={styles.scroll}>
          <View
            style={[styles.viewTitle, { borderBottomColor: theme.textGray4 }]}
          >
            <Text style={[styles.viewTitleText, { color: theme.greenPrimary }]}>
              Ligas Gerais
            </Text>
          </View>
          <CardLeague league={leaguePitaco} user={user || initUser()} />
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
                <Text style={{ fontSize: 12, color: theme.textWhite }}>
                  Procurar
                </Text>
              </TouchableOpacity>
            </Link>
            {createLeagueView()}
          </View>
          {leagueUser?.name ? (
            <CardLeague league={leagueUser} user={user || initUser()} />
          ) : (
            <View />
          )}
          {leagueGuest.map((league) => (
            <CardLeague
              key={league.id}
              league={league}
              user={user || initUser()}
            />
          ))}
        </ScrollView>
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color={theme.greenPrimary} />
        </View>
      )}
    </View>
  );
}
