import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Perfil from '../../screens/app/Perfil';
import Header from '../../components/HeaderComponent';

const Stack = createStackNavigator();

export default function PerfilRoute() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{ header: () => <Header title="Perfil" border /> }}
      />
    </Stack.Navigator>
  );
}
