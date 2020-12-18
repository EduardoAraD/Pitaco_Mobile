import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';

import CardLeague from '../../components/CardLeague';
import { useAuth } from '../../contexts/auth';

import { League } from '../../models/League';
import { initUser, User } from '../../models/User';

import { deleteLeague } from '../../services/league';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-evenly',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttom: {
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    height: 42,
    borderRadius: 10,
  },
});

type ParamList = {
  League: {
    league: League;
    user: User;
  };
};

export default function RemoveLeague() {
  const { theme } = useAuth();
  const navigation = useNavigation();
  const { league, user } = useRoute<RouteProp<ParamList, 'League'>>().params;

  async function handleDeleteLeague() {
    const { success, error } = await deleteLeague(league.id, user?.email || '');
    if (error === '') {
      Snackbar.show({
        text: success,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: theme.greenSecundary,
        textColor: theme.textWhite,
      });

      navigation.navigate('LeagueScreen');
    } else {
      Snackbar.show({
        text: error,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: theme.textRed,
        textColor: theme.textWhite,
      });
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRed }]}>
      <StatusBar
        backgroundColor={theme.backgroundRed}
        barStyle="light-content"
      />
      <Text style={[styles.text, { color: theme.textWhite }]}>
        Você quer mesmo excluir a liga {league.name}?
      </Text>
      <CardLeague league={league} user={user || initUser()} />
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.buttom, { backgroundColor: theme.blueSecundary }]}
        >
          <Text style={[styles.text, { color: theme.textWhite }]}>Não</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDeleteLeague}
          style={[styles.buttom, { backgroundColor: theme.textRed }]}
        >
          <Text style={[styles.text, { color: theme.textWhite }]}>Sim</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
