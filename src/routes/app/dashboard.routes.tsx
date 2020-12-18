import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../../screens/app/Dashboard';
import Header from '../../components/HeaderComponent';

const Stack = createStackNavigator();

export default function DashboardRoute() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DashboardScreen"
        component={Dashboard}
        options={{ header: () => <Header title="Dashboard" border /> }}
      />
    </Stack.Navigator>
  );
}
