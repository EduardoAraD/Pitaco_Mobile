import React, { useContext } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import { ThemeContext } from 'styled-components';

import { useAuth } from '../../../contexts/auth';

import ButtonConfirmComponent from '../../../components/ButtonConfirm';
import CardLeague from '../../../components/CardLeague';
import TitleComponent from '../../../components/TitleComponent';

import { League } from '../../../models/League';
import { initUser } from '../../../models/User';

import { createLeague } from '../../../services/league';

import { ContainerSafe } from './styles';

type ParamList = {
  LeagueCreateScreen: {
    league: League;
    escudo: number;
  };
};

export default function LeagueCreatePreView() {
  const navigation = useNavigation();
  const { colors } = useContext(ThemeContext);
  const { user, championship } = useAuth();
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
        backgroundColor: colors.textRed,
        textColor: colors.textWhite,
        fontFamily: 'SairaSemiCondensed-Medium',
      });
    }
  }

  return (
    <ContainerSafe>
      <TitleComponent text="Pré visualização da sua Liga" />
      <CardLeague
        league={league}
        user={user || initUser()}
        isClicked={false}
        point={league.points[0]}
        position={1}
      />
      <ButtonConfirmComponent onPress={handleCreateLeague} />
    </ContainerSafe>
  );
}
