import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, RefreshControl } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/auth';

import CardConquest from '../../components/CardConquest';
import CardLeague from '../../components/CardLeague';

import { LeaguePoint } from '../../models/League';
import { initUser } from '../../models/User';

import ThemeLigth from '../../assets/theme/light';
import ThemeDark from '../../assets/theme/dark';

import { getLeaguesUser } from '../../services/league';

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    paddingHorizontal: 20,
  },
  infoUser: {
    flexDirection: 'row',
    marginTop: 20,
  },
  infoImg: {
    height: 100,
    width: 100,
    marginRight: 10,
  },
  infoUserData: {
    flex: 1,
    justifyContent: 'space-between',
    borderRadius: 20,
    alignItems: 'center',
  },
  infoUserDataPoint: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
  },
  textInfoPoint: {
    fontFamily: 'SairaSemiCondensed-Medium',
    fontSize: 16,
    flex: 3,
  },
  textInfoPointVal: {
    fontFamily: 'SairaSemiCondensed-Medium',
    fontSize: 16,
    flex: 1,
    textAlign: 'right',
  },
  infoUserButtom: {
    borderRadius: 15,
    height: 30,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInfoButton: {
    fontFamily: 'SairaSemiCondensed-Medium',
    fontSize: 14,
  },
  textTitle: {
    fontSize: 20,
    fontFamily: 'SairaSemiCondensed-Bold',
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
    fontFamily: 'SairaSemiCondensed-Bold',
  },
  viewClubImg: {
    height: 50,
    width: 50,
  },
  scrollHor: {
    marginVertical: 10,
    paddingBottom: 5,
  },
  scrollVer: {
    marginTop: 15,
  },
});

export default function Perfil() {
  const { themeDark, user } = useAuth();
  const navigation = useNavigation();
  const theme = themeDark ? ThemeDark : ThemeLigth;
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
        backgroundColor: theme.textRed,
        textColor: theme.textWhite,
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
    <View style={{ flex: 1, backgroundColor: theme.backgroundWhite }}>
      <ScrollView
        style={styles.viewBody}
        refreshControl={
          <RefreshControl
            colors={[theme.greenSecundary]}
            refreshing={refresh}
            onRefresh={onRefreshData}
          />
        }
      >
        <View style={styles.infoUser}>
          <Image
            style={styles.infoImg}
            source={{ uri: user?.avatar }}
            resizeMode="contain"
          />
          <View style={styles.infoUserData}>
            <Text style={[styles.textTitle, { color: theme.textGray2 }]}>
              {user?.name}
            </Text>
            <View style={styles.infoUserDataPoint}>
              <Text
                style={[styles.textInfoPoint, { color: theme.greenPrimary }]}
              >
                Pontos
              </Text>
              <Text
                style={[styles.textInfoPointVal, { color: theme.textGray2 }]}
              >
                {user?.points[0].points}
              </Text>
              <Text
                style={[styles.textInfoPointVal, { color: theme.textGray2 }]}
              >
                {user?.points[0].exactScore}
              </Text>
            </View>
            <View style={{ width: '100%' }}>
              <TouchableOpacity
                style={[
                  styles.infoUserButtom,
                  { backgroundColor: theme.greenSecundary },
                ]}
                onPress={() => {
                  navigation.navigate('EditPerfil');
                }}
              >
                <Text
                  style={[styles.textInfoButton, { color: theme.whitePrimary }]}
                >
                  Editar Perfil
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
        {user?.heartClub.name ? (
          <View
            style={[styles.viewClub, { borderBottomColor: theme.textGray4 }]}
          >
            <Text style={[styles.viewClubName, { color: theme.textGray2 }]}>
              {user?.heartClub.name}
            </Text>
            <Image
              style={styles.viewClubImg}
              resizeMode="contain"
              source={{ uri: user?.heartClub.logo }}
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
          {user?.conquests.map((conquest) => (
            <CardConquest conquest={conquest} key={conquest.id} />
          ))}
        </ScrollView>
        <Text style={[styles.textTitle, { color: theme.greenPrimary }]}>
          Ligas atuais em Comum
        </Text>
        <View style={styles.scrollVer}>
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
        </View>
      </ScrollView>
    </View>
  );
}
