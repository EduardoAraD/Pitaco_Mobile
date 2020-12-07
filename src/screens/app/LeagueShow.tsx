import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/native'

import Header from '../../components/HeaderComponent'
import ItemStandingLeague from '../../components/ItemStandingLeague'

import { League } from '../../models/League'
import { User } from '../../models/User'

import colors from '../../assets/colors'

interface RouteProps {
    league: League,
    isDono: boolean,
    user: User
}

export default function LeagueShow() {
    const navigate = useNavigation()
    const route = useRoute();
    const { league, isDono, user } = route.params as RouteProps

    function viewDono() {
        if( league.dono ){
            return isDono ? (
                <Text style={[styles.cardLeagueInfoDono, { color: colors.yellowPrimary }]}>@{league.dono.name}</Text>
            ) : (
                <Text style={styles.cardLeagueInfoDono}>@{league.dono.name}</Text>
            )
        }
    }

    function viewButtomActions() {
        if( isDono ) {
            return (
                <View style={styles.viewButtomAction}>
                    <TouchableOpacity style={styles.buttomAction} 
                        onPress={handleNavigateFriend}>
                        <Text style={styles.buttomActionText}>Convidar Amigos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttomAction} 
                        onPress={handleNavigateSolicitation}>
                        <Text style={styles.buttomActionText}>Solicitações</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        const notParticipating = league.points.filter(point => point.user.email === user.email).length === 0
        if(notParticipating) {
            return <TouchableOpacity style={[styles.buttomAction, { width: 150 }]} >
                <Text style={styles.buttomActionText}>Participar da Liga</Text>
            </TouchableOpacity>
        }
    }

    function handleNavigateFriend(){
        navigate.navigate('Friend')
    }
    function handleNavigateSolicitation(){
        navigate.navigate('SolicitationScreen')
    }

    return (
        <View style={styles.container}>
            <Header title={league.name} back={true} border={true} />
            <ScrollView style={styles.scroll}>
                <View style={styles.cardLeague}>
                    <Image style={styles.cardLeagueImg} resizeMode='contain'
                        source={ league.logo} />
                    <View style={styles.cardLeagueInfo}>
                        <Text style={styles.cardLeagueInfoDescrip}>{league.description}</Text>
                        { viewDono() }
                    </View>
                </View>
                { viewButtomActions() }
                <View style={styles.cardStanding}>
                    <View style={styles.cardStandingTitle}>
                        <Text style={styles.cardStandingTitleText}>Classificação</Text> 
                    </View>
                    { league.points.map((point, index) => 
                        <ItemStandingLeague key={index}
                            position={index + 1}
                            isUser={point.user.email === user.email}
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
    viewButtomAction: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttomAction: {
        height: 30,
        width: 130,
        marginVertical: 10,
        backgroundColor: colors.greenPrimary,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        
        elevation: 2
    },
    buttomActionText: {
        color: colors.textWhite,
        fontSize: 12,
        fontWeight: '600'
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