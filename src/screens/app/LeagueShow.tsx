import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import Snackbar from 'react-native-snackbar';
import { useAuth } from '../../contexts/auth';

import Header from '../../components/HeaderComponent';
import ItemStandingLeague from '../../components/ItemStandingLeague';

import { League } from '../../models/League';
import { User } from '../../models/User';
import { Point } from '../../models/Point';

import { showLeague, createSolicitation } from '../../services/league';

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
    fontWeight: '600',
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
    fontWeight: '600',
  },
  cardLeagueInfoDono: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardStanding: {
    marginVertical: 20,
    width: '100%',
    borderRadius: 20,
    elevation: 3,
  },
  cardStandingTitle: {
    height: 40,
    paddingLeft: 15,
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  cardStandingTitleText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

type ParamList = {
  LeagueScreen: {
    league: League;
    isDono: boolean;
    user: User;
  };
};

export default function LeagueShow() {
  const { theme } = useAuth();
  const navigate = useNavigation();
  const { league, isDono, user } = useRoute<
    RouteProp<ParamList, 'LeagueScreen'>
  >().params;
  const [points, setPoints] = useState<Point[]>(league.points);

  async function loadingData() {
    if (league.points.length === 0) {
      const { data, error } = await showLeague(league.id);
      if (error === '') {
        setPoints(data.points);
      }
    }
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

  function handleNavigateExclusion() {
    navigate.navigate('RemoveLeagueScreen', { league, user });
  }

  function handleNavigateSolicitation() {
    navigate.navigate('SolicitationScreen', { league });
  }

  function messageSnackbar(message: string, color: string) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: color,
      textColor: theme.textWhite,
    });
  }

  async function handleParticipationLeague() {
    const { success, error } = await createSolicitation(league.id, user.email);
    if (error === '') {
      messageSnackbar(success, theme.greenSecundary);
    } else {
      messageSnackbar(error, theme.textRed);
    }
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
    const notParticipating =
      league.points.filter((point) => point.user.email === user.email)
        .length === 0;
    if (notParticipating) {
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

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundWhite }}>
      <Header title={league.name} back border />
      <ScrollView style={styles.scroll}>
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
              style={[styles.cardLeagueInfoDescrip, { color: theme.textGray3 }]}
            >
              {league.description}
            </Text>
            {viewDono()}
          </View>
        </View>
        {viewButtomActions()}
        <View
          style={[styles.cardStanding, { backgroundColor: theme.whitePrimary }]}
        >
          <View
            style={[styles.cardStandingTitle, { borderColor: theme.textGray3 }]}
          >
            <Text
              style={[styles.cardStandingTitleText, { color: theme.textGray2 }]}
            >
              Classificação
            </Text>
          </View>
          {points.map((point, index) => (
            <ItemStandingLeague
              key={point.user.email}
              position={index + 1}
              isUser={point.user.email === user.email}
              point={point}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
