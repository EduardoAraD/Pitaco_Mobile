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
    return await api.post('/pitacos-today/user', { email, date: date.toLocaleDateString() })
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
                    const pitaco = pitacos[i]
                    if(match.id === pitaco.match.id) return { pitaco, match }
                }
                return { pitaco: {golsHome: '', golsAway: '', point: 0, exactScore: 0} as Pitaco, match }
            })
            return { data: matchPitaco, error: '' }
        }).catch(( err: AxiosError) => {
            const error = err.response?.data.error
            return { data: [] as PitacoMatch[], error}
        })
}

export { getPitacoMatchToday, getPitacoMatchRodada }