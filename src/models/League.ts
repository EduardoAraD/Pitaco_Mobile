import { Point } from "./Point";
import { User } from "./User";

export interface League {
    name: string,
    logo: string,
    dono: User,
    points: Point[]
}