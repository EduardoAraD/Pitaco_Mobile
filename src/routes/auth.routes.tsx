import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuth } from '../contexts/auth';

import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/SignUp';
import ForgotPassword from '../screens/auth/ForgotPassword';
import ResetPassword from '../screens/auth/ResetPassword';
import SuccessPassword from '../screens/response/SuccessPassword';
import Header from '../components/HeaderComponent';

import ThemeDark from '../assets/theme/dark';
import ThemeLight from '../assets/theme/light';

const Stack = createStackNavigator();

export default function AuhtRoutes() {
  const { themeDark } = useAuth();
  const theme = themeDark ? ThemeDark : ThemeLight;

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.greenPrimary,
        },
        headerTintColor: theme.whitePrimary,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          header: () => <Header title="Cadastre-se" back border />,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          header: () => <Header title="Redefinir a senha" back border />,
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          header: () => <Header title="Redefinir a senha" back border />,
        }}
      />
      <Stack.Screen
        name="SuccessPassword"
        component={SuccessPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
