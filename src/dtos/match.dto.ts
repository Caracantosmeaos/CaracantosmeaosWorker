import { IMatchPlayer } from "@interfaces/matchPlayer.interface"
import MatchPlayerDTO from "./matchPlayer.dto"
import dotenv from "dotenv"
import { IMatch } from "srcinterfaces/match.interface";

dotenv.config()
const CLUBID:number = Number(process.env.CLUBID) || 290776;

export default class MatchDTO implements IMatch{
    matchId: number
    matchType: "league" | "playoff" = "league"
    timestamp: number
    result: "loose" | "tie" | "win"
    winnerByDnf: Boolean
    winnerByPen?: Boolean = false
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
    }
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

    constructor(rawdata?: any){
        this.matchId = Number(rawdata.matchId)
        this.timestamp = rawdata.timestamp
        this.matchType = rawdata.matchType ?? "league"

        const ownClubID:string = CLUBID.toString()
        let opponentClubID:string = "";
        for(var c in rawdata.clubs){
            if(c.toString()!=ownClubID) opponentClubID = c.toString();
        }
        this.localTeam = (Object.keys(rawdata.clubs)[0].toString()===ownClubID)
        this.winnerByDnf = Boolean(Number(rawdata.clubs[Object.keys(rawdata.clubs)[0]].winnerByDnf) 
        || Number(rawdata.clubs[Object.keys(rawdata.clubs)[1]].winnerByDnf))
        if(Number(rawdata.clubs[ownClubID].losses)==1){
            this.result = "loose"
        }else if(Number(rawdata.clubs[ownClubID].ties)==1){
            this.result = "tie"
        }else this.result = "win"

        const rawdataLocalClub = rawdata.clubs[this.localTeam ? ownClubID : opponentClubID]
        const rawdataAggregateLocal = rawdata.aggregate[this.localTeam ? ownClubID : opponentClubID]
        const rawdataAwayClub = rawdata.clubs[this.localTeam ? opponentClubID : ownClubID]
        const rawdataAggregateAway = rawdata.aggregate[this.localTeam ? opponentClubID : ownClubID]

        const rawdataLocalPlayers =  rawdata.players[this.localTeam ? ownClubID : opponentClubID]
        let localClubPlayers:Array<IMatchPlayer> = []
        for(var rawdataPl in rawdataLocalPlayers) {
            var parsedPl = new MatchPlayerDTO(rawdataLocalPlayers[rawdataPl])
            localClubPlayers.push(parsedPl)
        }
        this.localClub = {
            id: rawdataLocalClub.details.clubId,
            name: rawdataLocalClub.details.name,
            matchStats: {
                goals: rawdataLocalClub.goals,
                shots: rawdataAggregateLocal.shots,
                passesMade: rawdataAggregateLocal.passattempts,
                passesSuccess: rawdataAggregateLocal.passesmade,
                redCards: rawdataAggregateLocal.redcards,
                tacklesMade: rawdataAggregateLocal.tackleattempts,
                tackleSuccess: rawdataAggregateLocal.tacklesmade,
            },
            players: localClubPlayers
        }

        const rawdataAwayPlayers =  rawdata.players[this.localTeam ? opponentClubID : ownClubID]
        let awayClubPlayers:Array<IMatchPlayer> = []
        for(var rawdataPl in rawdataAwayPlayers) {
            var parsedPl = new MatchPlayerDTO(rawdataAwayPlayers[rawdataPl])
            awayClubPlayers.push(parsedPl)
        }
        this.awayClub = {
            id: rawdataAwayClub.details.clubId,
            name: rawdataAwayClub.details.name,
            matchStats: {
                goals: rawdataAwayClub.goals,
                shots: rawdataAggregateAway.shots,
                passesMade: rawdataAggregateAway.passattempts,
                passesSuccess: rawdataAggregateAway.passesmade,
                redCards: rawdataAggregateAway.redcards,
                tacklesMade: rawdataAggregateAway.tackleattempts,
                tackleSuccess: rawdataAggregateAway.tacklesmade,
            },
            players: awayClubPlayers
        }
    }
}