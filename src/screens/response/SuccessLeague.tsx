import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useAuth } from '../../contexts/auth';

import CardLeague from '../../components/CardLeague';

import { League } from '../../models/League';
import { initUser } from '../../models/User';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
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
  const { theme, user } = useAuth();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamList, 'LeagueCreatePreScreen'>>();
  const { league } = route.params;

  function handleContinuar() {
    navigation.navigate('LeagueScreen');
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.greenPrimary }]}>
      <Text style={[styles.text, { color: theme.textWhite }]}>
        Liga cadastrada com sucesso.
      </Text>
      <CardLeague league={league} user={user || initUser()} />
      <TouchableOpacity
        onPress={handleContinuar}
        style={[styles.bottom, { backgroundColor: theme.greenSecundary }]}
      >
        <Text style={[styles.text, { color: theme.textWhite }]}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}
