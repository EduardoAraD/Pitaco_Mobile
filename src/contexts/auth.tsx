import React, { createContext, useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import * as auth from '../services/auth'
import api from '../services/api'

import { User } from '../models/User'

interface AuthContextData {
    signed: boolean;
    user: User | null;
    loading: boolean;
    themeDark: boolean;

    signIn(email: string, password: string): Promise<void>;
    signUp(name: string, email: string, password: string, confirmPassword: string): Promise<void>;
    signOut(): void;
    forgotPassword(email: string): Promise<void>;
    resetPassword(codig: string, password: string, confirmPassword: string): Promise<void>;
    onChangeThemeDark(): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({children}) => {
    const [token, setToken] = useState("")
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [themeDark, setThemeDark] = useState(false)

    useEffect(() => {
        async function loadStorageData() {
            const storageUser = await AsyncStorage.getItem('@Pitaco:user')
            const storageToken = await AsyncStorage.getItem('@Pitaco:token')
            const theme = await AsyncStorage.getItem('@Pitaco:theme')

            if(storageUser && storageToken) {
                setUser(JSON.parse(storageUser))
                api.defaults.headers.Authorization = `Bearer ${storageToken}`
                if(theme === 'true'){
                    setThemeDark(true)
                } else{
                    setThemeDark(false)
                }
            }
            setLoading(false)
        }

        loadStorageData();
    }, [])

    async function signIn(email: string, password: string) {
        const response = auth.signIn(email, password);

        setUser(response.user)
        setToken(response.token)

        api.defaults.headers.Authorization = `Bearer ${response.token}`

        await AsyncStorage.setItem('@Pitaco:user', JSON.stringify(response.user))
        await AsyncStorage.setItem('@Pitaco:token', response.token)
        await AsyncStorage.setItem('@Pitaco:theme', 'false')
    }

    async function signUp(name: string, email: string, password: string, confirmPassword: string){
        const response = auth.register(name, email, password, confirmPassword)

        setUser(response.user)
        setToken(response.token)

        api.defaults.headers.Authorization = `Bearer ${response.token}`

        await AsyncStorage.setItem('@Pitaco:user', JSON.stringify(response.user))
        await AsyncStorage.setItem('@Pitaco:token', response.token)
        await AsyncStorage.setItem('@Pitaco:theme', 'false')
    }

    function signOut(){
        AsyncStorage.clear().then(() => {
            setUser(null)
            setToken('')
        })
    }

    async function onChangeThemeDark() {
        const theme = !themeDark
        setThemeDark(theme)
        if(theme){
            await AsyncStorage.setItem('@Pitaco:theme', 'true')
        } else {
            await AsyncStorage.setItem('@Pitaco:theme', 'false')
        }
        
    }

    async function forgotPassword(email: string) {
        const response = await auth.forgotPassword(email)
    }

    async function resetPassword( email: string, password: string, confirmPassword: string) {
        const response = await auth.resetPassword(email, password, confirmPassword)
    }

    return (
        <AuthContext.Provider
            value={{signed: !!user, user, loading, themeDark,
                signIn, signUp, signOut, forgotPassword, resetPassword, onChangeThemeDark}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    const context = useContext(AuthContext)

    return context;
}