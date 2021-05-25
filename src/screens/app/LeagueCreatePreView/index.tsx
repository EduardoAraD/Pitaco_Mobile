import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';

import { useAuth } from '../../contexts/auth';

import ButtonConfirmComponent from '../../components/buttons/BottonConfirmComponent';
import CardLeague from '../../components/CardLeague';
import TitleComponent from '../../components/TitleComponent';

import { League } from '../../models/League';
import { initUser } from '../../models/User';

import { createLeague } from '../../services/league';

import ThemeLigth from '../../assets/theme/light';
import ThemeDark from '../../assets/theme/dark';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
});

type ParamList = {
  LeagueCreateScreen: {
    league: League;
    escudo: number;
  };
};

export default function LeagueCreatePreView() {
  const navigation = useNavigation();
  const { user, themeDark, championship } = useAuth();
  const theme = themeDark ? ThemeDark : ThemeLigth;
  const route = useRoute<RouteProp<ParamList, 'LeagueCreateScreen'>>();
  const { league, escudo } = route.params;

  async function handleCreateLeague() {
    const response = await createLeague(
      championship,
      user?.email || '',
      league.description,
      escudo.toString(),
      league.name
    );
    if (response.error === '') {
      navigation.navigate('SuccessLeagueScreen', { league: response.data });
    } else {
      Snackbar.show({
        text: response.error,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: theme.textRed,
        textColor: theme.textWhite,
        fontFamily: 'SairaSemiCondensed-Medium',
      });
    }
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundWhite }]}
    >
      <TitleComponent text="Pré visualização da sua Liga" />
      <CardLeague
        league={league}
        user={user || initUser()}
        isClicked={false}
        point={league.points[0]}
        position={1}
      />
      <ButtonConfirmComponent onPress={handleCreateLeague} />
    </View>
  );
}
