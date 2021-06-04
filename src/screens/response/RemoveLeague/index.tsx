import React, { useContext } from 'react';
import { View } from 'react-native';
import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import { ThemeContext } from 'styled-components';

import CardLeague from '../../../components/CardLeague';

import { League } from '../../../models/League';
import { initUser, User } from '../../../models/User';
import { Point } from '../../../models/Point';

import { deleteLeague } from '../../../services/league';

import {
  ButtonStyle,
  ContainerSafe,
  StatusBarStyle,
  TextStyle,
} from './styles';

type ParamList = {
  League: {
    league: League;
    user: User;
    position: number;
    point: Point;
  };
};

export default function RemoveLeague() {
  const { colors } = useContext(ThemeContext);
  const navigation = useNavigation();
  const { league, user, position, point } = useRoute<
    RouteProp<ParamList, 'League'>
  >().params;

  async function handleDeleteLeague() {
    const { success, error } = await deleteLeague(league.id, user?.email || '');
    if (error === '') {
      Snackbar.show({
        text: success,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: colors.greenSecundary,
        textColor: colors.textWhite,
        fontFamily: 'SairaSemiCondensed-Medium',
      });

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'LeagueScreen' }],
        })
      );
    } else {
      Snackbar.show({
        text: error,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: colors.textRed,
        textColor: colors.textWhite,
        fontFamily: 'SairaSemiCondensed-Medium',
      });
    }
  }

  return (
    <ContainerSafe>
      <StatusBarStyle barStyle="light-content" />
      <TextStyle>Você quer mesmo excluir {`"${league.name}"`}?</TextStyle>
      <CardLeague
        isClicked={false}
        league={league}
        user={user || initUser()}
        point={point}
        position={position}
      />
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <ButtonStyle onPress={() => navigation.goBack()}>
          <TextStyle>Não</TextStyle>
        </ButtonStyle>
        <ButtonStyle onPress={handleDeleteLeague}>
          <TextStyle>Sim</TextStyle>
        </ButtonStyle>
      </View>
    </ContainerSafe>
  );
}
