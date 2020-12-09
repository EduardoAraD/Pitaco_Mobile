import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

import { useAuth } from '../../contexts/auth'

import TitleComponent from '../../components/TitleComponent'

import { User } from '../../models/User'

export default function Solicitation() {
    const { theme } = useAuth()
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        loadingData()
    }, [])

    function loadingData() {
        const dataUser = [
            {   name:'SouthT', email:'ok@',
                heartClub: { name: 'Ferroviário AC', shortName: 'FER',
                    logo: 'https://upload.wikimedia.org/wikipedia/pt/d/d0/Ferrovi%C3%A1rioAC2019.png'}
            } as User,
            {   name:'Hugov', email:'hugo@',
                heartClub: { name: 'Ceará SC', shortName: 'CEA',
                logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Cear%C3%A1_Sporting_Club_logo.svg/410px-Cear%C3%A1_Sporting_Club_logo.svg.png'}
            } as User,
            {   name:'Katos', email:'duarte@',
                heartClub: { name: 'Ceará SC', shortName: 'CEA',
                logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Cear%C3%A1_Sporting_Club_logo.svg/410px-Cear%C3%A1_Sporting_Club_logo.svg.png'}
            } as User,
        ]

        setUsers( dataUser )
    }

    function handleAddUserInLeague(index: number) {
        users.splice(index, 1)
        setUsers( [...users] )
    }
    function handleRefuceUserInLeague(index: number) {
        users.splice(index, 1)
        setUsers( [...users] )
    }

    return (
        <View style={{flex: 1, backgroundColor: theme.backgroundWhite}}>
            <View style={{margin: 20}}>
                <TitleComponent text='Liga de Pitaqueiros que pediram para participar de sua liga' />
            </View>
            <ScrollView style={[styles.scroll,{borderColor: theme.textGray4}]}>
                { users.map((user, index) => (
                    <View style={[styles.card,{backgroundColor: theme.whitePrimary}]} key={index}>
                        <View style={[styles.cardInfo,{borderBottomColor: theme.textGray4}]}>
                            <Image style={styles.cardInfoImg} resizeMode='contain'
                                source={require('../../assets/images/logoPitaco.png')} />
                            <View style={styles.cardInfoUser}>
                                <Text style={[styles.cardInfoUserName,{color: theme.textGray2}]}>@{user.name}</Text>
                                <View style={styles.cardInfoUserClub}>
                                    <Text style={[styles.cardInfoUserClubeName,{color: theme.textGray3}]}
                                        >{user.heartClub.name}</Text>
                                    <Image style={styles.cardInfoUserClubeImg} resizeMode='contain' 
                                        source={{ uri: user.heartClub.logo }} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.cardAction}>
                            <TouchableOpacity style={[styles.cardActionButtom, { backgroundColor: theme.bluePrimary }]}
                                onPress={() => handleAddUserInLeague(index) } >
                                <Text style={[styles.cardActionButtomText,{color: theme.textWhite}]}>Aceitar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.cardActionButtom, { backgroundColor: theme.textRed }]}
                                onPress={() => handleRefuceUserInLeague(index) } >
                                <Text style={[styles.cardActionButtomText,{color: theme.textWhite}]}>Recusar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    scroll: {
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    card: {
        height: 90,
        borderRadius: 10,
        marginVertical: 5
    },
    cardInfo: {
        padding: 5,
        flexDirection: 'row',
        borderBottomWidth: 1
    },
    cardInfoImg: {
        marginHorizontal: 5,
        height: 50,
        width: 50
    },
    cardInfoUser: {
        flex: 1,
        justifyContent: 'space-between'
    },
    cardInfoUserName: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    cardInfoUserClub: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    cardInfoUserClubeName: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    cardInfoUserClubeImg: {
        height: 20,
        width: 20,
        marginHorizontal: 3
    },
    cardAction: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardActionButtom: {
        height: 20,
        width: 120,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardActionButtomText: {
        fontSize: 10,
        fontWeight: '600'
    }
})