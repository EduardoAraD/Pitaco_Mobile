import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/auth/Login'
import SignUp from '../screens/auth/SignUp'

const Stack = createStackNavigator();

export default function AuhtRoutes() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    );
}
