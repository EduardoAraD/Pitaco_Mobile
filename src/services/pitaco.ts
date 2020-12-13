import { AxiosError, AxiosResponse } from "axios"
import { Match } from "../models/Match"
import { Pitaco } from "../models/Pitaco"
import api from "./api"

interface MatchPitacoResponse {
    pitacos: Pitaco[],
    matchs: Match[]
}

interface PitacoMatch {
    match: Match,
    pitaco: Pitaco
}

async function getPitacoMatchToday(email: string): Promise<{data: PitacoMatch[], error: string}> {
    const date = new Date()
    const dataString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    return await api.post('/pitacos-today/user', { email, date: dataString })
        .then((resp: AxiosResponse) => {
            const { matchs , pitacos } = resp.data as MatchPitacoResponse
            const matchPitaco = matchs.map((match) : PitacoMatch => {
                for(let i = 0; i < pitacos.length; i++) {
                    const pitaco = pitacos[i]
                    if(match.id === pitaco.match.id) return { pitaco, match }
                }
                return { pitaco: {golsHome: '', golsAway: '', point: 0, exactScore: 0} as Pitaco, match }
            })
            return { data: matchPitaco, error: '' }
        }).catch(( err: AxiosError) => {
            const error = err.response?.data.error
            return { data: [] as PitacoMatch[], error: error as string }
        })
}

async function getPitacoMatchRodada(email: string, championship: number, rodada: number): Promise<{data: PitacoMatch[], error: string}> {
    return await api.post('/pitacos-rodada/user', { email, championship, rodada })
        .then((resp: AxiosResponse) => {
            const { matchs, pitacos } = resp.data as MatchPitacoResponse
            const matchPitaco = matchs.map((match) : PitacoMatch => {
                for(let i = 0; i < pitacos.length; i++) {
                    const pitaco = { ...pitacos[i], update: false } as Pitaco
                    if(match.id === pitaco.match.id) return { pitaco, match }
                }
                return { pitaco: {golsHome: '', golsAway: '', point: 0, exactScore: 0, update: false} as Pitaco, match }
            })
            return { data: matchPitaco, error: '' }
        }).catch(( err: AxiosError) => {
            const error = err.response?.data.error
            return { data: [] as PitacoMatch[], error}
        })
}

interface PitacoRequest { golsHome: number, golsAway: number, id: number}

async function createPitacoMatch(email: string, pitacos: PitacoRequest[]) {
    return await api.post('/pitacos', {email, pitacos})
        .then(( resp: AxiosResponse) => {
            const response = resp.data as Pitaco[]
            return { pitacos: response, error: ''}
        }).catch(( err: AxiosError) => {
            const error = err.response?.data.error
            return { pitacos: [], error }
        })
}

export { getPitacoMatchToday, getPitacoMatchRodada, createPitacoMatch }