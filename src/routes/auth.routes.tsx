import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/auth/Login'
import SignUp from '../screens/auth/SignUp'

import colors from '../assets/colors'

const Stack = createStackNavigator();

export default function AuhtRoutes() {
    return (
        <Stack.Navigator initialRouteName="Login"
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
            <Stack.Screen name="Login" component={Login}
                options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} 
                options={{ title: 'Cadastre-se' }} 
            />
        </Stack.Navigator>
    );
}
