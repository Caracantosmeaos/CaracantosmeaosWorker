import { getClubMatchHistory, TPlatformType, getClubMembers} from '../../ProClubsAPI';
import { TGametype } from '../../ProClubsAPI/dist/model/club';
import { insertMatch, getLatestMatch } from '@controllers/match.controller';
import { updateMember } from 'srccontrollers/clubMember.controller';
import { IMatch } from '@interfaces/match.interface';
import { emitNewMatch } from 'src/utils/WeebhookEmitter'
import { getMatchProducer} from "@events/index"

import dotenv from "dotenv"
import MatchDTO from 'srcdtos/match.dto';
import ClubMemberDTO from 'srcdtos/clubMember.dto';
dotenv.config()
const CLUBID:number = Number(process.env.CLUBID) || 290776;
const PLATFORM:string = String(process.env.PLATFORM || 'common-gen5')
const WORKER_INTERVAL = Number(process.env.WORKER_INTERVAL) || 300;


async function updateMembers(){
    const EaMembers = await getClubMembers(<TPlatformType>PLATFORM, CLUBID);
    if(EaMembers!=undefined){
        console.info("[Member Worker] Updating members...")
        for(let member in EaMembers){
            let clubMember = new ClubMemberDTO(EaMembers[member])
            //await checkMemberAchievement(clubMember)
            await updateMember(EaMembers[member])
        }
        console.info("[Member Worker] Members updated")
    }else console.info("[Member Worker] Member fetch failed")
}

function startWorker(){
    console.log("[Match Finder Worker] Started!")

    updateMembers()

    setInterval(async function(){
        try{
            const leagueMatches = await getClubMatchHistory(<TPlatformType>PLATFORM, CLUBID, <TGametype>"leagueMatch") ?? [];
            const playoffMatches = await getClubMatchHistory(<TPlatformType>PLATFORM, CLUBID, <TGametype>"playoffMatch") ?? [];
            const resp = await getLatestMatch()
            const latestDbMatch:IMatch|undefined = (resp && resp.length>0) ? <IMatch>resp[0] : undefined
            if(latestDbMatch!==undefined){
                let matchesToInsert:Array<any> = []
                for(let m in leagueMatches){
                    const match:any = leagueMatches[m]
                    if(match.timestamp >= latestDbMatch.timestamp && Number(match.matchId)!==latestDbMatch.matchId){
                        match.matchType = "league"
                        matchesToInsert.push(match)
                    }
                }
                for(let m in playoffMatches){
                    const match:any = playoffMatches[m]
                    if(match.timestamp >= latestDbMatch.timestamp && Number(match.matchId)!==latestDbMatch.matchId){
                        match.matchType = "playoff"
                        matchesToInsert.push(match)
                    }
                }
                for(let match in matchesToInsert){
                    await insertMatch(matchesToInsert[match])
                    /** WEBHOOK **/
                    //await emitNewMatch(new MatchDTO(matchesToInsert[match]))
                    /** RABBITMQ **/
                    await getMatchProducer().publish(new MatchDTO(matchesToInsert[match]))
                }
                if(matchesToInsert.length>0){
                    if(matchesToInsert.length>1) console.info(`[Match Finder Worker] Inserted ${matchesToInsert.length} new matches`)
                    else console.info(`[Match Finder Worker] Inserted 1 new match`)
                    await updateMembers()
                }
            }else{
                console.info("[Match Finder Worker] No matches founded in database. Inserting all retrieved matches from EA API...")
                for(let m in leagueMatches){
                    const match:any = leagueMatches[m]
                    match.matchType = "league"
                    await insertMatch(match)
                }
                for(let m in playoffMatches){
                    const match:any = playoffMatches[m]
                    match.matchType = "playoff"
                    await insertMatch(match)
                }
                console.info(`[Match Finder Worker] Inserted ${leagueMatches.length + playoffMatches.length} new matches`)
                
                await updateMembers()
            }
        }catch(e){
            var msg:string
            msg = e=="ERROR_INSERT_MATCH" ? "Error inserting match into database" : ""
            msg = e=="ERROR_FINDING_LATEST_MATCHES" ? "Error searching for newer matches" : ""
            msg = e=="ERROR_UPDATING_MEMBER" ? "Error updating member" : ""
            console.log(msg)
        }
    },WORKER_INTERVAL * 1000)
}

export {startWorker}

