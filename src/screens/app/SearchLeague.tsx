import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';

import { useAuth } from '../../contexts/auth';

import SearchInput from '../../components/SearchInput';

import { League } from '../../models/League';

import { getLeagues } from '../../services/league';

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
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
  },
  cardInfoDono: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default function SearchLeague() {
  const navigation = useNavigation();
  const { user, theme, championship } = useAuth();
  const [search, setSearch] = useState('');
  const [leagues, setLeagues] = useState<League[]>([]);
  const [leaguesFilter, setLeaguesFilter] = useState<League[]>([]);

  async function loadLeague() {
    const { data, error } = await getLeagues(championship);
    if (error === '') {
      setLeagues(data);
      setLeaguesFilter(data);
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
    loadLeague();
  }, []);

  function handleSearchLeague() {
    const newleagues = leagues.filter((league) =>
      league.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
    setLeaguesFilter(newleagues);
  }

  async function handleSearchNavigateLeague(index: number) {
    const league = leaguesFilter[index];

    const isDono = league.dono ? league.dono.email === user?.email : false;

    navigation.navigate('LeagueShowScreen', { league, isDono, user });
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundWhite }}>
      <SearchInput
        value={search}
        setValue={setSearch}
        onPress={handleSearchLeague}
        title="Ligas"
      />
      <ScrollView style={styles.scroll}>
        {leaguesFilter.map((league, index) => (
          <TouchableOpacity
            key={league.id}
            style={[styles.card, { backgroundColor: theme.whitePrimary }]}
            onPress={() => handleSearchNavigateLeague(index)}
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
              <Text style={[styles.cardInfoDono, { color: theme.textGray3 }]}>
                {league.dono?.name !== '' ? `@${league.dono.name}` : ''}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
