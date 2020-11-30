import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Pitaco from '../../screens/app/Pitaco'
import Header from '../../components/HeaderComponent'

const Stack = createStackNavigator()

export default function PitacoRoute() {
    return(
        <Stack.Navigator>
            <Stack.Screen name='PitacoScreen' component={Pitaco}
                options={{ header: () => <Header title='Pitaco' border={true} /> }} />
        </Stack.Navigator>
    )
}