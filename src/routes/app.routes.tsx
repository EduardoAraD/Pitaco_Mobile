import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DashboardScreen from '../screens/app/Dashboard';
import PitacoScreen from '../screens/app/Pitaco';
import ChampionshipScreen from '../screens/app/Championship';
import LeagueScreen from '../screens/app/League';

import DrawerComponent from '../components/DrawerComponent'

const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Pitaco" component={PitacoScreen} />
      <Tab.Screen name="Championship" component={ChampionshipScreen} />
      <Tab.Screen name="League" component={LeagueScreen} />
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
