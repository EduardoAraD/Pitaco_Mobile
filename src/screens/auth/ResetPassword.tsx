import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useAuth } from '../../contexts/auth'

import TitleComponent from '../../components/TitleComponent'
import InputComponent from '../../components/InputComponent'
import ButtonConfirm from '../../components/buttons/BottonConfirmComponent'

import colors from '../../assets/colors'
import { ScrollView } from 'react-native-gesture-handler'

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
            <ScrollView>
                <View style={{ height: 20 }} />
                <TitleComponent text='Escreva o código recebido pelo e-mail junto com a nova senha' />
                <InputComponent label='Código' value={codig} onChange={setCodig} />
                <InputComponent label='Senha' value={password} onChange={setPassword} />
                <InputComponent label='Confirme a senha' value={confirmPassword}
                    onChange={setConfirmPassword} />
            </ScrollView>
            <ButtonConfirm onPress={handleConfirm} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: colors.backgroundWhite
    },
})
