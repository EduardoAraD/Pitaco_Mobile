import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, RefreshControl } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { RouteProp, useRoute } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';

import { useAuth } from '../../contexts/auth';

import TitleComponent from '../../components/TitleComponent';

import { User } from '../../models/User';
import { League } from '../../models/League';

import { getSolitationLeague, resultSolicitation } from '../../services/league';

import ThemeLigth from '../../assets/theme/light';
import ThemeDark from '../../assets/theme/dark';

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  card: {
    height: 90,
    borderRadius: 10,
    marginVertical: 5,
  },
  cardInfo: {
    padding: 5,
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  cardInfoImg: {
    marginHorizontal: 5,
    height: 50,
    width: 50,
  },
  cardInfoUser: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardInfoUserName: {
    fontSize: 18,
    fontFamily: 'SairaSemiCondensed-Bold',
  },
  cardInfoUserClub: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  cardInfoUserClubeName: {
    fontSize: 12,
    fontFamily: 'SairaSemiCondensed-Bold',
  },
  cardInfoUserClubeImg: {
    height: 20,
    width: 20,
    marginHorizontal: 3,
  },
  cardAction: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardActionButtom: {
    height: 20,
    width: 120,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardActionButtomText: {
    fontSize: 10,
    fontFamily: 'SairaSemiCondensed-Light',
  },
});

type ParamList = {
  League: {
    league: League;
  };
};

export default function Solicitation() {
  const { themeDark } = useAuth();
  const theme = themeDark ? ThemeDark : ThemeLigth;
  const [refresh, setRefresh] = useState(false);
  const { league } = useRoute<RouteProp<ParamList, 'League'>>().params;
  const [users, setUsers] = useState<User[]>([]);

  function snackbarMessage(message: string, color: string) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: color,
      textColor: theme.textWhite,
      fontFamily: 'SairaSemiCondensed-Medium',
    });
  }

  async function loadingData() {
    const { data, error } = await getSolitationLeague(league.id);
    if (error === '') {
      setUsers(data.map((item) => item.user));
    } else {
      snackbarMessage(error, theme.textRed);
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
      snackbarMessage(success, theme.greenSecundary);

      users.splice(index, 1);
      setUsers([...users]);
    } else {
      snackbarMessage(error, theme.textRed);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundWhite }}>
      <View style={{ margin: 20 }}>
        <TitleComponent text="Pitaqueiros que pediram para participar de sua liga" />
      </View>
      <ScrollView
        style={[styles.scroll, { borderColor: theme.textGray4 }]}
        refreshControl={
          <RefreshControl
            colors={[theme.greenSecundary]}
            refreshing={refresh}
            onRefresh={onRefreshData}
          />
        }
      >
        {users.map((user, index) => (
          <View
            style={[styles.card, { backgroundColor: theme.whitePrimary }]}
            key={user.email}
          >
            <View
              style={[styles.cardInfo, { borderBottomColor: theme.textGray4 }]}
            >
              <Image
                style={styles.cardInfoImg}
                resizeMode="contain"
                source={{ uri: user.avatar }}
              />
              <View style={styles.cardInfoUser}>
                <Text
                  style={[styles.cardInfoUserName, { color: theme.textGray2 }]}
                >
                  @{user.name}
                </Text>
                {user.heartClub.name ? (
                  <View style={styles.cardInfoUserClub}>
                    <Text
                      style={[
                        styles.cardInfoUserClubeName,
                        { color: theme.textGray3 },
                      ]}
                    >
                      {user.heartClub.name}
                    </Text>
                    <Image
                      style={styles.cardInfoUserClubeImg}
                      resizeMode="contain"
                      source={{ uri: user.heartClub.logo }}
                    />
                  </View>
                ) : (
                  <View />
                )}
              </View>
            </View>
            <View style={styles.cardAction}>
              <TouchableOpacity
                style={[
                  styles.cardActionButtom,
                  { backgroundColor: theme.bluePrimary },
                ]}
                onPress={() => handleUserInLeague(index, 'true')}
              >
                <Text
                  style={[
                    styles.cardActionButtomText,
                    { color: theme.textWhite },
                  ]}
                >
                  Aceitar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.cardActionButtom,
                  { backgroundColor: theme.textRed },
                ]}
                onPress={() => handleUserInLeague(index, 'false')}
              >
                <Text
                  style={[
                    styles.cardActionButtomText,
                    { color: theme.textWhite },
                  ]}
                >
                  Recusar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
