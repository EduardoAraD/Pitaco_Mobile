import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useRoute } from '@react-navigation/native'

import Header from '../../components/HeaderComponent'
import ItemStandingLeague from '../../components/ItemStandingLeague'

import { useAuth } from '../../contexts/auth'

import { League } from '../../models/League'

import colors from '../../assets/colors'

interface RouteProps {
    league: League
}

export default function LeagueShow() {
    const route = useRoute();
    const { league } = route.params as RouteProps
    const { user } = useAuth()

    function viewDono() {
        if(league.dono) {
            return league.dono.email === user?.email ? (
                <Text style={[styles.cardLeagueInfoDono, { color: colors.yellowPrimary }]}>@{league.dono.name}</Text>
            ) : (
                <Text style={styles.cardLeagueInfoDono}>@{league.dono.name}</Text>
            )
        }
    }

    return (
        <View style={styles.container}>
            <Header title={league.name} back={true} border={true} />
            <ScrollView style={styles.scroll}>
                <View style={styles.cardLeague}>
                    <Image style={styles.cardLeagueImg} resizeMode='contain'
                        source={ league.logo === 'logoPitaco' ? require('../../assets/images/logoPitaco.png') :
                            {uri: 'https://upload.wikimedia.org/wikipedia/pt/d/d0/Ferrovi%C3%A1rioAC2019.png'}} />
                    <View style={styles.cardLeagueInfo}>
                        <Text style={styles.cardLeagueInfoDescrip}>{league.name}</Text>
                        { viewDono() }
                    </View>
                </View>
                <View style={styles.cardStanding}>
                    <View style={styles.cardStandingTitle}>
                        <Text style={styles.cardStandingTitleText}>Classificação</Text> 
                    </View>
                    { league.points.map((point, index) => 
                        <ItemStandingLeague key={index}
                            position={index + 1}
                            isUser={point.user.email === user?.email}
                            point={point}
                        />)
                    }
                </View>
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
    cardLeague: {
        height: 90,
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        marginVertical: 20,

        backgroundColor: colors.whitePrimary,
        borderRadius: 20,
        elevation: 3
    },
    cardLeagueImg: {
        height: 70,
        width: 70,
    },
    cardLeagueInfo: {
        flex: 1,
        justifyContent: 'space-between',
        marginLeft: 10
    },
    cardLeagueInfoDescrip: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.textGray3
    },
    cardLeagueInfoDono: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.greenSecundary
    },
    cardStanding: {
        marginVertical: 20,
        width: '100%',
        backgroundColor: colors.whitePrimary,
        borderRadius: 20,
        elevation: 3
    },
    cardStandingTitle: {
        height: 40,
        paddingLeft: 15,
        justifyContent: 'center',

        borderBottomWidth: 1,
        borderColor: colors.textGray3
    },
    cardStandingTitleText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.textGray3
    },
})