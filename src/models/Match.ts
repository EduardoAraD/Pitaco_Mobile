interface Clube {
    name: string,
    logo: string,
    shortName: string
}

export interface Match {
    idMatch: number,
    clubeHome: Clube,
    clubeAway: Clube,
    date: string,
    hour: string,
    stadium: string,
    golsHome: number,
    golsAway: number,
    status: string
}