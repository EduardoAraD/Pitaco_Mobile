import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './contexts/auth';

import Routes from './routes';
import { ColorsProvider } from './contexts/colors';

export default function App() {
  return (
    <NavigationContainer>
      <ColorsProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ColorsProvider>
    </NavigationContainer>
  );
}
