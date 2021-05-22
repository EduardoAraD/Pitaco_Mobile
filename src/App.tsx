import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import OneSignal from 'react-native-onesignal';

import { AuthProvider } from './contexts/auth';

import Routes from './routes';
import { ColorsProvider } from './contexts/colors';

export default function App() {
  useEffect(() => {
    OneSignal.setAppId('a27097ce-ea00-42eb-993e-bc3d30e3827a');
    OneSignal.setInAppMessageClickHandler((event) => {
      console.log('OneSignal IAM clicked:', event);
    });
  }, []);

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
