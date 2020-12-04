import React from 'react'
import { View, StyleSheet } from 'react-native'

import ButtonConfirmComponent from '../../components/buttons/BottonConfirmComponent'
import CardLeague from '../../components/CardLeague'
import TitleComponent from '../../components/TitleComponent'

import colors from '../../assets/colors'

import { League } from '../../models/League'
import { useRoute } from '@react-navigation/native'

interface RouteProps {
    league: League
}

export default function LeagueCreatePreView() {
    const route = useRoute();
    const { league } = route.params as RouteProps

    return (
        <View style={styles.container}>
            <TitleComponent text='Pré visualização da sua Liga' />
            <CardLeague league={ league } />
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