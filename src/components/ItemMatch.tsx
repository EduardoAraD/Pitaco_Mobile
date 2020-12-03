import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import { Match } from '../models/Match'

import colors from '../assets/colors'

interface Props {
    match: Match
}

export default function ItemMatch({ match }: Props) {
    return (
        <View style={styles.cardContainer}>
            <Text style={styles.textCardStadium}>Campeonato Brasileiro A 2020 - {match.stadium}</Text>
            <View style={styles.cardGame}>
                <View style={styles.cardGameItem}>
                    <Image style={styles.cardGameImg} resizeMode='contain'
                        source={{ uri: match.clubeHome.logo }} />
                    <Text style={styles.textCardName}>{match.clubeHome.name}</Text>
                </View>
                <View style={styles.cardGamePlacar}>
                    <Text style={styles.textCardHora}>{`${match.date} - ${match.hour}`}</Text>
                    <Text style={styles.textCardPlacar}>{`${match.golsHome} - ${match.golsAway}`}</Text>
                </View>
                <View style={[styles.cardGameItem, { alignItems: 'flex-start' }]}>
                    <Image style={styles.cardGameImg} resizeMode='contain'
                        source={{ uri: match.clubeAway.logo }} />
                    <Text style={styles.textCardName}>{match.clubeAway.name}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        paddingVertical: 2,
        alignItems: 'center',

        borderColor: colors.textGray4,
        borderTopWidth: 1,
    },
    cardGame: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardGameImg: {
        height: 30,
        width: 30,
    },
    cardGameItem:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    cardGamePlacar: {
        marginHorizontal: 10,
        alignItems: 'center',
    },
    textCardStadium: {
        fontSize: 9,
        color: colors.textGray2
    },
    textCardHora: {
        fontSize: 7,
        fontWeight: '600',
        color: colors.textGray3
    },
    textCardPlacar: {
        fontSize: 25,
        fontWeight: 'bold',
        color: colors.textGray1
    },
    textCardName: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.textGray2
    }
})