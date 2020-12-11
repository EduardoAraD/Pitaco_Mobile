import { Clube } from "./Clube";

export interface User {
    name: string,
    email: string,
    avatar: string,
    points: number,
    exactScore: number,
    heartClub: Clube
}