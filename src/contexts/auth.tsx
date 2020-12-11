import React, { createContext, useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import * as auth from '../services/auth'
import api from '../services/api'

import { User } from '../models/User'

import ColorsTheme from '../assets/theme/theme'
import colorsLight from '../assets/theme/light'
import colorsDark from '../assets/theme/dark'

interface AuthContextData {
    signed: boolean;
    user: User | null;
    loading: boolean;
    themeDark: boolean;
    theme: ColorsTheme;

    signIn(email: string, password: string): Promise<string>;
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
    const [championshipId, setChampionshipId] = useState(0)
    const [loading, setLoading] = useState(true)
    const [themeDark, setThemeDark] = useState(false)
    const [theme, setTheme] = useState<ColorsTheme>(colorsLight)

    useEffect(() => {
        async function loadStorageData() {
            const storageUser = await AsyncStorage.getItem('@Pitaco:user')
            const storageToken = await AsyncStorage.getItem('@Pitaco:token')
            const theme = await AsyncStorage.getItem('@Pitaco:theme')
            const championship = await AsyncStorage.getItem('@Pitaco:championship')

            if(storageUser && storageToken && championship) {
                setUser(JSON.parse(storageUser))
                setChampionshipId(parseInt(championship))
                api.defaults.headers.Authorization = `Bearer ${storageToken}`
                if(theme === 'true'){
                    setThemeDark(true)
                    setTheme(colorsDark)
                } else{
                    setThemeDark(false)
                    setTheme(colorsLight)
                }
            }
            setLoading(false)
        }

        loadStorageData();
    }, [])

    async function signIn(email: string, password: string) {
        const response = await auth.signIn(email, password);
        console.log(response)
        if(response.data.user){
            setUser(response.data.user)
            setToken(response.data.token)
            setChampionshipId(response.data.ChampionshipId)

            api.defaults.headers.Authorization = `Bearer ${response.data.token}`

            await AsyncStorage.setItem('@Pitaco:user', JSON.stringify(response.data.user))
            await AsyncStorage.setItem('@Pitaco:token', response.data.token)
            await AsyncStorage.setItem('@Pitaco:championship', response.data.ChampionshipId.toString())
            await AsyncStorage.setItem('@Pitaco:theme', 'false')
            return ''
        } else {
            return response.error
        }
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
            setThemeDark(false)
            setTheme(colorsLight)
        })
    }

    async function onChangeThemeDark() {
        const theme = !themeDark
        setThemeDark(theme)
        if(theme){
            await AsyncStorage.setItem('@Pitaco:theme', 'true')
            setTheme(colorsDark)
        } else {
            await AsyncStorage.setItem('@Pitaco:theme', 'false')
            setTheme(colorsLight)
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
            value={{signed: !!user, user, loading, themeDark, theme,
                signIn, signUp, signOut, forgotPassword, resetPassword, onChangeThemeDark}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    const context = useContext(AuthContext)

    return context;
}