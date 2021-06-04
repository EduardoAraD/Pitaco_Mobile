import React from 'react';
import {
  useNavigation,
  useRoute,
  RouteProp,
  CommonActions,
} from '@react-navigation/native';
import { useAuth } from '../../../contexts/auth';

import CardLeague from '../../../components/CardLeague';

import { League } from '../../../models/League';
import { initUser } from '../../../models/User';

import { ButtonStyle, ContainerSafe, TextStyle } from './styles';

type ParamList = {
  LeagueCreatePreScreen: {
    league: League;
  };
};

export default function SucessLeague() {
  const { user } = useAuth();
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
    <ContainerSafe>
      <TextStyle>Liga cadastrada com sucesso.</TextStyle>
      <CardLeague
        league={league}
        user={user || initUser()}
        isClicked={false}
        point={league.points[0]}
        position={1}
      />
      <ButtonStyle onPress={handleContinuar}>
        <TextStyle>Continuar</TextStyle>
      </ButtonStyle>
    </ContainerSafe>
  );
}
