import { AxiosError, AxiosResponse } from "axios"
import { League } from "../models/League"
import { Point } from "../models/Point"
import { User } from "../models/User"
import api from "./api"

async function getLeaguePitaco(id: number) {
    return await api.post('/league-pitaco', {id})
        .then(( resp: AxiosResponse) => {
            const data = resp.data
            const league: League = {
                id: data.id,
                name: data.name,
                description: data.description,
                dono: data.dono,
                logo: logoTrophy(data.trophy),
                points: data.points
            }
            return { league, error: '' }
        }).catch((err: AxiosError) => {
            const error = err.response?.data.error
            return { league: {} as League, error }
        })
}

async function getLeagueHeartPitaco(id: number, clubeId: number){
    return await api.post('/league-heartClub', { id, clubeId })
        .then((resp:AxiosResponse) => {
            const data = resp.data
            const league: League = {
                id: data.id,
                name: data.name,
                description: data.description,
                dono: data.dono,
                logo: logoTrophy(data.trophy),
                points: data.points
            }
            return { league, error: '' }
        }).catch((err: AxiosError) => {
            const error = err.response?.data.error
            return { league: {} as League, error }
        })
}

async function getLeagueDono(championship: number, email: string) {
    return await api.post('/league-dono', { championship, email })
        .then((resp:AxiosResponse) => {
            const data = resp.data
            const league: League = {
                id: data.id,
                name: data.name,
                description: data.description,
                dono: data.dono,
                logo: logoTrophy(data.trophy),
                points: data.points
            }
            return { league, error: '' }
        }).catch((err: AxiosError) => {
            const error = err.response?.data.error
            return { league: {} as League, error }
        })
}

interface LeagueResponse {
    id: number,
    name: string,
    description: string,
    trophy: string,
    dono: User,
    points: Point[]
}

async function getLeagueGuest(championship: number, email: string) {
    return await api.post('/league-guest', { championship, email })
    .then((resp:AxiosResponse) => {
        const data = resp.data
        const leagues: League[] = data.map((item: LeagueResponse) => {
            return {
                id: item.id,
                name: item.name,
                description: item.description,
                dono: item.dono,
                logo: logoTrophy(item.trophy),
                points: item.points 
            } as League
        })
        return { leagues, error: '' }
    }).catch((err: AxiosError) => {
        const error = err.response?.data.error
        return { leagues: [], error }
    })
}

function logoTrophy(val: string){
    switch(val) {
        case '0': return require('../assets/images/trophy1.png')
        case '1': return require('../assets/images/trophy2.png')
        case '2': return require('../assets/images/trophy3.png')
        case '3': return require('../assets/images/trophy4.png')
        case '4': return require('../assets/images/trophy5.png')
        case '5': return require('../assets/images/trophy6.png')
        default: return { uri: val }
    }
}

export { getLeaguePitaco, getLeagueHeartPitaco, getLeagueDono, getLeagueGuest }