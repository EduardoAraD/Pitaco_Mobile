import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Link } from '@react-navigation/native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

import { useAuth } from '../../contexts/auth'

import CardUser from '../../components/CardUser'

import { User } from '../../models/User'

export default function FriendsUser() {
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
        
        setUsers(dataUser)
    }

    return (
        <View style={{flex: 1, backgroundColor: theme.backgroundWhite}}>
            <View style={[styles.viewTitle,{borderBottomColor: theme.textGray4}]}>
                <Text style={[styles.titleText,{color: theme.greenPrimary}]}>Seus Amigos</Text>
                <Link to='/SearchFriend'>
                    <TouchableOpacity style={[styles.titleButton,{backgroundColor: theme.greenSecundary}]}>
                        <Text style={[styles.titleButtonText,{color: theme.textWhite}]}>Procurar Amigos</Text>
                    </TouchableOpacity>
                </Link>
            </View>
            <ScrollView style={styles.scroll}>
                { users.map((user, index) => <CardUser user={user} key={index} /> ) }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    viewTitle: {
        marginTop: 30,
        marginHorizontal: 20,
        paddingBottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    titleButton: {
        height: 30,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 2
    },
    titleButtonText: {
        fontSize: 12,
        fontWeight: '600'
    },
    scroll: {
        paddingHorizontal: 20
    }
})