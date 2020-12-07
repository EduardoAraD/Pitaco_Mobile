import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { User } from '../models/User'

import colors from '../assets/colors'

interface Props {
    user: User
}

export default function CardUser({ user }: Props) {
    const navigate = useNavigation()

    function handleNavigateFriendShow() {
        navigate.navigate('FriendShow', { user })
    }

    return (
        <TouchableOpacity style={styles.card}
            onPress={handleNavigateFriendShow}>
            <Image style={styles.cardImg} resizeMode='contain' 
                source={require('../assets/images/logoPitaco.png')} />
            <View style={styles.cardInfo}>
                <Text style={styles.cardInfoName}>@{user.name}</Text>
                <View style={styles.cardInfoClube}>
                    <Text style={styles.cardInfoClubeName}>{user.heartClub.name}</Text>
                    <Image style={styles.cardInfoClubeImg} resizeMode='contain'
                        source={{ uri:user.heartClub.logo }} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        height: 70,
        backgroundColor: colors.whitePrimary,
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        elevation: 2,
        flexDirection: 'row',
        marginVertical: 5
    },
    cardImg: {
        height: 60,
        width: 60,
        marginRight: 10
    },
    cardInfo: {
        flex: 1,
        justifyContent: 'space-between',
    },
    cardInfoName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.greenPrimary,
    },
    cardInfoClube: {
        flexDirection: 'row'        
    },
    cardInfoClubeName: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.textGray3
    },
    cardInfoClubeImg: {
        height: 20,
        width: 20,
        marginHorizontal: 3
    }
})