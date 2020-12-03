import { Clube } from './Clube'

export interface ItemStanding {
    position: number,
    clube: Clube,
    points: number,
    matchs: number,
    wins: number,
    draws: number,
    defeats: number,
    golsDone: number,
    golsConceded: number,
    golsDiff: number,
    utilization: number,
    positionVariation: number 
}