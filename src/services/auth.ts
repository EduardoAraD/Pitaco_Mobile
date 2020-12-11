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
    return await api.post('/signUp', { name, email, password, confirmPassword})
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

function forgotPassword(email: string) {
    // api.post('/forgot-password')
    console.log(email)
}

function resetPassword(email: string, password: string, confirmPassword: string) {
    // api.post('reset-password')
    console.log(email, password, confirmPassword)
}

export { signIn, register, forgotPassword, resetPassword };