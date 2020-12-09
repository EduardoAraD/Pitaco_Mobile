import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

import { useAuth } from '../../contexts/auth'

import SearchInput from '../../components/SearchInput'

import { User } from '../../models/User'

export default function SearchFriend() {
    const { theme } = useAuth()
    const [search, setSearch] = useState('')
    const [users, setUsers] = useState<User[]>([])
    const [usersFilter, setUsersFilter] = useState<User[]>([])

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
        setUsersFilter(dataUser)
    }

    function handleSearchUser() {
        const filter = users.filter( user => user.name.toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()))

        setUsersFilter( filter )
    }

    function handleAddUserFriend(user: User) {
        console.log(user)
    }

    return (
        <View style={{flex: 1, backgroundColor: theme.backgroundWhite}}>
            <SearchInput value={search} setValue={setSearch} onPress={handleSearchUser} title='Pitaqueiros'/>
            <ScrollView style={styles.scroll}>
                { usersFilter.map((user, index) => (
                    <View style={[styles.card,{backgroundColor: theme.whitePrimary}]} key={index} >
                        <Image style={styles.cardImg} resizeMode='contain'
                            source={require('../../assets/images/logoPitaco.png')} />
                        <View style={styles.cardInfo}>
                            <Text style={[styles.cardInfoName,{color: theme.textGray2}]}>@{user.name}</Text>
                            <View style={styles.cardInfoAction}>
                                <View style={styles.cardInfoClub}>
                                    <Text style={{fontSize: 12,color: theme.textGray3}}
                                        >{user.heartClub.name}</Text>
                                    <Image style={styles.cardInfoClubImg} resizeMode='contain'
                                        source={{ uri: user.heartClub.logo }} />
                                </View>
                                <TouchableOpacity style={[styles.cardInfoActionButtom,{backgroundColor: theme.bluePrimary}]}
                                    onPress={ () => handleAddUserFriend(user) }>
                                    <Text style={[styles.cardInfoActionButtomText,{color: theme.textWhite}]}>Adicionar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )) }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    scroll: {
        paddingHorizontal: 20
    },
    card: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        padding: 5,
        marginVertical: 5,
        borderRadius: 10,
    },
    cardImg: {
        height: 50,
        width: 50,
        marginRight: 5
    },
    cardInfo: {
        flex: 1,
        justifyContent: 'space-between'
    },
    cardInfoName: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    cardInfoAction: {
        flexDirection: 'row'
    },
    cardInfoClub: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    cardInfoClubImg: {
        height: 20,
        width: 20,
        marginLeft: 3
    },
    cardInfoActionButtom: {
        height: 20,
        width: 100,
        borderRadius: 10,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center' 
    },
    cardInfoActionButtomText: {
        fontSize: 10,
        fontWeight: '600'
    }
})