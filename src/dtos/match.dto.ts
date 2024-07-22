import { IMatchPlayer } from "src/interfaces/matchPlayer.interface"
import MatchPlayerDTO from "./matchPlayer.dto"

export default class MatchDTO {
    matchId: number
    matchType: "league" | "playoff" = "league"
    timestamp: number
    result: "loose" | "tie" | "win"
    winnerByDnf: Boolean
    winnerByPen: Boolean = false
    ownClub:{
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
    opponentClub:{
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

    constructor(rawdata?: any){
        this.matchId = Number(rawdata.matchId)
        this.timestamp = rawdata.timestamp
        this.matchType = rawdata.matchType ?? "league"

        const rawdataOwnClub = rawdata.clubs[Object.keys(rawdata.clubs)[0]]
        const rawdataAggregateOwn = rawdata.aggregate[Object.keys(rawdata.clubs)[0]]
        const rawdataRivalClub = rawdata.clubs[Object.keys(rawdata.clubs)[1]]
        const rawdataAggregateOpponent = rawdata.aggregate[Object.keys(rawdata.clubs)[1]]

        this.winnerByDnf = Boolean(Number(rawdataOwnClub.winnerByDnf) || Number(rawdataRivalClub.winnerByDnf))
        if(Number(rawdataOwnClub.losses)==1){
            this.result = "loose"
        }else if(Number(rawdataOwnClub.ties)==1){
            this.result = "tie"
        }else this.result = "win"

        const rawdataOwnPlayers =  rawdata.players[Object.keys(rawdata.players)[0]]
        let ownClubPlayers:Array<IMatchPlayer> = []
        for(var rawdataPl in rawdataOwnPlayers) {
            var parsedPl = new MatchPlayerDTO(rawdataOwnPlayers[rawdataPl])
            ownClubPlayers.push(parsedPl)
        }
        this.ownClub = {
            id: rawdataOwnClub.details.clubId,
            name: rawdataOwnClub.details.name,
            matchStats: {
                goals: rawdataOwnClub.goals,
                shots: rawdataAggregateOwn.shots,
                passesMade: rawdataAggregateOwn.passattempts,
                passesSuccess: rawdataAggregateOwn.passesmade,
                redCards: rawdataAggregateOwn.redcards,
                tacklesMade: rawdataAggregateOwn.tackleattempts,
                tackleSuccess: rawdataAggregateOwn.tacklesmade,
            },
            players: ownClubPlayers
        }

        const rawdataOpponentPlayers =  rawdata.players[Object.keys(rawdata.players)[0]]
        let opponentClubPlayers:Array<IMatchPlayer> = []
        for(var rawdataPl in rawdataOpponentPlayers) {
            var parsedPl = new MatchPlayerDTO(rawdataOpponentPlayers[rawdataPl])
            opponentClubPlayers.push(parsedPl)
        }
        this.opponentClub = {
            id: rawdataRivalClub.details.clubId,
            name: rawdataRivalClub.details.name,
            matchStats: {
                goals: rawdataRivalClub.goals,
                shots: rawdataAggregateOpponent.shots,
                passesMade: rawdataAggregateOpponent.passattempts,
                passesSuccess: rawdataAggregateOpponent.passesmade,
                redCards: rawdataAggregateOpponent.redcards,
                tacklesMade: rawdataAggregateOpponent.tackleattempts,
                tackleSuccess: rawdataAggregateOpponent.tacklesmade,
            },
            players: opponentClubPlayers
        }
    }
}