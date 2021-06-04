import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Snackbar from 'react-native-snackbar';

import { ThemeContext } from 'styled-components';
import { useAuth } from '../../../contexts/auth';

import SearchInput from '../../../components/SearchInput';
import LoadingResponse from '../../../components/LoadingResponse';

import { User } from '../../../models/User';

import { addFriend, getListNotFriendsPage } from '../../../services/friend';

import {
  FlatStyle,
  CardImg,
  CardInfo,
  CardInfoAction,
  CardInfoActionButton,
  CardInfoActionButtonText,
  CardInfoClubImg,
  CardInfoClubName,
  CardInfoName,
  CardStyle,
  ContainerSafe,
  // LoadingStyle,
  CardInfoClub,
} from './styles';

export default function SearchFriend() {
  const { colors } = useContext(ThemeContext);
  const limit = 20;
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);

  async function loadingData() {
    setLoading(true);
    const { data, error } = await getListNotFriendsPage(
      pageCurrent,
      limit,
      search,
      user?.email || ''
    );
    if (error === '') {
      setUsers(data.users);
      setTotal(data.total);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadingData();
    return () => {};
  }, []);

  async function handleSearchUser() {
    setLoadingResponse(true);
    setPageCurrent(1);
    const { data, error } = await getListNotFriendsPage(
      1,
      limit,
      search,
      user?.email || ''
    );
    if (error === '') {
      setUsers(data.users);
      setTotal(data.total);
    }
    setLoadingResponse(false);
  }

  function messageSnackbar(message: string, color: string) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: color,
      textColor: colors.textWhite,
      fontFamily: 'SairaSemiCondensed-Medium',
    });
  }

  async function handleAddUserFriend(userOfList: User, index: number) {
    setLoadingResponse(true);
    const { success, error } = await addFriend(
      user?.email || '',
      userOfList.email
    );
    if (error === '') {
      users.splice(index, 1);
      setUsers([...users]);
      setTotal(total - 1);
      messageSnackbar(success, colors.greenSecundary);
    } else {
      messageSnackbar(error, colors.textRed);
    }
    setLoadingResponse(false);
  }

  function renderItem(item: User, index: number) {
    return (
      <CardStyle key={item.email}>
        <CardImg resizeMode="contain" source={{ uri: item.avatar }} />
        <CardInfo>
          <CardInfoName numberOfLines={1}>@{item.name}</CardInfoName>
          <CardInfoAction>
            <CardInfoClub>
              <CardInfoClubName>{item.heartClub.name}</CardInfoClubName>
              <CardInfoClubImg
                resizeMode="contain"
                source={{ uri: item.heartClub.logo }}
              />
            </CardInfoClub>
            <CardInfoActionButton
              onPress={() => handleAddUserFriend(item, index)}
            >
              <CardInfoActionButtonText>Adicionar</CardInfoActionButtonText>
            </CardInfoActionButton>
          </CardInfoAction>
        </CardInfo>
      </CardStyle>
    );
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

  async function handleLoadMore() {
    if (users.length >= total) return;
    setLoading(true);
    const { data, error } = await getListNotFriendsPage(
      pageCurrent + 1,
      limit,
      search,
      user?.email || ''
    );
    if (error === '') {
      setUsers(users.concat(data.users));
    } else {
      messageSnackbar(error, colors.textRed);
    }
    setPageCurrent(pageCurrent + 1);
    setLoading(false);
  }

  return (
    <ContainerSafe>
      {loadingResponse ? <LoadingResponse /> : <View />}
      <SearchInput
        value={search}
        setValue={setSearch}
        onPress={handleSearchUser}
        title="Pitaqueiros"
      />
      <FlatStyle
        data={users}
        renderItem={({ item, index }) => renderItem(item, index)}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={async () => handleLoadMore()}
        onEndReachedThreshold={1}
      />
    </ContainerSafe>
  );
}
