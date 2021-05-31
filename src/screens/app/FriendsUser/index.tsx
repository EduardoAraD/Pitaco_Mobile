import React, { useContext, useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import { Link } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';

import { ThemeContext } from 'styled-components';
import { useAuth } from '../../../contexts/auth';

import CardUser from '../../../components/CardUser';

import { User } from '../../../models/User';

import { getFriends } from '../../../services/friend';

import {
  ContainerSafe,
  ScrollStyle,
  TextTitle,
  TitleButton,
  TitleButtonText,
  ViewTitle,
} from './styles';

export default function FriendsUser() {
  const { user } = useAuth();
  const { colors } = useContext(ThemeContext);
  const [refresh, setRefresh] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  async function loadingData() {
    const { data, error } = await getFriends(user?.email || '');
    if (error === '') {
      setUsers(data);
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

  useEffect(() => {
    loadingData();
    return () => {};
  }, []);

  async function onRefreshData() {
    setRefresh(true);
    await loadingData();
    setRefresh(false);
  }

  return (
    <ContainerSafe>
      <ViewTitle>
        <TextTitle>Seus Amigos</TextTitle>
        <Link to="/SearchFriend">
          <TitleButton>
            <TitleButtonText>Procurar Amigos</TitleButtonText>
          </TitleButton>
        </Link>
      </ViewTitle>
      {/* isso pode ser um Flatlist */}
      <ScrollStyle
        refreshControl={
          <RefreshControl
            colors={[colors.greenSecundary]}
            refreshing={refresh}
            onRefresh={onRefreshData}
          />
        }
      >
        {users.map((item) => (
          <CardUser user={item} key={item.email} />
        ))}
      </ScrollStyle>
    </ContainerSafe>
  );
}
