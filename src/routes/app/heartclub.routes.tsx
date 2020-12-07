import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import HeartClub from '../../screens/app/HeartClub'
import Header from '../../components/HeaderComponent'

const Stack = createStackNavigator()

export default function HeartClubRoute() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='HeartClubScreen' component={HeartClub}
                options={{ header: () => <Header title='Clube de Coração' border={true} /> }} />
        </Stack.Navigator>
    )
}