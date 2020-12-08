import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useAuth } from '../../contexts/auth'

import TitleComponent from '../../components/TitleComponent'
import InputComponent from '../../components/InputComponent'
import ContinuarComponent from '../../components/buttons/ContinuarComponent'

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
                <InputComponent label='E-mail' placeholder='E-mail'
                    onChange={setEmail} value={email} keyboardType='email-address' />
            </View>
            <Text style={styles.text}>Assim que receber, pressione "Continuar"</Text>
            <ContinuarComponent onPress={handleForgotPassword} />
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
    text: {
        fontSize: 18,
        textAlign: 'center',
        color: colors.textGray3
    }
})