import React, { useContext } from 'react'
import { View, Text, Button } from 'react-native'

import { useAuth } from '../../../contexts/auth'

export default function Login() {
    const { signIn} = useAuth()
    
    function handleSignIn() {
        signIn()
    }

    return (
        <View>
            <Text>Login</Text>
            <Button title="Sign in" onPress={handleSignIn} />
        </View>
    );
}
