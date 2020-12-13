import { AxiosError, AxiosResponse } from 'axios'
import api from './api'

import { useAuth } from '../contexts/auth'

import { ItemStanding } from '../models/ItemStanding'
import { Rodada } from '../models/Rodada'

interface ResponseStanding {
    standing: ItemStanding[],
    error: string
}

async function getStandingChampionship(championshipId: number) {
    return await api.get(`/championship/${championshipId}/tabela/`)
        .then(( resp: AxiosResponse) => {
            const data = resp.data
            const response = { standing: data, error: '' } as ResponseStanding
            return response
        }).catch(( err: AxiosError) => {
            const error = err.response?.data.error
            const response = { standing: [], error } as ResponseStanding
            return response
        })
}

async function getCurrentRodada(championshipId: number) {
    return await api.get(`/championship/${championshipId}/currentRodada`)
        .then(( resp: AxiosResponse) => {
            const data = resp.data
            return { rodada: data as Rodada, error: ''}
        }).catch(( err: AxiosError) => {
            const error = err.response?.data.error
            return { rodada: {} as Rodada, error: error as string }
        })
}

async function getRodada(championship: number, rodada: number) {
    return await api.get(`/championship/${championship}/rodadas/${rodada}`)
        .then(( resp: AxiosResponse) => {
            const data = resp.data
            return { rodada: data as Rodada, error: ''}
        }).catch(( err: AxiosError) => {
            const error = err.response?.data.error
            return { rodada: {} as Rodada, error: error as string }
        })
}

export { getStandingChampionship, getCurrentRodada, getRodada }