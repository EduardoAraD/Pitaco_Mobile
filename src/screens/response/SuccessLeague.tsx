import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  useNavigation,
  useRoute,
  RouteProp,
  CommonActions,
} from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useAuth } from '../../contexts/auth';

import CardLeague from '../../components/CardLeague';

import { League } from '../../models/League';
import { initUser } from '../../models/User';

import ThemeLight from '../../assets/theme/light';
import ThemeDark from '../../assets/theme/dark';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 20,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'SairaSemiCondensed-Bold',
  },
  bottom: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    height: 64,
    borderRadius: 20,
  },
});

type ParamList = {
  LeagueCreatePreScreen: {
    league: League;
  };
};

export default function SucessLeague() {
  const { themeDark, user } = useAuth();
  const theme = themeDark ? ThemeDark : ThemeLight;
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamList, 'LeagueCreatePreScreen'>>();
  const { league } = route.params;

  function handleContinuar() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'LeagueScreen' }],
      })
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.greenPrimary }]}>
      <Text style={[styles.text, { color: theme.textWhite }]}>
        Liga cadastrada com sucesso.
      </Text>
      <CardLeague
        league={league}
        user={user || initUser()}
        isClicked={false}
        point={league.points[0]}
        position={1}
      />
      <TouchableOpacity
        onPress={handleContinuar}
        style={[styles.bottom, { backgroundColor: theme.greenSecundary }]}
      >
        <Text style={[styles.text, { color: theme.textWhite }]}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}
