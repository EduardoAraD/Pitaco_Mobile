import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';

import { useAuth } from '../../contexts/auth';

import SearchInput from '../../components/SearchInput';

import { User } from '../../models/User';

import { addFriend, getListNotFriends } from '../../services/friend';

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
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
    fontWeight: 'bold',
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
    width: 100,
    borderRadius: 10,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInfoActionButtomText: {
    fontSize: 10,
    fontWeight: '600',
  },
});

export default function SearchFriend() {
  const { theme, user } = useAuth();
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [usersFilter, setUsersFilter] = useState<User[]>([]);

  async function loadingData() {
    const { data, error } = await getListNotFriends(user?.email || '');
    if (error === '') {
      setUsersFilter(data);
      setUsers(data);
    }
  }

  useEffect(() => {
    loadingData();
  }, []);

  function handleSearchUser() {
    const filter = users.filter((item) =>
      item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
    setUsersFilter(filter);
  }

  function messageSnackbar(message: string, color: string) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: color,
      textColor: theme.textWhite,
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
      messageSnackbar(success, theme.greenSecundary);
    } else {
      messageSnackbar(error, theme.textRed);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundWhite }}>
      <SearchInput
        value={search}
        setValue={setSearch}
        onPress={handleSearchUser}
        title="Pitaqueiros"
      />
      <ScrollView style={styles.scroll}>
        {usersFilter.map((item, index) => (
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
              <Text style={[styles.cardInfoName, { color: theme.textGray2 }]}>
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
        ))}
      </ScrollView>
    </View>
  );
}
