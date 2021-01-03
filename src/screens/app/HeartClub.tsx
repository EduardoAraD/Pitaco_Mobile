import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../contexts/auth';

import SearchInput from '../../components/SearchInput';

import { Clube } from '../../models/Clube';

import ThemeLigth from '../../assets/theme/light';
import ThemeDark from '../../assets/theme/dark';

import { getClubes } from '../../services/championship';

const styles = StyleSheet.create({
  viewSearch: {
    flex: 1,
  },
  titleText: {
    margin: 20,
    marginBottom: 0,
    fontSize: 20,
    fontFamily: 'SairaSemiCondensed-Bold',
  },
  scroll: {
    marginHorizontal: 20,
  },
  card: {
    height: 40,
    padding: 5,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    elevation: 3,
  },
  cardImg: {
    height: 30,
    width: 30,
    marginHorizontal: 5,
  },
  cardText: {
    fontSize: 18,
    fontFamily: 'SairaSemiCondensed-Bold',
  },
  viewInfo: {
    marginHorizontal: 20,
    borderTopWidth: 1,
  },
  titleTextInfo: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: 'SairaSemiCondensed-Bold',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function HeartClub() {
  const navigate = useNavigation();
  const { themeDark } = useAuth();
  const theme = themeDark ? ThemeDark : ThemeLigth;
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [clubes, setClubes] = useState<Clube[]>([]);
  const [clubesFilter, setClubesFilter] = useState<Clube[]>([]);

  async function loadingData() {
    setLoading(true);
    const { data, error } = await getClubes();
    if (error === '') {
      setClubesFilter(data);
      setClubes(data);
    } else {
      Snackbar.show({
        text: error,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: theme.textRed,
        textColor: theme.textWhite,
        fontFamily: 'SairaSemiCondensed-Medium',
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    loadingData();
  }, []);

  function handleSearchClub() {
    const clubFilter = clubes.filter((clube) =>
      clube.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
    setClubesFilter(clubFilter);
  }

  function handleChooseClub(club: Clube) {
    navigate.navigate('ClubShowScreen', { clube: club });
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundWhite }}>
      <View style={styles.viewSearch}>
        <Text style={[styles.titleText, { color: theme.greenPrimary }]}>
          Escolha o Clube de Coração
        </Text>
        <SearchInput
          value={search}
          setValue={setSearch}
          onPress={handleSearchClub}
          title="Clubes"
        />
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={theme.greenPrimary} />
          </View>
        ) : (
          <ScrollView style={styles.scroll}>
            {clubesFilter.map((club) => (
              <TouchableOpacity
                style={[styles.card, { backgroundColor: theme.whitePrimary }]}
                key={club.id}
                onPress={() => handleChooseClub(club)}
              >
                <Image
                  style={styles.cardImg}
                  resizeMode="contain"
                  source={{ uri: club.logo }}
                />
                <Text style={[styles.cardText, { color: theme.textGray2 }]}>
                  {club.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}
