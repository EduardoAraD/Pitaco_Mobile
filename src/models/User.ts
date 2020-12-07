import { Clube } from "./Clube";

export interface User {
    name: string,
    email: string,
    points: number,
    exactScore: number,
    heartClub: Clube
}