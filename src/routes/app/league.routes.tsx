import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import League from '../../screens/app/League'
import LeagueShow from '../../screens/app/LeagueShow'
import LeagueCreate from '../../screens/app/LeagueCreate'
import LeagueCreatePreView from '../../screens/app/LeagueCreatePreView'
import SearchLeague from '../../screens/app/SearchLeague'
import Solicitation from '../../screens/app/Solicitation'
import Header from '../../components/HeaderComponent'

const Stack = createStackNavigator()

export default function LeagueRoute() {
    return(
        <Stack.Navigator initialRouteName='LeagueScreen'>
            <Stack.Screen name='LeagueScreen' component={League}
                options={{ header: () => <Header title='Ligas' border={true} /> }} />
            <Stack.Screen name='LeagueShowScreen' component={LeagueShow}
                options={{ headerShown: false }} />
            <Stack.Screen name='LeagueCreateScreen' component={LeagueCreate}
                options={{ header: () => <Header title='Criar Liga' back={true} border={true} /> }} />
            <Stack.Screen name='LeagueCreatePreScreen' component={LeagueCreatePreView}
                options={{ header: () => <Header title='Pré view Liga' back={true} border={true} /> }} />
            <Stack.Screen name='SearchLeagueScreen' component={SearchLeague}
                options={{ header: () => <Header title='Procurar Liga' back={true} border={true} /> }} />
            <Stack.Screen name='SolicitationScreen' component={Solicitation}
                options={{ header: () => <Header title='Solicitações' back={true} border={true} /> }} />
        </Stack.Navigator>
    )
}