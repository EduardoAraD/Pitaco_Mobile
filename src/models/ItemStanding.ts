import { Clube } from './Clube'

export interface ItemStanding {
    position: number,
    clube: Clube,
    points: number,
    matchs: number,
    wins: number,
    draw: number,
    defeat: number,
    golsScore: number,
    golsConceded: number,
    golsDiff: number,
    porcentage: number,
    positionVariation: number 
}