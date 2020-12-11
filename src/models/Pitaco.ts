import { Match } from "./Match";

export interface Pitaco {
    golsHome: string,
    golsAway: string,
    point: number,
    exactScore: number,
    match: Match
}