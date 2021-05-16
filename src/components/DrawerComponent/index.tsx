/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { View, Text, Image } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { Switch, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { ThemeContext } from 'styled-components';

import { useAuth } from '../../contexts/auth';

import {
  ButtonDrawerSection,
  DrawerSection,
  PreferenceView,
  SafeContent,
  TextPreference,
  UserInfo,
  UserInfoClube,
  UserInfoImage,
  UserInfoName,
  UserInfoSectionTouch,
} from './styles';
import { useTheme } from '../../contexts/colors';

Icon.loadFont();

export default function DrawerComponent(props: DrawerContentComponentProps) {
  const navigation = useNavigation();

  const { user, signOut } = useAuth();
  const { colors, title } = useContext(ThemeContext);
  const { toggleTheme } = useTheme();

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
    <SafeContent>
      <DrawerContentScrollView {...props}>
        <View style={{ flex: 1 }}>
          <UserInfoSectionTouch
            onPress={() => {
              props.navigation.navigate('Perfil');
            }}
          >
            <UserInfoImage
              source={{ uri: user?.avatar }}
              resizeMode="contain"
            />
            <UserInfo>
              <UserInfoName numberOfLines={1}>{user?.name}</UserInfoName>
              {user?.heartClub ? (
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                  <UserInfoClube>{user?.heartClub?.name}</UserInfoClube>
                  <Image
                    source={{ uri: user?.heartClub?.logo }}
                    resizeMode="contain"
                    style={{ height: 20, width: 20, marginHorizontal: 3 }}
                  />
                </View>
              ) : (
                <View />
              )}
            </UserInfo>
          </UserInfoSectionTouch>
          <DrawerSection>
            <DrawerItem
              label="Dashboard"
              labelStyle={{ fontFamily: 'SairaSemiCondensed-Medium' }}
              inactiveTintColor={colors.textGray2}
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
              inactiveTintColor={colors.textGray2}
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
              inactiveTintColor={colors.textGray2}
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
              inactiveTintColor={colors.textGray2}
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
              inactiveTintColor={colors.textGray2}
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
              inactiveTintColor={colors.textGray2}
              icon={({ color, size }) => (
                <Icon name="account-group-outline" color={color} size={size} />
              )}
              onPress={() => {
                props.navigation.navigate('Friend');
              }}
            />
          </DrawerSection>
          <DrawerSection>
            <TextPreference>Preferências</TextPreference>
            <TouchableOpacity
              onPress={() => {
                toggleTheme();
              }}
            >
              <PreferenceView>
                <Text
                  style={{
                    color: colors.textGray2,
                    fontFamily: 'SairaSemiCondensed-Medium',
                  }}
                >
                  Modo Noturno
                </Text>
                <View pointerEvents="none">
                  <Switch
                    value={title === 'dark'}
                    trackColor={{
                      true: colors.greenPrimary,
                      false: colors.textGray3,
                    }}
                    thumbColor={
                      title === 'dark'
                        ? colors.greenSecundary
                        : colors.textGray2
                    }
                  />
                </View>
              </PreferenceView>
            </TouchableOpacity>
          </DrawerSection>
        </View>
      </DrawerContentScrollView>
      <ButtonDrawerSection>
        <DrawerItem
          label="Sair"
          labelStyle={{ fontFamily: 'SairaSemiCondensed-Medium' }}
          inactiveTintColor={colors.textGray2}
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          onPress={handleSignOut}
        />
      </ButtonDrawerSection>
    </SafeContent>
  );
}
