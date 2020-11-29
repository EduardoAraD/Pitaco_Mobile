import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import CheckBox from '@react-native-community/checkbox';

import { useAuth } from '../../contexts/auth'

import TitleComponent from '../../components/TitleComponent'
import ButtonConfirm from '../../components/buttons/BottonConfirmComponent'
import InputComponent from '../../components/InputComponent'
import ModalComponent from '../../components/ModalComponent'
import colors from '../../assets/colors'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function SignUp() {
    const { signUp } = useAuth()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [acceptTerms, setAcceptTerms] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    async function handleSignUp() {
        await signUp(name, email, password, confirmPassword)
    }

    return (
        <View style={styles.container}>
            <TitleComponent text="Cadastre-se e desafie seus amigos no Pitaco" />
            <View style={styles.inputContent}>
                <InputComponent label="Nome" onChange={setName} value={name} />
                <InputComponent label="E-mail" onChange={setEmail} value={email} />
                <InputComponent label="Senha" onChange={setPassword} value={password} />
                <InputComponent label="Confirme a senha"
                    onChange={setConfirmPassword} value={confirmPassword} />
                <View style={styles.checkboxContent}>
                    <CheckBox value={acceptTerms} 
                        onValueChange={(value) => setAcceptTerms(value)} />
                    <TouchableOpacity style={{ marginLeft: 2, padding: 5 }}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={styles.checkboxText}>Termos de uso</Text>
                    </TouchableOpacity>
                </View>
                <ModalComponent visible={modalVisible} setVisible={setModalVisible} />
            </View>
            <ButtonConfirm onPress={handleSignUp} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.backgroundWhite
    },
    inputContent: {
        minHeight: 350,
        flex: 1,
        justifyContent: 'space-around'
    },
    checkboxContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },
    checkboxText: {
        color: colors.textGray3,
        fontWeight: '600'
    }
})
