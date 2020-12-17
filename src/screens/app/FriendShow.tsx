import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RouteProp, useRoute } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';

import { useAuth } from '../../contexts/auth';

import HeaderComponent from '../../components/HeaderComponent';
import CardConquest from '../../components/CardConquest';

import { User } from '../../models/User';
import { League } from '../../models/League';

import { getCommomLeagues } from '../../services/league';

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    paddingHorizontal: 20,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewClub: {
    paddingVertical: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  viewClubName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewClubImg: {
    height: 50,
    width: 50,
  },
  scrollHor: {
    marginVertical: 10,
  },
  scrollVer: {
    marginTop: 15,
  },
  buttom: {
    height: 22,
    width: 150,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttomNot: {
    height: 22,
    width: 150,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttomText: {
    fontWeight: '600',
    fontSize: 10,
  },
  card: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    padding: 5,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 1,
  },
  cardImg: {
    height: 40,
    width: 40,
  },
  cardInfo: {
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  cardInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardInfoDono: {
    fontSize: 12,
    fontWeight: '600',
  },
});

type ParamList = {
  Friend: {
    friend: User;
  };
};

export default function FriendShow() {
  const { theme, user } = useAuth();
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
        backgroundColor: theme.textRed,
        textColor: theme.textWhite,
      });
    }
  }

  useEffect(() => {
    loadingData();
  }, []);

  function viewDono(league: League) {
    if (league.dono.name) {
      return league.dono.email === friend.email ? (
        <Text style={[styles.cardInfoDono, { color: theme.yellowPrimary }]}>
          @{league.dono.name}
        </Text>
      ) : (
        <Text style={[styles.cardInfoDono, { color: theme.textGray3 }]}>
          @{league.dono.name}
        </Text>
      );
    }
    return <View />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundWhite }}>
      <HeaderComponent title={friend.name} back border />
      <ScrollView style={styles.viewBody}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}
        >
          <Text style={[styles.textTitle, { color: theme.greenPrimary }]}>
            Torcedor(a)
          </Text>
        </View>
        {friend.heartClub.name ? (
          <View
            style={[styles.viewClub, { borderBottomColor: theme.textGray4 }]}
          >
            <Text style={[styles.viewClubName, { color: theme.textGray2 }]}>
              {friend.heartClub.name}
            </Text>
            <Image
              style={styles.viewClubImg}
              resizeMode="contain"
              source={{ uri: friend.heartClub.logo }}
            />
          </View>
        ) : (
          <View
            style={[styles.viewClub, { borderBottomColor: theme.textGray4 }]}
          >
            <Text style={[styles.viewClubName, { color: theme.textGray2 }]}>
              Sem Clube
            </Text>
          </View>
        )}
        <Text style={[styles.textTitle, { color: theme.greenPrimary }]}>
          Maiores Conquistas
        </Text>
        <ScrollView style={styles.scrollHor} horizontal>
          {friend.conquests.map((conquest) => (
            <CardConquest conquest={conquest} key={conquest.league.id} />
          ))}
        </ScrollView>
        <Text style={[styles.textTitle, { color: theme.greenPrimary }]}>
          Ligas atuais em Comum
        </Text>
        <View style={styles.scrollVer}>
          {leagues.map((league) => (
            <View
              style={[styles.card, { backgroundColor: theme.whitePrimary }]}
              key={league.id}
            >
              <Image
                style={styles.cardImg}
                resizeMode="contain"
                source={league.logo}
              />
              <View style={styles.cardInfo}>
                <Text
                  style={[styles.cardInfoTitle, { color: theme.greenPrimary }]}
                >
                  {league.name}
                </Text>
                {viewDono(league)}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
