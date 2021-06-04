import React, { useState, useEffect, useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import { ThemeContext } from 'styled-components';

import { useAuth } from '../../../contexts/auth';

import SearchInput from '../../../components/SearchInput';

import { League } from '../../../models/League';

import { getLeaguesPage } from '../../../services/league';

import {
  CardImg,
  CardInfo,
  CardInfoDono,
  CardInfoTitle,
  CardTouch,
  ContainerSafe,
  FlatStyle,
  LoadingStyle,
} from './styles';

export default function SearchLeague() {
  const { colors } = useContext(ThemeContext);
  const navigation = useNavigation();
  const { user, championship } = useAuth();
  const limit = 10;
  const [loading, setLoading] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [search, setSearch] = useState('');
  const [leagues, setLeagues] = useState<League[]>([]);
  const [total, setTotal] = useState(0);

  function messageSnackbar(message: string, color: string) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: color,
      textColor: colors.textWhite,
      fontFamily: 'SairaSemiCondensed-Medium',
    });
  }

  async function loadLeague() {
    setLoading(true);
    const { data, error } = await getLeaguesPage(
      championship,
      1,
      limit,
      search
    );
    if (error === '') {
      setLeagues(data.leagues);
      setTotal(data.total);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadLeague();
  }, []);

  async function handleSearchLeague() {
    setLoading(true);
    setPageCurrent(1);
    const { data, error } = await getLeaguesPage(
      championship,
      1,
      limit,
      search
    );
    if (error === '') {
      setLeagues(data.leagues);
      setTotal(data.total);
    }
    setLoading(false);
  }

  async function handleSearchNavigateLeague(index: number) {
    const league = leagues[index];
    const isDono = league.dono ? league.dono.email === user?.email : false;
    navigation.navigate('LeagueShowScreen', {
      league,
      isDono,
      user,
      isLeagueHeartClub: false,
      clubeId: 0,
      position: -1,
      point: null,
    });
  }

  function renderItem(item: League, index: number) {
    return (
      <CardTouch
        key={item.id}
        onPress={() => handleSearchNavigateLeague(index)}
      >
        <CardImg resizeMode="contain" source={item.logo} />
        <CardInfo>
          <CardInfoTitle>{item.name}</CardInfoTitle>
          <CardInfoDono>
            {item.dono?.name !== '' ? `@${item.dono.name}` : ''}
          </CardInfoDono>
        </CardInfo>
      </CardTouch>
    );
  }

  async function handleLoadMore() {
    if (leagues.length >= total) return;
    setLoading(true);
    const { data, error } = await getLeaguesPage(
      championship,
      pageCurrent + 1,
      limit,
      search
    );
    if (error === '') {
      setLeagues(leagues.concat(data.leagues));
    } else {
      messageSnackbar(error, colors.textRed);
    }
    setPageCurrent(pageCurrent + 1);
    setLoading(false);
  }

  function renderFooter() {
    return loading ? (
      <View style={{ margin: 10, alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.greenPrimary} />
      </View>
    ) : (
      <View />
    );
  }

  return (
    <ContainerSafe>
      <SearchInput
        value={search}
        setValue={setSearch}
        onPress={handleSearchLeague}
        title="Ligas"
      />
      {loading ? (
        <LoadingStyle>
          <ActivityIndicator size="large" color={colors.greenPrimary} />
        </LoadingStyle>
      ) : (
        <FlatStyle
          data={leagues}
          renderItem={({ item, index }) => renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={renderFooter}
          onEndReached={async () => handleLoadMore()}
          onEndReachedThreshold={0.1}
        />
      )}
    </ContainerSafe>
  );
}
