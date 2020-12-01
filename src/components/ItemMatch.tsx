import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import colors from '../assets/colors'

export default function ItemMatch() {
    return (
        <View style={styles.cardContainer}>
            <Text style={styles.textCardStadium}>Campeonato Brasileiro A 2020 - Arena Castelão</Text>
            <View style={styles.cardGame}>
                <View style={styles.cardGameItem}>
                    <Image style={styles.cardGameImg} resizeMode='contain'
                        source={require('../assets/images/logoPitaco.png')} />
                    <Text style={styles.textCardName}>Athetico Paranaense</Text>
                </View>
                <View style={styles.cardGamePlacar}>
                    <Text style={styles.textCardHora}>27/08 - 18:00</Text>
                    <Text style={styles.textCardPlacar}>0 - 3</Text>
                </View>
                <View style={[styles.cardGameItem, { alignItems: 'flex-start' }]}>
                    <Image style={styles.cardGameImg} resizeMode='contain'
                        source={require('../assets/images/logoPitaco.png')} />
                    <Text style={styles.textCardName}>CEARÀ SC</Text>
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
        backgroundColor: colors.whitePrimary,

        borderColor: colors.textGray4,
        borderBottomWidth: 1,
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