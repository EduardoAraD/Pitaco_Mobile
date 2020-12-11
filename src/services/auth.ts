import { AxiosError, AxiosResponse } from 'axios'

import api from './api'
import { User } from '../models/User'

interface Response {
    data: {
        token: string,
        user: User,
        ChampionshipId: number
    },
    error: string
}

async function signIn(email: string, password: string): Promise<Response> {
    return await api.post("/login", { email, password }).then((resp: AxiosResponse) => {
        const data = resp.data
        const response = {  data: data, error: '' } as Response
        return response
    }).catch((err: AxiosError) => {
        const error = err.response?.data.error
        const response = { data: {}, error } as Response
        return response
    })
}

async function register(name:string, email: string, password: string, confirmPassword: string): Promise<Response> {
    return await api.post('/signup', { name, email, password, confirmPassword})
        .then(( resp: AxiosResponse) => {
            const data = resp.data
            const response = { data, error: '' } as Response
            return response
        }).catch(( err: AxiosError) => {
            const error = err.response?.data.error
            const response = { data: {}, error } as Response
            return response
        })
}

async function forgotPassword(email: string) {
    return await api.post('/forgot-password', { email}).then(() => {
        return { success: 'E-mail enviado com sucesso', error : ''}
    }).catch(( err: AxiosError) => {
        const error = err.response?.data.error
        return { success: '', error }
    })
}

async function resetPassword(code: string, password: string, confirmPassword: string) {
    return await api.post('/reset-password', { code, password, confirmPassword })
        .then(() => {
            return { success: 'Senha alterada com sucesso', error : ''}
        }).catch(( err: AxiosError) => {
            const error = err.response?.data.error
            return { success: '', error }
        })
}

export { signIn, register, forgotPassword, resetPassword };