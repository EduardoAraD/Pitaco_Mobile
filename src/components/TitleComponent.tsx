import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { useAuth } from '../contexts/auth'

interface Props {
    text: string
}

export default function TitleComponent(props: Props) {
    const { theme } = useAuth()

    return (
        <View style={[styles.content,{borderBottomColor: theme.textGray4}]}>
            <Text style={[styles.text,{color: theme.textGray3}]}>{props.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        width: '100%',
        borderBottomWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    text: {
        fontSize: 20,
        fontWeight: '800',
        textAlign: 'center'
    }
})