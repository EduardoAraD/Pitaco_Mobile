import { ImageSourcePropType } from "react-native";
import { Point } from "./Point";
import { User } from "./User";

export interface League {
    id: number,
    name: string,
    description: string,
    logo: ImageSourcePropType,
    dono: User,
    points: Point[]
}