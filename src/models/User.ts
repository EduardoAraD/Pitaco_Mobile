import { Clube } from "./Clube";
import { Point } from "./Point";

export interface User {
    name: string,
    email: string,
    avatar: string,
    points: Point[],
    heartClub: Clube
}