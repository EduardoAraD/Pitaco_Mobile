import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import colors from '../assets/colors'

interface Props {
    title: string
}

export default function CardTitlePage({ title }: Props) {
    return (
        <View style={styles.titleCard}>
            <Text style={styles.textTitle}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    titleCard: {
        backgroundColor: colors.whitePrimary,
        height: 50,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.textGray2
    }
})
