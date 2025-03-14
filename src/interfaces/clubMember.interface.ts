export interface IClubMember {
    playerName: string
    proName: string
    proPos: number
    proHeight: number
    proOverall: number
    manOfTheMatch: number
    favoritePosition: "midfielder" | "forward" | "defender" | "goalkeeper"
    gamesPlayed: number
    winRate: number
    goals: number
    assists: number
    cleanSheetsDef: number
    cleanSheetsGK: number
    shots: number
    passesMade: number
    passesSuccess: number
    ratingAve: number
    tacklesMade: number
    tacklesSuccess: number
    redCards: number
}