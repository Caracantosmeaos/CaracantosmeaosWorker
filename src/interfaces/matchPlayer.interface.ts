export interface IMatchPlayer {
    playername: string
    rating: number
    redCards: number
    position: "midfielder" | "forward" | "defender" | "goalkeeper"
    assists: number
    goals: number
    shots: number
    goalsConceded: number
    manOfTheMatch: boolean
    passesMade: number
    passesSuccess: number
    tacklesMade: number
    tacklesSuccess: number
}