import MatchDTO from "src/dtos/match.dto"
import {insertOne, getLatest} from "src/services/match.service"


async function insertMatch(rawdata: any){
    try{
        const response = await insertOne(new MatchDTO(rawdata))
    }catch(err){
        console.error(err)
        throw new Error("ERROR_INSERT_MATCH")
    }
}

async function getLatestMatch(){
    try{
        const response = await getLatest()
        return response
    }catch(err){
        console.error(err)
        throw new Error("ERROR_FINDING_LATEST_MATCHES")
    }
}

export {insertMatch, getLatestMatch}