import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';

import { useAuth } from '../../contexts/auth';

import ButtonConfirmComponent from '../../components/buttons/BottonConfirmComponent';
import SearchInput from '../../components/SearchInput';

import { Clube, initClube } from '../../models/Clube';

import { chooseClub } from '../../services/club';
import { getClubes } from '../../services/championship';

const styles = StyleSheet.create({
  viewSearch: {
    flex: 1,
  },
  titleText: {
    margin: 20,
    marginBottom: 0,
    fontSize: 20,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
  },
  viewInfo: {
    marginHorizontal: 20,
    borderTopWidth: 1,
  },
  titleTextInfo: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function HeartClub() {
  const { theme, user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [clubChoose, setClubChoose] = useState<Clube>(
    user?.heartClub || initClube()
  );
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

  function messageSnackbar(message: string, color: string) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: color,
      textColor: theme.textWhite,
    });
  }

  async function handleConfirmButtom() {
    if (clubChoose.name) {
      const { data, error } = await chooseClub(
        user?.email || '',
        clubChoose.id
      );
      if (error === '') {
        if (user) {
          user.heartClub = data.heartClub;
          updateUser({ ...user });
        }
        messageSnackbar('Clube escolhido com sucesso.', theme.greenSecundary);
      } else {
        messageSnackbar(error, theme.textRed);
      }
    } else {
      messageSnackbar('Clube não escolhido.', theme.textRed);
    }
  }

  function viewClubChoose() {
    return clubChoose.name ? (
      <View style={[styles.card, { backgroundColor: theme.whitePrimary }]}>
        <Image
          style={styles.cardImg}
          resizeMode="contain"
          source={{ uri: clubChoose.logo }}
        />
        <Text style={[styles.cardText, { color: theme.textGray2 }]}>
          {clubChoose.name}
        </Text>
      </View>
    ) : (
      <View
        style={[
          styles.card,
          { justifyContent: 'center', backgroundColor: theme.whitePrimary },
        ]}
      >
        <Text style={[styles.cardText, { color: theme.textGray2 }]}>
          Sem Clube
        </Text>
      </View>
    );
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
                onPress={() => setClubChoose(club)}
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
      <View style={[styles.viewInfo, { borderTopColor: theme.textGray4 }]}>
        <Text style={[styles.titleTextInfo, { color: theme.greenPrimary }]}>
          Clube escolhido
        </Text>
        {viewClubChoose()}
        <ButtonConfirmComponent onPress={handleConfirmButtom} />
      </View>
    </View>
  );
}
