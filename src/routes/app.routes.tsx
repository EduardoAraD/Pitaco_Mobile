import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Dashboard from '../screens/app/Dashboard';
import Pitaco from '../screens/app/Pitaco';

const Drawer = createDrawerNavigator();

export default function AppRoutes() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Pitaco" component={Pitaco} />
    </Drawer.Navigator>
  );
}
