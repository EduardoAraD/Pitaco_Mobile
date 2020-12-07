import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

import colors from '../assets/colors'
import { Conquest } from '../models/Conquest'

interface Props {
    conquest: Conquest
}

export default function CardConquest({ conquest}: Props) {
    return (
        <View style={styles.card}>
            <Image style={styles.cardImg} resizeMode='contain'
                source={conquest.league.logo} />
            <View style={styles.cardInfo}>
                <Text style={styles.cardInfoName}>{conquest.league.name}</Text>
                <Text style={styles.cardInfoPos}>{conquest.position}° Lugar</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.whitePrimary,
        height: 50,
        width: 180,
        marginRight: 10,
        borderRadius: 10,
        padding: 5,
        flexDirection: 'row',

        elevation: 1
    },
    cardImg: {
        height: 40,
        width: 40,
        marginRight: 2
    },
    cardInfo: {
        flex: 1,
        justifyContent: 'space-between'
    },
    cardInfoName: {
        fontSize: 13,
        fontWeight: 'bold',
        color: colors.yellowPrimary
    },
    cardInfoPos: {
        fontSize: 10,
        color: colors.textGray2
    }
})