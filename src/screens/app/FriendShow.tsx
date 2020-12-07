import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useRoute } from '@react-navigation/native'

import HeaderComponent from '../../components/HeaderComponent'
import CardConquest from '../../components/CardConquest'

import { User } from '../../models/User'
import { League } from '../../models/League'
import { Conquest } from '../../models/Conquest'

import colors from '../../assets/colors'

interface ParamsFriend {
    user: User
}

export default function FriendShow() {
    const route = useRoute()
    const { user } = route.params as ParamsFriend
    const [conquests, setConquests] = useState<Conquest[]>([])
    const [leagues, setLeagues] = useState<League[]>([])
    const [convit, setConvit] = useState(false)

    useEffect(() => {
        loadingData()
    }, [])

    function loadingData() {
        const dataConquest: Conquest[] = [
            {   league: { name: 'Pitaco', logo: require('../../assets/images/trophy1.png') },
                position: 1
            } as Conquest,
            {   league: { name: 'Dashboard', logo: require('../../assets/images/trophy1.png') },
                position: 1
            } as Conquest
        ]
        const dataLeague = [
            {   name: 'Pitaco', logo: require('../../assets/images/logoPitaco.png'),
                description: 'Liga patrocinada pelo criador pelo aplicativo. Agradeço por estarei aqui :)'
            } as League,
            {   name: 'Dashboard', logo: require('../../assets/images/trophy1.png'),
                dono: { name: 'Edut', email: 'tan@' },
                description: 'Liga patrocinada pelo criador pelo aplicativo. Agradeço por estarei aqui :)'
            } as League,
            {   name: 'Eupaminondas', logo: require('../../assets/images/trophy3.png'),
                description: 'Brincando aqui na rua, alou mãe',
                dono: { name: 'SourhT', email: '123' }
            } as League,
            {   name: 'Dashboard', logo: require('../../assets/images/trophy1.png'),
                dono: { name: 'Edut', email: 'tan@' },
                description: 'Liga patrocinada pelo criador pelo aplicativo. Agradeço por estarei aqui :)'
            } as League,
            {   name: 'Eupaminondas', logo: require('../../assets/images/trophy3.png'),
                description: 'Brincando aqui na rua, alou mãe',
                dono: { name: 'SourhT', email: '123' }
            } as League
        ]

        setConquests( dataConquest )
        setLeagues( dataLeague )
    }

    function handleConvidLeague(){
        setConvit(true)
        console.log(`Convite para ${user.name} para minha liga`)
    }

    function viewDono(league: League) {
        if(league.dono) {
            return league.dono.email === user.email ? (
                <Text style={[styles.cardInfoDono, { color: colors.yellowPrimary }]}>@{league.dono.name}</Text>
            ) : (
                <Text style={styles.cardInfoDono}>@{league.dono.name}</Text>
            )
        }
    }

    function convidLeague(){
        return convit ? (
            <View style={styles.buttomNot} >
                <Text style={styles.buttomText}>Já está na liga</Text>
            </View>
        ) : (
            <TouchableOpacity style={styles.buttom}
                onPress={handleConvidLeague}>
                <Text style={styles.buttomText}>Adicionar na minha Liga</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <HeaderComponent title={user.name} back={true} border={true} />
            <ScrollView style={styles.viewBody}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                    <Text style={styles.textTitle}>Torcedor(a)</Text>
                    { convidLeague() }
                </View>
                <View style={styles.viewClub}>
                    <Text style={styles.viewClubName}>{user.heartClub.name}</Text>
                    <Image style={styles.viewClubImg} resizeMode='contain'
                        source={{ uri: user.heartClub.logo }} />
                </View>
                <Text style={styles.textTitle}>Maiores Conquistas</Text>
                <ScrollView style={styles.scrollHor} horizontal={true} >
                    { conquests.map((conquest, index) => <CardConquest conquest={conquest} key={index} /> ) }
                </ScrollView>
                <Text style={styles.textTitle}>Ligas atuais em Comum</Text>
                <View style={styles.scrollVer}>
                    { leagues.map((league, index) => 
                        <View style={styles.card} key={index}>
                            <Image style={styles.cardImg} resizeMode='contain'
                                source={league.logo} />
                            <View style={styles.cardInfo}>
                                <Text style={styles.cardInfoTitle}>{league.name}</Text>
                                { viewDono(league) }
                            </View>
                        </View>
                    )}
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
    viewBody: {
        flex: 1,
        paddingHorizontal: 20
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.greenPrimary
    },
    viewClub: {
        paddingVertical: 10,
        marginBottom: 10,
        borderBottomColor: colors.textGray4,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    viewClubName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.textGray2
    },
    viewClubImg: {
        height: 50,
        width: 50
    },
    scrollHor: {
        marginVertical: 10,
    },
    scrollVer: {
        marginTop: 15
    },
    buttom: {
        height: 22,
        width: 150,
        borderRadius: 10,
        backgroundColor: colors.bluePrimary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttomNot: {
        height: 22,
        width: 150,
        borderRadius: 10,
        backgroundColor: colors.textGray4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttomText: {
        fontWeight: '600',
        fontSize: 10,
        color: colors.whitePrimary
    },
    card: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        padding: 5,
        marginVertical: 5,

        backgroundColor: colors.whitePrimary,
        borderRadius: 10,
        elevation: 1
    },
    cardImg: {
        height: 40,
        width: 40,
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
    }
})