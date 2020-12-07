import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Link } from '@react-navigation/native'
import { useAuth } from '../../contexts/auth'

import CardLeague from '../../components/CardLeague'

import { League } from '../../models/League'
import { User } from '../../models/User'

import colors from '../../assets/colors'

const data = [
    {   name: 'Pitaco', logo: require('../../assets/images/logoPitaco.png'),
        description: 'Liga patrocinada pelo criador pelo aplicativo. Agradeço por estarei aqui :)',
        points: [
            { point: 240, exactScore: 10, user: { name: 'SourhT', email: '123' }},
            { point: 203, exactScore: 12, user: { name: 'Edut', email: 'tan@' }},
            { point: 196, exactScore: 8, user: { name: 'SourhT', email: 'teste@g' }},
        ]
    } as League,
    {   name: 'Dashboard', logo: require('../../assets/images/trophy1.png'),
        dono: { name: 'Edut', email: 'tan@' },
        description: 'Liga patrocinada pelo criador pelo aplicativo. Agradeço por estarei aqui :)',
        points: [
            { point: 240, exactScore: 10, user: { name: 'SourhT', email: '123' }},
            { point: 203, exactScore: 12, user: { name: 'Edut', email: 'tan@' }},
            { point: 196, exactScore: 8, user: { name: 'SourhT', email: 'teste@g' }},
        ]
    } as League,
    {   name: 'Eupaminondas', logo: require('../../assets/images/trophy3.png'),
        description: 'Brincando aqui na rua, alou mãe',
        dono: { name: 'SourhT', email: '123' },
        points: [
            { point: 240, exactScore: 10, user: { name: 'SourhT', email: '123' }},
            { point: 203, exactScore: 12, user: { name: 'Edut', email: 'tan@' }},
            { point: 196, exactScore: 8, user: { name: 'SourhT', email: 'teste@g' }},
        ]
    } as League
]

export default function LeagueScreen() {
    const { user } = useAuth()
    const [hasLeague, setHasLeague] = useState(false)
    const [hasClubeFavorite, setClubeFavorite] = useState(false)

    function createLeagueView(){
        return hasLeague ? (
            <View style={[styles.buttom, { backgroundColor: colors.whitePrimary, elevation: 0}]}>
                    <Text style={[styles.buttomText, { color: colors.textGray3 }]}>Você possui uma liga</Text>
            </View>
        ) : (
            <Link to='/LeagueCreateScreen'>
                <TouchableOpacity style={styles.buttom}>
                    <Text style={styles.buttomText}>Criar Liga</Text>
                </TouchableOpacity>
            </Link>
        )
    }

    function leagueOfClubeFavorite(){
        return hasClubeFavorite ? <CardLeague league={data[1]} user={user as User} /> : (
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
                <CardLeague league={data[0]} user={user as User} />
                { leagueOfClubeFavorite() }
                <View style={styles.viewTitle}>
                    <Text style={styles.viewTitleText}>Ligas com Amigos</Text>
                </View>
                <View style={styles.buttomContainer}>
                    <Link to='/SearchLeagueScreen'>
                        <TouchableOpacity style={styles.buttom}>
                            <Text style={styles.buttomText}>Procurar</Text>
                        </TouchableOpacity>
                    </Link>
                    { createLeagueView() }
                </View>
                { data.map( (league, index) => <CardLeague key={index} league={league} user={user as User} /> )}
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