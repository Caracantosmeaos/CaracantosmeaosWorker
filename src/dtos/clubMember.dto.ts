import { IClubMember } from "@interfaces/clubMember.interface"
import { IClubMemberAchievement } from "srcinterfaces/clubMemberAchievement.interface"

export default class ClubMemberDTO implements IClubMember{
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
    achievements: IClubMemberAchievement[] = []

    constructor(rawdata?: any){
        this.playerName = rawdata.name,
        this.proName= rawdata.proName,
        this.proPos= Number(rawdata.proPos),
        this.proHeight= Number(rawdata.proHeight),
        this.proOverall = Number(rawdata.proOverall),
        this.manOfTheMatch = Number(rawdata.manOfTheMatch)
        this.favoritePosition = rawdata.favoritePosition
        this.gamesPlayed = Number(rawdata.gamesPlayed)
        this.winRate = Number(rawdata.winRate)
        this.goals = Number(rawdata.goals)
        this.assists = Number(rawdata.assists)
        this.cleanSheetsDef = Number(rawdata.cleanSheetsDef)
        this.cleanSheetsGK = Number(rawdata.cleanSheetsGK)
        this.ratingAve = Number(rawdata.ratingAve)
        let shotSuccessRate = Number(rawdata.shotSuccessRate)
        this.shots = Math.round(this.goals / (shotSuccessRate / 100))
        if(Number.isNaN(this.shots)){
            this.shots = 0
        }
        let passSucessRate = Number(rawdata.passSuccessRate)
        this.passesMade = Number(rawdata.passesMade)
        this.passesSuccess = Math.round(passSucessRate*(this.passesMade/100))
        if(Number.isNaN(this.passesSuccess)){
            this.passesSuccess = 0
        }
        this.tacklesMade = Number(rawdata.tacklesMade)
        let tackleSuccessRate = Number(rawdata.tackleSuccessRate)
        this.tacklesSuccess = Math.round(tackleSuccessRate*(this.tacklesMade/100))
        if(Number.isNaN(this.tacklesSuccess)){
            this.tacklesSuccess = 0
        }
        this.redCards = Number(rawdata.redCards)
    }

}