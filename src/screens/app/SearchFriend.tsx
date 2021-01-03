import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';

import { useAuth } from '../../contexts/auth';

import SearchInput from '../../components/SearchInput';

import { User } from '../../models/User';

import ThemeLigth from '../../assets/theme/light';
import ThemeDark from '../../assets/theme/dark';

import { addFriend, getListNotFriendsPage } from '../../services/friend';

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
  },
  loading: {
    height: 300,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    padding: 5,
    marginVertical: 5,
    borderRadius: 10,
  },
  cardImg: {
    height: 50,
    width: 50,
    marginRight: 5,
  },
  cardInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardInfoName: {
    fontSize: 18,
    fontFamily: 'SairaSemiCondensed-Bold',
  },
  cardInfoAction: {
    flexDirection: 'row',
  },
  cardInfoClub: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  cardInfoClubImg: {
    height: 20,
    width: 20,
    marginLeft: 3,
  },
  cardInfoActionButtom: {
    height: 20,
    width: 80,
    borderRadius: 10,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInfoActionButtomText: {
    fontSize: 10,
    fontFamily: 'SairaSemiCondensed-Light',
  },
});

export default function SearchFriend() {
  const limit = 20;
  const { themeDark, user } = useAuth();
  const theme = themeDark ? ThemeDark : ThemeLigth;
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
    setLoading(false);
  }

  function messageSnackbar(message: string, color: string) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: color,
      textColor: theme.textWhite,
      fontFamily: 'SairaSemiCondensed-Medium',
    });
  }

  async function handleAddUserFriend(userOfList: User, index: number) {
    const { success, error } = await addFriend(
      user?.email || '',
      userOfList.email
    );
    if (error === '') {
      users.splice(index, 1);
      setUsers([...users]);
      setTotal(total - 1);
      messageSnackbar(success, theme.greenSecundary);
    } else {
      messageSnackbar(error, theme.textRed);
    }
  }

  function renderItem(item: User, index: number) {
    return (
      <View
        style={[styles.card, { backgroundColor: theme.whitePrimary }]}
        key={item.email}
      >
        <Image
          style={styles.cardImg}
          resizeMode="contain"
          source={{ uri: item.avatar }}
        />
        <View style={styles.cardInfo}>
          <Text
            style={[styles.cardInfoName, { color: theme.textGray2 }]}
            numberOfLines={1}
          >
            @{item.name}
          </Text>
          <View style={styles.cardInfoAction}>
            <View style={styles.cardInfoClub}>
              <Text style={{ fontSize: 12, color: theme.textGray3 }}>
                {item.heartClub.name}
              </Text>
              <Image
                style={styles.cardInfoClubImg}
                resizeMode="contain"
                source={{ uri: item.heartClub.logo }}
              />
            </View>
            <TouchableOpacity
              style={[
                styles.cardInfoActionButtom,
                { backgroundColor: theme.bluePrimary },
              ]}
              onPress={() => handleAddUserFriend(item, index)}
            >
              <Text
                style={[
                  styles.cardInfoActionButtomText,
                  { color: theme.textWhite },
                ]}
              >
                Adicionar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  function renderFooter() {
    return loading ? (
      <View style={{ margin: 10, alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.greenPrimary} />
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
      messageSnackbar(error, theme.textRed);
    }
    setPageCurrent(pageCurrent + 1);
    setLoading(false);
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundWhite }}>
      <SearchInput
        value={search}
        setValue={setSearch}
        onPress={handleSearchUser}
        title="Pitaqueiros"
      />
      <FlatList
        style={styles.scroll}
        data={users}
        renderItem={({ item, index }) => renderItem(item, index)}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={async () => handleLoadMore()}
        onEndReachedThreshold={1}
      />
    </View>
  );
}
