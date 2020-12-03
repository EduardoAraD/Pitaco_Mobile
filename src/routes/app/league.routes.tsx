import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import League from '../../screens/app/League'
import Header from '../../components/HeaderComponent'

const Stack = createStackNavigator()

export default function LeagueRoute() {
    return(
        <Stack.Navigator>
            <Stack.Screen name='LeagueScreen' component={League}
                options={{ header: () => <Header title='League' border={true} /> }} />
        </Stack.Navigator>
    )
}