import React, { useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Link } from '@react-navigation/native'

import { useAuth } from '../../contexts/auth'

import InputComponent from '../../components/InputComponent'
import ButtonConfirmComponent from '../../components/buttons/BottonConfirmComponent'
import colors from '../../assets/colors'

export default function Login() {
    const { signIn } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSignIn() {
        signIn(email, password)
    }

    return (
        <View style={styles.container}>
            <Image style={styles.leagueImg} resizeMode="contain"
                source={require('../../assets/images/logoPitaco.png')} />
            <InputComponent label={"E-mail"} value={email} onChange={setEmail} />
            <InputComponent label={"Senha"} value={password} onChange={setPassword} />
            <View style={styles.linkContainer}>
                <Link to=''>
                    <Text style={styles.linkText}>Esqueceu a senha?</Text>
                </Link>
                <Link to='/SignUp'>
                    <Text style={styles.linkText}>Cadastra-se</Text>
                </Link>
            </View>
            <ButtonConfirmComponent onPress={handleSignIn} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 560,
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20,

        backgroundColor: colors.backgroundWhite
    },
    leagueImg: {
        height: 250,
        width: 250,
        marginBottom: 20
    },
    linkContainer: {
        width: '100%',
        marginTop: 10,
        marginBottom: 15,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    linkText: {
        color: colors.textGray3
    }
})
