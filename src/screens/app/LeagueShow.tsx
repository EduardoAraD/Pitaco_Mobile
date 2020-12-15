import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { useAuth } from '../../contexts/auth';

import Header from '../../components/HeaderComponent';
import ItemStandingLeague from '../../components/ItemStandingLeague';

import { League } from '../../models/League';
import { User } from '../../models/User';

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
  const route = useRoute<RouteProp<ParamList, 'LeagueScreen'>>();
  const { league, isDono, user } = route.params;

  function viewDono() {
    if (league.dono.name !== '') {
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

  function handleNavigateFriend() {
    navigate.navigate('Friend');
  }

  function handleNavigateSolicitation() {
    navigate.navigate('SolicitationScreen');
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
            onPress={handleNavigateFriend}
          >
            <Text style={[styles.buttomActionText, { color: theme.textWhite }]}>
              Convidar Amigos
            </Text>
          </TouchableOpacity>
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
        </View>
      );
    }
    const notParticipating =
      league.points.filter((point) => point.user.email === user.email)
        .length === 0;
    if (notParticipating) {
      return (
        <TouchableOpacity
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
          {league.points.map((point, index) => (
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
