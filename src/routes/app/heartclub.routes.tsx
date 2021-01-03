import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../../components/HeaderComponent';
import HeartClub from '../../screens/app/HeartClub';
import ClubShow from '../../screens/app/ClubShow';

const Stack = createStackNavigator();

export default function HeartClubRoute() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HeartClubScreen"
        component={HeartClub}
        options={{
          header: () => <Header title="Clube de Coração" border />,
        }}
      />
      <Stack.Screen
        name="ClubShowScreen"
        component={ClubShow}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
