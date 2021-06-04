import React, { useContext, useEffect, useState } from 'react';
import Snackbar from 'react-native-snackbar';
import { useNavigation } from '@react-navigation/native';

import { ThemeContext } from 'styled-components';

import { ActivityIndicator } from 'react-native';
import SearchInput from '../../../components/SearchInput';

import { Clube } from '../../../models/Clube';

import { getClubes } from '../../../services/championship';

import {
  CardImg,
  LoadingStyle,
  CardTouch,
  CardText,
  ContainerSafe,
  ScrollStyle,
  TitleText,
  // TitleTextInfo,
  // ViewInfo,
  ViewSearch,
} from './styles';

export default function HeartClub() {
  const navigate = useNavigation();
  const { colors } = useContext(ThemeContext);
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
        backgroundColor: colors.textRed,
        textColor: colors.textWhite,
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
    <ContainerSafe>
      <ViewSearch>
        <TitleText>Escolha o Clube de Coração</TitleText>
        <SearchInput
          value={search}
          setValue={setSearch}
          onPress={handleSearchClub}
          title="Clubes"
        />
        {loading ? (
          <LoadingStyle>
            <ActivityIndicator size="large" color={colors.greenPrimary} />
          </LoadingStyle>
        ) : (
          <ScrollStyle>
            {clubesFilter.map((club) => (
              <CardTouch key={club.id} onPress={() => handleChooseClub(club)}>
                <CardImg resizeMode="contain" source={{ uri: club.logo }} />
                <CardText>{club.name}</CardText>
              </CardTouch>
            ))}
          </ScrollStyle>
        )}
      </ViewSearch>
    </ContainerSafe>
  );
}
