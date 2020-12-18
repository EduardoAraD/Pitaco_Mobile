import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, RefreshControl } from 'react-native';
import { Link } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';

import { useAuth } from '../../contexts/auth';

import CardUser from '../../components/CardUser';

import { User } from '../../models/User';

import { getFriends } from '../../services/friend';

const styles = StyleSheet.create({
  viewTitle: {
    marginTop: 30,
    marginHorizontal: 20,
    paddingBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleButton: {
    height: 30,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 2,
  },
  titleButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  scroll: {
    paddingHorizontal: 20,
  },
});

export default function FriendsUser() {
  const { theme, user } = useAuth();
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
        backgroundColor: theme.textRed,
        textColor: theme.textWhite,
      });
    }
  }

  useEffect(() => {
    loadingData();
  }, []);

  async function onRefreshData() {
    setRefresh(true);
    await loadingData();
    setRefresh(false);
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundWhite }}>
      <View style={[styles.viewTitle, { borderBottomColor: theme.textGray4 }]}>
        <Text style={[styles.titleText, { color: theme.greenPrimary }]}>
          Seus Amigos
        </Text>
        <Link to="/SearchFriend">
          <TouchableOpacity
            style={[
              styles.titleButton,
              { backgroundColor: theme.greenSecundary },
            ]}
          >
            <Text style={[styles.titleButtonText, { color: theme.textWhite }]}>
              Procurar Amigos
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
      <ScrollView
        style={styles.scroll}
        refreshControl={
          <RefreshControl
            colors={[theme.greenSecundary]}
            refreshing={refresh}
            onRefresh={onRefreshData}
          />
        }
      >
        {users.map((item) => (
          <CardUser user={item} key={item.email} />
        ))}
      </ScrollView>
    </View>
  );
}
