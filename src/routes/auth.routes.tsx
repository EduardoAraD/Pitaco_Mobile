import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/auth/Login'
import SignUp from '../screens/auth/SignUp'
import ForgotPassword from '../screens/auth/ForgotPassword'
import ResetPassword from '../screens/auth/ResetPassword'
import Header from '../components/HeaderComponent';
import { useAuth } from '../contexts/auth';

const Stack = createStackNavigator();

export default function AuhtRoutes() {
    const { theme } = useAuth()

    return (
        <Stack.Navigator initialRouteName="Login"
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
            <Stack.Screen name='Login' component={Login}
                options={{ headerShown: false }} />
            <Stack.Screen name='SignUp' component={SignUp} 
                options={{ header: () => <Header title='Cadastre-se' back={true} border={true} /> }} />
            <Stack.Screen name='ForgotPassword' component={ForgotPassword}
                options={{ header: () => <Header title='Redefinir a senha' back={true} border={true} /> }} />
            <Stack.Screen name='ResetPassword' component={ResetPassword}
                options={{ header: () => <Header title='Redefinir a senha' back={true} border={true} /> }} />
        </Stack.Navigator>
    );
}
