import React, { useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Link } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'

import { useAuth } from '../../contexts/auth'

import InputComponent from '../../components/InputComponent'
import ButtonConfirmComponent from '../../components/buttons/BottonConfirmComponent'

import colors from '../../assets/theme/light'

export default function Login() {
    const { signIn } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSignIn() {
        console.log(email, password)
        signIn(email, password)
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                <Image style={styles.leagueImg} resizeMode="contain"
                    source={require('../../assets/images/logoPitaco.png')} />
                <InputComponent label='E-mail' placeholder='E-mail'
                    keyboardType='email-address' value={email} onChange={setEmail} />
                <InputComponent label={"Senha"} placeholder='Senha'
                    value={password} password={true} onChange={setPassword} />
                <View style={styles.linkContainer}>
                    <Link to='/ForgotPassword'>
                        <Text style={styles.linkText}>Esqueceu a senha?</Text>
                    </Link>
                    <Link to='/SignUp'>
                        <Text style={styles.linkText}>Cadastra-se</Text>
                    </Link>
                </View>
                <ButtonConfirmComponent onPress={handleSignIn} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: colors.backgroundWhite
    },
    scroll: {
        paddingHorizontal: 20,
        width: '100%',
    },
    leagueImg: {
        height: 250,
        width: 250,
        margin: 20,
        alignSelf: 'center'
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
