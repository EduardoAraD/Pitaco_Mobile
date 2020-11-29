import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import colors from '../assets/colors'

interface Props {
    text: string
}

export default function TitleComponent(props: Props) {
    return (
        <View style={styles.content}>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: colors.textGray4,

        justifyContent: 'center',
        alignItems: 'center',

        marginBottom: 15
    },
    text: {
        fontSize: 20,
        fontWeight: '800',
        color: colors.textGray3,
        textAlign: 'center'
    }
})