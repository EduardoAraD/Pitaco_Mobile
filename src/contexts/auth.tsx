import React, { createContext, useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
    championship: number;
    currentRodada: number;

    signIn(email: string, password: string): Promise<string>;
    signUp(name: string, email: string, password: string, confirmPassword: string, accertTerms: boolean): Promise<string>;
    signOut(): void;
    forgotPassword(email: string): Promise<{success: string, error: string}>;
    resetPassword(codig: string, password: string, confirmPassword: string): Promise<{success: string, error: string}>;
    onChangeThemeDark(): Promise<void>;
    currentRodadaChampionship(rodadaId: number): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({children}) => {
    const [user, setUser] = useState<User | null>(null)
    const [currentRodada, setCurrentRodada] = useState(1)
    const [championship, setChampionship] = useState(0)
    const [loading, setLoading] = useState(true)
    const [themeDark, setThemeDark] = useState(false)
    const [theme, setTheme] = useState<ColorsTheme>(colorsLight)

    useEffect(() => {
        async function loadStorageData() {
            const values = await AsyncStorage.multiGet(
                ['@Pitaco:user', '@Pitaco:token', '@Pitaco:theme', '@Pitaco:championship'])
            
            const storageUser = values[0][1]
            const storageToken = values[1][1]
            const theme = values[2][1]
            const championship = values[3][1]

            if(storageUser && storageToken && championship) {
                setUser(JSON.parse(storageUser))
                setChampionship(parseInt(championship))
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
        const { data, error } = await auth.signIn(email, password);
        if(data.user){
            setChampionship(data.championship)
            setUser(data.user)

            api.defaults.headers.Authorization = `Bearer ${data.token}`

            const userKey = ["@Pitaco:user", JSON.stringify(data.user)]
            const tokenKey = ["@Pitaco:token", data.token]
            const championshipKey = ['@Pitaco:championship', data.championship.toString()] 
            const themeKey = ['@Pitaco:theme', 'false']

            await AsyncStorage.multiSet([userKey, tokenKey, championshipKey, themeKey])
            return ''
        } else {
            return error
        }
    }

    async function signUp(name: string, email: string, password: string, confirmPassword: string, accertTerms: boolean){
        if(!accertTerms) return 'Termos não aceitos'

        const { data, error } = await auth.register(name, email, password, confirmPassword)
        if(data.user){
            setChampionship(data.championship)
            setUser(data.user)

            api.defaults.headers.Authorization = `Bearer ${data.token}`

            const userKey = ["@Pitaco:user", JSON.stringify(data.user)]
            const tokenKey = ["@Pitaco:token", data.token]
            const championshipKey = ['@Pitaco:championship', data.championship.toString()] 
            const themeKey = ['@Pitaco:theme', 'false']

            await AsyncStorage.multiSet([userKey, tokenKey, championshipKey, themeKey])

            return ''
        } else {
            return error
        }
    }

    function signOut(){
        AsyncStorage.clear().then(() => {
            setUser(null)
            setChampionship(0)
            setCurrentRodada(0)
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
        return await auth.forgotPassword(email)
    }

    async function resetPassword( email: string, password: string, confirmPassword: string) {
        return await auth.resetPassword(email, password, confirmPassword)
    }

    function currentRodadaChampionship(rodadaId: number) {
        setCurrentRodada(rodadaId)
    }

    return (
        <AuthContext.Provider
            value={{signed: !!user, user, loading, themeDark, theme, championship, currentRodada,
                signIn, signUp, signOut, forgotPassword, resetPassword, onChangeThemeDark, currentRodadaChampionship}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    const context = useContext(AuthContext)

    return context;
}