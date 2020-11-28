import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
Icon.loadFont();

import DashboardScreen from '../screens/app/Dashboard';
import PitacoScreen from '../screens/app/Pitaco';
import ChampionshipScreen from '../screens/app/Championship';
import LeagueScreen from '../screens/app/League';

import DrawerComponent from '../components/DrawerComponent';

import colors from '../assets/colors'

const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.greenPrimary
      }}>
      <Tab.Screen name="Dashboard" component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-account" color={color} size={size} />
          ),
        }} />
      <Tab.Screen name="Pitaco" component={PitacoScreen}
        options={{
          tabBarLabel: 'Pitaco',
          tabBarIcon: ({ color, size }) => (
            <Icon name="scoreboard" color={color} size={size} />
          ),
        }} />
      <Tab.Screen name="Championship" component={ChampionshipScreen}
        options={{
          tabBarLabel: 'Championship',
          tabBarIcon: ({ color, size }) => (
            <Icon name="soccer" color={color} size={size} />
          ),
        }} />
      <Tab.Screen name="League" component={LeagueScreen} 
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
