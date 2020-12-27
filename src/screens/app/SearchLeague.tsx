import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';

import { useAuth } from '../../contexts/auth';

import SearchInput from '../../components/SearchInput';

import { League } from '../../models/League';

import { getLeaguesPage } from '../../services/league';

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
  },
  loading: {
    height: 300,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
    borderRadius: 20,
    elevation: 2,
  },
  cardImg: {
    height: 50,
    width: 50,
  },
  cardInfo: {
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  cardInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'SairaSemiCondensed-Bold',
  },
  cardInfoDono: {
    fontSize: 12,
    fontFamily: 'SairaSemiCondensed-Light',
  },
});

export default function SearchLeague() {
  const navigation = useNavigation();
  const { user, theme, championship } = useAuth();
  const limit = 10;
  const [loading, setLoading] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [search, setSearch] = useState('');
  const [leagues, setLeagues] = useState<League[]>([]);
  const [total, setTotal] = useState(0);

  function messageSnackbar(message: string, color: string) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: color,
      textColor: theme.textWhite,
      fontFamily: 'SairaSemiCondensed-Medium',
    });
  }

  async function loadLeague() {
    setLoading(true);
    const { data, error } = await getLeaguesPage(
      championship,
      1,
      limit,
      search
    );
    if (error === '') {
      setLeagues(data.leagues);
      setTotal(data.total);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadLeague();
  }, []);

  async function handleSearchLeague() {
    setLoading(true);
    setPageCurrent(1);
    const { data, error } = await getLeaguesPage(
      championship,
      1,
      limit,
      search
    );
    if (error === '') {
      setLeagues(data.leagues);
      setTotal(data.total);
    }
    setLoading(false);
  }

  async function handleSearchNavigateLeague(index: number) {
    const league = leagues[index];
    const isDono = league.dono ? league.dono.email === user?.email : false;
    navigation.navigate('LeagueShowScreen', {
      league,
      isDono,
      user,
      isLeagueHeartClub: false,
      clubeId: 0,
      position: -1,
      point: null,
    });
  }

  function renderItem(item: League, index: number) {
    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.card, { backgroundColor: theme.whitePrimary }]}
        onPress={() => handleSearchNavigateLeague(index)}
      >
        <Image style={styles.cardImg} resizeMode="contain" source={item.logo} />
        <View style={styles.cardInfo}>
          <Text style={[styles.cardInfoTitle, { color: theme.greenPrimary }]}>
            {item.name}
          </Text>
          <Text style={[styles.cardInfoDono, { color: theme.textGray3 }]}>
            {item.dono?.name !== '' ? `@${item.dono.name}` : ''}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  async function handleLoadMore() {
    if (leagues.length >= total) return;
    setLoading(true);
    const { data, error } = await getLeaguesPage(
      championship,
      pageCurrent + 1,
      limit,
      search
    );
    if (error === '') {
      setLeagues(leagues.concat(data.leagues));
    } else {
      messageSnackbar(error, theme.textRed);
    }
    setPageCurrent(pageCurrent + 1);
    setLoading(false);
  }

  function renderFooter() {
    return loading ? (
      <View style={{ margin: 10, alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.greenPrimary} />
      </View>
    ) : (
      <View />
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundWhite }}>
      <SearchInput
        value={search}
        setValue={setSearch}
        onPress={handleSearchLeague}
        title="Ligas"
      />
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={theme.greenPrimary} />
        </View>
      ) : (
        <FlatList
          style={styles.scroll}
          data={leagues}
          renderItem={({ item, index }) => renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={renderFooter}
          onEndReached={async () => handleLoadMore()}
          onEndReachedThreshold={0.1}
        />
      )}
    </View>
  );
}
