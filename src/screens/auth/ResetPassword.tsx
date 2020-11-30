import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useAuth } from '../../contexts/auth'

import TitleComponent from '../../components/TitleComponent'
import InputComponent from '../../components/InputComponent'
import ButtonConfirm from '../../components/buttons/BottonConfirmComponent'

import colors from '../../assets/colors'

export default function ResetPassword() {
    const navigation = useNavigation()
    const { resetPassword } = useAuth()

    const [codig, setCodig] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    async function handleConfirm() {
        await resetPassword(codig, password, confirmPassword)

        navigation.navigate('Success')
    }

    return (
        <View style={styles.container}>
            <TitleComponent text='Escreva o código recebido pelo e-mail junto com a nova senha' />
            <View style={styles.inputContainer}>
                <InputComponent label='Código' value={codig} onChange={setCodig} />
                <InputComponent label='Senha' value={password} onChange={setPassword} />
                <InputComponent label='Confirme a senha' value={confirmPassword}
                    onChange={setConfirmPassword} />
            </View>
            <ButtonConfirm onPress={handleConfirm} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.backgroundWhite
    },
    inputContainer: {
        flex: 1,
        minHeight: 230,
        justifyContent: 'space-evenly'
    }
})
