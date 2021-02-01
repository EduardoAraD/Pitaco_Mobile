import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Perfil from '../../screens/app/Perfil';
import EditPerfil from '../../screens/app/EditPerfil';
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
      <Stack.Screen
        name="EditPerfil"
        component={EditPerfil}
        options={{ header: () => <Header title="Editar Perfil" border back /> }}
      />
    </Stack.Navigator>
  );
}
