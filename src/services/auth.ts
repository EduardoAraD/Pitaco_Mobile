import { AxiosError, AxiosResponse } from 'axios'

import api from './api'
import { User } from '../models/User'

interface Response {
    token: string,
    user: User
}

function signIn(email: string, password: string): Response {
    
    api.post("/login", { email, password }).then((resp: AxiosResponse) => {
        console.log(resp.data)
    }).catch( (error: AxiosError) => {
        console.log( error.response?.data.errors)
    })

    const token = 'Taidbjasd'
    const user = { name: 'SourhT', email, points: 2, exactScore: 0 } as User

    return { token, user };
}

function register(name:string, email: string, password: string, confirmPassword: string) {
    
    //api.post("/signIn")

    const token = 'Taidbjasd'
    const user = { name, email, points: 0, exactScore: 0 } as User
    
    console.log(user)

    return { token, user };
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