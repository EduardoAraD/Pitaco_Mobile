import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

import colors from '../assets/colors'

interface PropsInput {
    label: string,
    value: string,
    placeholder:string,
    keyboardType?: "email-address" | "default" | "numeric" | "phone-pad" | "number-pad" | "decimal-pad" | "visible-password" | "ascii-capable" | "numbers-and-punctuation" | "url" | "name-phone-pad" | "twitter" | "web-search",
    password?: boolean,
    onChange: Function
}

export default function InputComponent ({ label, value, placeholder, keyboardType = "default", password = false, onChange }: PropsInput) {
    return(
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.input} value={value}
                onChangeText={text => onChange(text)} keyboardType={keyboardType}
                placeholder={placeholder} placeholderTextColor={colors.textGray5}
                secureTextEntry={password} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginVertical: 4
    },
    label: {
        fontWeight: '600',
        color: colors.textGray3,
        paddingBottom: 3
    },
    input: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 20,
        height: 56,

        backgroundColor: colors.whitePrimary,
        color: colors.textGray3,
        borderWidth: 1,
        borderColor: colors.textGray3,

        fontSize: 20
    }
})