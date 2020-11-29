import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

import colors from '../../assets/colors'

interface Props {
    onPress: Function
}

export default function ButtonConfirmComponent(props: Props) {
    return (
        <TouchableOpacity onPress={() => props.onPress()}
            style={styles.botton}>
            <Text style={styles.text}>Confirmar</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    botton: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
        height: 64,
        borderRadius: 20,

        backgroundColor: colors.greenPrimary
    },
    text: {
        color: colors.textWhite,
        fontSize: 20,
        fontWeight: 'bold'
    }
})