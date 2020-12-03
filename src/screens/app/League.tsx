import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Link } from '@react-navigation/native'

import CardLeague from '../../components/CardLeague'

import { League } from '../../models/League'

import colors from '../../assets/colors'

const data = [
    {   name: 'Pitaco', logo: 'logoPitaco',
        points: [
            { point: 240, exactScore: 10, user: { name: 'SourhT', email: '123' }},
            { point: 203, exactScore: 12, user: { name: 'Edut', email: 'tan@' }},
            { point: 196, exactScore: 8, user: { name: 'SourhT', email: 'teste@g' }},
        ]
    } as League,
    {   name: 'Dashboard', logo: 'logoPitaco',
        dono: { name: 'Edut', email: 'tan@' },
        points: [
            { point: 240, exactScore: 10, user: { name: 'SourhT', email: '123' }},
            { point: 203, exactScore: 12, user: { name: 'Edut', email: 'tan@' }},
            { point: 196, exactScore: 8, user: { name: 'SourhT', email: 'teste@g' }},
        ]
    } as League,
    {   name: 'Eupaminondas', logo: 'logoPitaco',
        dono: { name: 'SourhT', email: '123' },
        points: [
            { point: 240, exactScore: 10, user: { name: 'SourhT', email: '123' }},
            { point: 203, exactScore: 12, user: { name: 'Edut', email: 'tan@' }},
            { point: 196, exactScore: 8, user: { name: 'SourhT', email: 'teste@g' }},
        ]
    } as League
]

export default function LeagueScreen() {
    const [hasLeague, setHasLeague] = useState(true)
    const [hasClubeFavorite, setClubeFavorite] = useState(false)

    function createLeagueView(){
        return hasLeague ? (
            <View style={[styles.buttom, { backgroundColor: colors.whitePrimary, elevation: 0}]}>
                    <Text style={[styles.buttomText, { color: colors.textGray3 }]}>Você possui uma liga</Text>
            </View>
        ) : (
            <Link to='/Dashboard'>
                <TouchableOpacity style={styles.buttom}>
                    <Text style={styles.buttomText}>Criar Liga</Text>
                </TouchableOpacity>
            </Link>
        )
    }

    function leagueOfClubeFavorite(){
        return hasClubeFavorite ? <CardLeague league={data[1]} /> : (
            <View style={styles.card}>
                <Text style={styles.cardText}>Você não escolheu seu clube de coração</Text>
                <TouchableOpacity style={styles.buttom}>
                    <Text style={styles.buttomText}>Escolher Clube</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                <View style={styles.viewTitle}>
                    <Text style={styles.viewTitleText}>Ligas Gerais</Text>
                </View>
                <CardLeague league={data[0]} />
                { leagueOfClubeFavorite() }
                <View style={styles.viewTitle}>
                    <Text style={styles.viewTitleText}>Ligas com Amigos</Text>
                </View>
                <View style={styles.buttomContainer}>
                    <Link to='/League'>
                        <TouchableOpacity style={styles.buttom}>
                            <Text style={styles.buttomText}>Procurar</Text>
                        </TouchableOpacity>
                    </Link>
                    { createLeagueView() }
                </View>
                { data.map( (league, index) => <CardLeague key={index} league={league} /> )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundWhite
    },
    scroll: {
        paddingHorizontal: 20
    },
    viewTitle: {
        marginTop: 10,
        borderBottomColor: colors.textGray4,
        borderBottomWidth: 1
    },
    viewTitleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.greenPrimary,
        textAlign: 'center'
    },
    buttomContainer: {
        flexDirection: 'row',
        marginVertical: 5,
        height: 30,
        justifyContent: 'space-between'
    },
    buttom: {
        height: 30,
        width: 150,
        backgroundColor: colors.greenPrimary,
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 15,
        elevation: 2
    },
    buttomText: {
        fontSize: 12,
        color: colors.textWhite
    },
    card: {
        height: 90,
        width: '100%',
        padding: 10,
        marginVertical: 10,

        backgroundColor: colors.whitePrimary,
        borderRadius: 20,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    cardText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.textGray2
    }
})