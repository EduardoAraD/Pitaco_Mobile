/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { Switch, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation, CommonActions } from '@react-navigation/native';
import { useAuth } from '../contexts/auth';

import ThemeLigth from '../assets/theme/light';
import ThemeDark from '../assets/theme/dark';

Icon.loadFont();

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    padding: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  userInfoImg: {
    height: 45,
    width: 45,
    marginRight: 8,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  userInfoName: {
    fontSize: 18,
    fontFamily: 'SairaSemiCondensed-Bold',
  },
  userInfoClube: {
    fontSize: 13,
    fontFamily: 'SairaSemiCondensed-Light',
  },
  drawerSection: {
    borderBottomWidth: 1,
  },
  bottonDrawerSection: {
    marginBottom: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  textPreference: {
    fontFamily: 'SairaSemiCondensed-Bold',
    marginLeft: 15,
    marginTop: 4,
  },
});

export default function DrawerComponent(props: DrawerContentComponentProps) {
  const navigation = useNavigation();

  const { user, themeDark, signOut, onChangeThemeDark } = useAuth();
  const theme = themeDark ? ThemeDark : ThemeLigth;

  const toggleTheme = async () => {
    await onChangeThemeDark();
  };

  function handleSignOut() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
    signOut();
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundWhite }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Perfil');
            }}
            style={[
              styles.userInfoSection,
              { borderBottomColor: theme.textGray4 },
            ]}
          >
            <Image
              source={{ uri: user?.avatar }}
              resizeMode="contain"
              style={styles.userInfoImg}
            />
            <View style={styles.userInfo}>
              <Text
                style={[styles.userInfoName, { color: theme.textGray1 }]}
                numberOfLines={1}
              >
                {user?.name}
              </Text>
              {user?.heartClub ? (
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                  <Text
                    style={[styles.userInfoClube, { color: theme.textGray3 }]}
                  >
                    {user?.heartClub?.name}
                  </Text>
                  <Image
                    source={{ uri: user?.heartClub?.logo }}
                    resizeMode="contain"
                    style={{ height: 20, width: 20, marginHorizontal: 3 }}
                  />
                </View>
              ) : (
                <View />
              )}
            </View>
          </TouchableOpacity>
          <View
            style={[
              styles.drawerSection,
              { borderBottomColor: theme.textGray4 },
            ]}
          >
            <DrawerItem
              label="Dashboard"
              labelStyle={{ fontFamily: 'SairaSemiCondensed-Medium' }}
              inactiveTintColor={theme.textGray2}
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate('DashboardPage');
              }}
            />
            <DrawerItem
              label="Pitaco"
              labelStyle={{ fontFamily: 'SairaSemiCondensed-Medium' }}
              inactiveTintColor={theme.textGray2}
              icon={({ color, size }) => (
                <Icon name="scoreboard-outline" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate('Pitaco');
              }}
            />
            <DrawerItem
              label="Campeonato Brasileiro"
              labelStyle={{ fontFamily: 'SairaSemiCondensed-Medium' }}
              inactiveTintColor={theme.textGray2}
              icon={({ color, size }) => (
                <Icon name="soccer" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate('Championship');
              }}
            />
            <DrawerItem
              label="Ligas"
              labelStyle={{ fontFamily: 'SairaSemiCondensed-Medium' }}
              inactiveTintColor={theme.textGray2}
              icon={({ color, size }) => (
                <Icon name="trophy-outline" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate('League');
              }}
            />
            <DrawerItem
              label="Clube de Coração"
              labelStyle={{ fontFamily: 'SairaSemiCondensed-Medium' }}
              inactiveTintColor={theme.textGray2}
              icon={({ color, size }) => (
                <Icon name="heart-outline" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate('HeartClub');
              }}
            />
            <DrawerItem
              label="Amigos"
              labelStyle={{ fontFamily: 'SairaSemiCondensed-Medium' }}
              inactiveTintColor={theme.textGray2}
              icon={({ color, size }) => (
                <Icon name="account-group-outline" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate('Friend');
              }}
            />
          </View>
          <View
            style={[
              styles.drawerSection,
              { borderBottomColor: theme.textGray4 },
            ]}
          >
            <Text style={[styles.textPreference, { color: theme.textGray3 }]}>
              Preferências
            </Text>
            <TouchableOpacity
              onPress={() => {
                toggleTheme();
              }}
            >
              <View style={styles.preference}>
                <Text
                  style={{
                    color: theme.textGray2,
                    fontFamily: 'SairaSemiCondensed-Medium',
                  }}
                >
                  Modo Escuro
                </Text>
                <View pointerEvents="none">
                  <Switch
                    value={themeDark}
                    trackColor={{
                      true: theme.greenPrimary,
                      false: theme.textGray3,
                    }}
                    thumbColor={
                      themeDark ? theme.greenPrimary : theme.textGray3
                    }
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </DrawerContentScrollView>
      <View
        style={[styles.bottonDrawerSection, { borderColor: theme.textGray4 }]}
      >
        <DrawerItem
          label="Sair"
          labelStyle={{ fontFamily: 'SairaSemiCondensed-Medium' }}
          inactiveTintColor={theme.textGray2}
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          onPress={handleSignOut}
        />
      </View>
    </View>
  );
}
