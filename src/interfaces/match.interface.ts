import { IMatchPlayer } from "./matchPlayer.interface"

export interface IMatch {
    matchId: number
    matchType: "league" | "playoff"
    timestamp: number
    result: "loose" | "tie" | "win",
    winnerByDnf: Boolean
    winnerByPen?: Boolean
    localTeam?: Boolean
    localClub:{
        id: number
        name: string
        matchStats: {
            goals: number,
            shots: number,
            passesMade: number,
            passesSuccess: number,
            redCards: number,
            tacklesMade: number,
            tackleSuccess: number,
        }
        players: IMatchPlayer[]
    },
    awayClub:{
        id: number
        name: string
        matchStats: {
            goals: number,
            shots: number,
            passesMade: number,
            passesSuccess: number,
            redCards: number,
            tacklesMade: number,
            tackleSuccess: number,
        }
        players: IMatchPlayer[]
    }
}