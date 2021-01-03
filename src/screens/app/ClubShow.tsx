import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';

import { useAuth } from '../../contexts/auth';

import HeaderComponent from '../../components/HeaderComponent';
import ButtonConfirmComponent from '../../components/buttons/BottonConfirmComponent';
import LoadingResponse from '../../components/LoadingResponse';

import { Clube } from '../../models/Clube';

import ThemeDark from '../../assets/theme/dark';
import ThemeLigth from '../../assets/theme/light';

import { chooseClub } from '../../services/club';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  img: {
    marginTop: 10,
    height: 200,
    width: 200,
  },
  text: {
    fontFamily: 'SairaSemiCondensed-Bold',
    fontSize: 22,
    marginBottom: 20,
  },
  card: {
    height: 40,
    padding: 5,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    elevation: 1,
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
    borderTopWidth: 1,
    width: '100%',
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

type ParamList = {
  Club: {
    clube: Clube;
  };
};

export default function ClubShow() {
  const { themeDark, user, updateUser } = useAuth();
  const theme = themeDark ? ThemeDark : ThemeLigth;
  const route = useRoute<RouteProp<ParamList, 'Club'>>();
  const { clube } = route.params;
  const [loading, setLoading] = useState(false);

  function messageSnackbar(message: string, color: string) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: color,
      textColor: theme.textWhite,
      fontFamily: 'SairaSemiCondensed-Medium',
    });
  }

  async function handleConfirmButtom() {
    setLoading(true);
    const { data, error } = await chooseClub(user?.email || '', clube.id);
    if (error === '') {
      if (user) {
        user.heartClub = data.heartClub;
        updateUser({ ...user });
      }
      messageSnackbar('Clube escolhido com sucesso.', theme.greenSecundary);
    } else {
      messageSnackbar(error, theme.textRed);
    }
    setLoading(false);
  }

  function viewClubChoose() {
    return user?.heartClub.name ? (
      <View style={[styles.card, { backgroundColor: theme.whitePrimary }]}>
        <Image
          style={styles.cardImg}
          resizeMode="contain"
          source={{ uri: user.heartClub.logo }}
        />
        <Text style={[styles.cardText, { color: theme.textGray2 }]}>
          {user.heartClub.name}
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
      {loading ? <LoadingResponse /> : <View />}
      <HeaderComponent title={clube.name} back border />
      <View style={styles.container}>
        <Text style={[styles.text, { color: theme.textGray2 }]}>
          Definir clube de coração
        </Text>
        <Image source={{ uri: clube.logo }} style={styles.img} />
        <Text style={[styles.text, { color: theme.greenPrimary }]}>
          {clube.name}
        </Text>
        <View style={[styles.viewInfo, { borderTopColor: theme.textGray4 }]}>
          <Text style={[styles.titleTextInfo, { color: theme.greenPrimary }]}>
            Seu clube de coração atual
          </Text>
          {viewClubChoose()}
          <ButtonConfirmComponent onPress={handleConfirmButtom} />
        </View>
      </View>
    </View>
  );
}
