import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native'

import { useAuth } from '../../contexts/auth'

import ButtonConfirmComponent from '../../components/buttons/BottonConfirmComponent'
import CardLeague from '../../components/CardLeague'
import TitleComponent from '../../components/TitleComponent'

import colors from '../../assets/colors'

import { League } from '../../models/League'
import { User } from '../../models/User'

interface RouteProps {
    league: League
}

export default function LeagueCreatePreView() {
    const { user } = useAuth();
    const route = useRoute();
    const { league } = route.params as RouteProps

    return (
        <View style={styles.container}>
            <TitleComponent text='Pré visualização da sua Liga' />
            <CardLeague league={ league } user={user as User} />
            <ButtonConfirmComponent onPress={() => {}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundWhite,
        justifyContent: 'space-around',
        paddingHorizontal: 20
    }
})