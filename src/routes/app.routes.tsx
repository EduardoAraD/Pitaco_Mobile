import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
Icon.loadFont();

import DashboardRoute from './app/dashboard.routes';
import PitacoRoute from './app/pitaco.routes';
import ChampionshipRoute from './app/championship.routes';
import LeagueRoute from './app/league.routes';

import DrawerComponent from '../components/DrawerComponent';

import colors from '../assets/colors'

const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.greenPrimary,
        activeBackgroundColor: colors.whitePrimary,
        inactiveTintColor: colors.textGray2,
        inactiveBackgroundColor: colors.whitePrimary
      }}>
      <Tab.Screen name="Dashboard" component={DashboardRoute}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-account" color={color} size={size} />
          ),
        }} />
      <Tab.Screen name="Pitaco" component={PitacoRoute}
        options={{
          tabBarLabel: 'Pitaco',
          tabBarIcon: ({ color, size }) => (
            <Icon name="scoreboard" color={color} size={size} />
          ),
        }} />
      <Tab.Screen name="Championship" component={ChampionshipRoute}
        options={{
          tabBarLabel: 'Championship',
          tabBarIcon: ({ color, size }) => (
            <Icon name="soccer" color={color} size={size} />
          ),
        }} />
      <Tab.Screen name="League" component={LeagueRoute} 
        options={{
          tabBarLabel: 'League',
          tabBarIcon: ({ color, size }) => (
            <Icon name="trophy" color={color} size={size} />
          ),
        }} />
    </Tab.Navigator>
  )
}

const Drawer = createDrawerNavigator()

export default function AppRoutes() {
  return (
    <Drawer.Navigator drawerContent={ props => <DrawerComponent {...props} />}>
      <Drawer.Screen name="HomeDrawer" component={TabNavigation} />
    </Drawer.Navigator>
  );
}
