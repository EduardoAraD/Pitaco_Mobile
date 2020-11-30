import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { useAuth } from '../../contexts/auth'

import TitleComponent from '../../components/TitleComponent'
import InputComponent from '../../components/InputComponent'

import colors from '../../assets/colors'

export default function ForgotPassword() {
    const navigation = useNavigation()
    const { forgotPassword } = useAuth()

    const [email, setEmail] = useState('')

    async function handleForgotPassword(){
        await forgotPassword(email)

        navigation.navigate('ResetPassword')
    }

    return (
        <View style={styles.container}>
            <TitleComponent text="Será enviado um código para seu email para redefinição de senha" />
            <View style={styles.containerEmail}>
                <InputComponent label='E-mail' onChange={setEmail} value={email} />
            </View>
            <Text style={styles.text}>Assim que receber, pressione "Continuar"</Text>
            <TouchableOpacity style={styles.buttonContinuar} 
                onPress={handleForgotPassword}>
                <Text style={styles.textbutton}>Continuar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.backgroundWhite
    },
    containerEmail: {
        flex: 1,
        justifyContent: 'center'
    },
    buttonEmail: {
        height: 64,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,

        backgroundColor: colors.bluePrimary
    },
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
    text: {
        fontSize: 18,
        textAlign: 'center',
        color: colors.textGray3
    }
})