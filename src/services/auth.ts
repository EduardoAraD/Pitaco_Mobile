import { AxiosError, AxiosResponse } from 'axios'
import api from './api'

interface Response {
    token: string,
    user: {
        name: string,
        email: string,
        points: number,
        cravados: number
    }
}

function signIn(email: string, password: string): Response {
    
    api.post("/login", { email, password }).then((resp: AxiosResponse) => {
        console.log(resp.data)
    }).catch( (error: AxiosError) => {
        console.log( error.response?.data.errors)
    })

    const token = 'Taidbjasd'
    const user = { name: 'SourhT', email, points: 2, cravados: 0 }

    return { token, user };
}

function register(name:string, email: string, password: string, confirmPassword: string) {
    
    //api.post("/signIn")

    const token = 'Taidbjasd'
    const user = { name, email, points: 0, cravados: 0 }
    
    console.log(user)

    return { token, user };
}


export { signIn, register };