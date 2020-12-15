import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SuccessLeague from '../../screens/response/SuccessLeague';

const Stack = createStackNavigator();

export default function SuccessRoute() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SuccessLeagueScreen"
        component={SuccessLeague}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
