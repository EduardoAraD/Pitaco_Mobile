import React, { createContext, useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import * as auth from '../services/auth'
import api from '../services/api'

interface AuthContextData {
    signed: boolean;
    user: object | null;
    loading: boolean;

    signIn(): Promise<void>;
    signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({children}) => {
    const [token, setToken] = useState("")
    const [user, setUser] = useState<Object | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadStorageData() {
            const storageUser = await AsyncStorage.getItem('@Pitaco:user')
            const storageToken = await AsyncStorage.getItem('@Pitaco:token')

            if(storageUser && storageToken) {
                setUser(JSON.parse(storageUser))
                api.defaults.headers.Authorization = `Bearer ${storageToken}`
            }
            setLoading(false)
        }

        loadStorageData();
    }, [])

    async function signIn() {
        const response = auth.signIn('', '');

        setUser(response.user)
        setToken(response.token)

        api.defaults.headers.Authorization = `Bearer ${response.token}`

        await AsyncStorage.setItem('@Pitaco:user', JSON.stringify(response.user))
        await AsyncStorage.setItem('@Pitaco:token', response.token)
    }

    function signOut(){
        AsyncStorage.clear().then(() => {
            setUser(null)
            setToken('')
        })
    }

    return (
        <AuthContext.Provider value={{signed: !!user, user: {}, loading, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    const context = useContext(AuthContext)

    return context;
}