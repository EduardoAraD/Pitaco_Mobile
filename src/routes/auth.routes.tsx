import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeContext } from 'styled-components';

import { useAuth } from '../contexts/auth';

import AppRoutes from './app.routes';
import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/SignUp';
import ForgotPassword from '../screens/auth/ForgotPassword';
import ResetPassword from '../screens/auth/ResetPassword';
import SuccessPassword from '../screens/response/SuccessPassword';
import Header from '../components/HeaderComponent';

const Stack = createStackNavigator();

export default function AuhtRoutes() {
  const { colors } = useContext(ThemeContext);
  const { signed } = useAuth();

  return (
    <Stack.Navigator
      initialRouteName={signed ? 'Dashboard' : 'Login'}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.greenPrimary,
        },
        headerTintColor: colors.whitePrimary,
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
      <Stack.Screen
        name="Dashboard"
        component={AppRoutes}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
