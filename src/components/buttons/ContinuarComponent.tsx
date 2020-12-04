import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

import colors from '../../assets/colors'

interface Props {
    onPress: Function
}

export default function ContinuarComponent(props: Props) {
    return (
        <TouchableOpacity style={styles.buttonContinuar} 
            onPress={() => props.onPress()}>
            <Text style={styles.textbutton}>Continuar</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    textbutton: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.whitePrimary
    },
    buttonContinuar: {
        height: 64,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,

        backgroundColor: colors.greenPrimary
    },
})