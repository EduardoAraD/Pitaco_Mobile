import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Championship from '../../screens/app/Championship';
import Header from '../../components/HeaderComponent';

const Stack = createStackNavigator();

export default function ChampionshipRoute() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChampionshipScreen"
        component={Championship}
        options={{
          header: () => <Header title="Championship" border />,
        }}
      />
    </Stack.Navigator>
  );
}
