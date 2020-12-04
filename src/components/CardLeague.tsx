import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { useAuth } from '../contexts/auth'

import { League } from '../models/League'
import { Point } from '../models/Point'

import colors from '../assets/colors'

interface Props {
    league: League
}

export default function CardLeague({ league } : Props) {
    const { user } = useAuth()
    const navigation = useNavigation()

    const [userPoint, setUserPoint] = useState<Point>()
    const [position, setPosition] = useState('')

    function test() {
        const pointUser = league.points.find((point) => point.user.email === user?.email)
        if(pointUser) {
            const index = league.points.indexOf(pointUser) + 1
            setUserPoint(pointUser)
            setPosition(index.toString())
        }
    }

    useEffect(() => {
        test()
    }, [])

    function viewDono() {
        if(league.dono) {
            return league.dono.email === user?.email ? (
                <Text style={[styles.cardInfoDono, { color: colors.yellowPrimary }]}>@{league.dono.name}</Text>
            ) : (
                <Text style={styles.cardInfoDono}>@{league.dono.name}</Text>
            )
        }
    }

    function handleNavigateLeague() {
        navigation.navigate('LeagueShowScreen', { league })
    }

    return (
        <TouchableOpacity style={styles.card}
            onPress={handleNavigateLeague}>
            <Image style={styles.cardImg} resizeMode='contain'
                source={league.logo} />
            <View style={styles.cardInfo}>
                <Text style={styles.cardInfoTitle}>{league.name}</Text>
                { viewDono() }
                <View style={styles.cardInfoUser}>
                    <Text style={styles.cardInfoUserPos}>{position ? `${position}.` : ''}</Text>
                    <Text style={styles.cardInfoUserName}>{userPoint?.user.name || ''}</Text>
                    <Text style={styles.cardInfoUserPoint}>{userPoint?.point || ''}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        height: 90,
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        marginVertical: 10,

        backgroundColor: colors.whitePrimary,
        borderRadius: 20,
        elevation: 3
    },
    cardImg: {
        height: 70,
        width: 70,
    },
    cardInfo: {
        flex: 1,
        justifyContent: 'space-between',
        marginLeft: 10
    },
    cardInfoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.greenPrimary
    },
    cardInfoDono: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.textGray3
    },
    cardInfoUser: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row'
    },
    cardInfoUserPos: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.textGray3
    },
    cardInfoUserName: {
        marginLeft: 2,
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.textGray1
    },
    cardInfoUserPoint: {
        fontSize: 18,
        fontWeight: 'bold',
        color:colors.greenPrimary,
        flex: 1,
        textAlign: 'right'
    }
})