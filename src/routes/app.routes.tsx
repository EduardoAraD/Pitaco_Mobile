/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from 'styled-components';

import DashboardRoute from './app/dashboard.routes';
import PitacoRoute from './app/pitaco.routes';
import ChampionshipRoute from './app/championship.routes';
import LeagueRoute from './app/league.routes';
import HeartClubRoute from './app/heartclub.routes';
import FriendRoute from './app/friend.routes';
import PerfilRoute from './app/perfil.routes';

import DrawerComponent from '../components/DrawerComponent';

Icon.loadFont();

const Tab = createBottomTabNavigator();

interface PropsTabBarIcon {
  color: string;
  size: number;
}

function TabNavigation() {
  const { colors } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      initialRouteName="DashboardPage"
      tabBarOptions={{
        activeTintColor: colors.greenPrimary,
        activeBackgroundColor: colors.whitePrimary,
        inactiveTintColor: colors.textGray2,
        inactiveBackgroundColor: colors.whitePrimary,
        labelStyle: { fontFamily: 'SairaSemiCondensed-Medium' },
      }}
    >
      <Tab.Screen
        name="DashboardPage"
        component={DashboardRoute}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }: PropsTabBarIcon) => (
            <Icon name="home-account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Pitaco"
        component={PitacoRoute}
        options={{
          tabBarLabel: 'Pitaco',
          tabBarIcon: ({ color, size }: PropsTabBarIcon) => (
            <Icon name="scoreboard" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Championship"
        component={ChampionshipRoute}
        options={{
          tabBarLabel: 'Campeonato Brasileiro',
          tabBarIcon: ({ color, size }: PropsTabBarIcon) => (
            <Icon name="soccer" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="League"
        component={LeagueRoute}
        options={{
          tabBarLabel: 'Ligas',
          tabBarIcon: ({ color, size }: PropsTabBarIcon) => (
            <Icon name="trophy" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Drawer = createDrawerNavigator();

export default function AppRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeDrawer"
      drawerContent={(props) => <DrawerComponent {...props} />}
    >
      <Drawer.Screen name="HomeDrawer" component={TabNavigation} />
      <Drawer.Screen name="Friend" component={FriendRoute} />
      <Drawer.Screen name="HeartClub" component={HeartClubRoute} />
      <Drawer.Screen name="Perfil" component={PerfilRoute} />
    </Drawer.Navigator>
  );
}
