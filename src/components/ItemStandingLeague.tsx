import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

import { Point } from '../models/Point'
import colors from '../assets/colors'

interface Props {
    point: Point,
    position: number,
    isUser: boolean
}

export default function ItemStandingLeague({ point, position, isUser }: Props){
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{position}.</Text>
            <Image style={styles.img} resizeMode='contain'
                source={require('../assets/images/logoPitaco.png')} />
            <Text style={[styles.textName,{ color: isUser ? colors.greenPrimary : colors.textGray2 }]}
                >{point.user.name}</Text>
            <Text style={styles.textPoint}>{point.point}</Text>
            <Text style={[styles.text, { width: 34, textAlign: 'right' }]}>{point.exactScore}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        padding: 5,
        paddingHorizontal: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',

        borderTopWidth: 1,
        borderTopColor: colors.textGray4
    },
    text: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.textGray3
    },
    img: {
        height: 30,
        width: 30,
        marginHorizontal: 5
    },
    textName: {
        fontWeight: 'bold',
        fontSize: 16,
        flex: 1
    },
    textPoint: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.greenPrimary
    }
})