import { IMatchPlayer } from "@interfaces/matchPlayer.interface"

export default class MatchPlayerDTO implements IMatchPlayer{
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

    constructor(rawdata?: any){
        this.playername = rawdata.playername,
        this.rating = Number(rawdata.rating)
        this.redCards = Number(rawdata.redcards)
        this.position = rawdata.pos
        this.assists = Number(rawdata.assists)
        this.goals = Number(rawdata.goals)
        this.shots = Number(rawdata.shots)
        this.goalsConceded = Number(rawdata.goalsconceded)
        this.manOfTheMatch = Boolean(Number(rawdata.mom))
        this.passesMade = Number(rawdata.passattempts),
        this.passesSuccess = Number(rawdata.passesmade),
        this.tacklesMade = Number(rawdata.tackleattempts)
        this.tacklesSuccess = Number(rawdata.tacklesmade)
    }


}