import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native'

import { useAuth } from '../../contexts/auth'

import ButtonConfirmComponent from '../../components/buttons/BottonConfirmComponent'
import CardLeague from '../../components/CardLeague'
import TitleComponent from '../../components/TitleComponent'

import { League } from '../../models/League'
import { User } from '../../models/User'

interface RouteProps {
    league: League
}

export default function LeagueCreatePreView() {
    const { user, theme } = useAuth();
    const route = useRoute();
    const { league } = route.params as RouteProps

    return (
        <View style={[styles.container,{backgroundColor: theme.backgroundWhite}]}>
            <TitleComponent text='Pré visualização da sua Liga' />
            <CardLeague league={ league } user={user as User} />
            <ButtonConfirmComponent onPress={() => {}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        paddingHorizontal: 20
    }
})