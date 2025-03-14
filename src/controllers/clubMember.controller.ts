import ClubMemberDTO from "@dtos/clubMember.dto"
import {updateOne} from "@services/clubMember.service"


async function updateMember(rawdata: any){
    try{
        const response = await updateOne(new ClubMemberDTO(rawdata))
        return response
    }catch(err){
        console.error(err)
        throw new Error("ERROR_UPDATING_MEMBER")
    }
}


export {updateMember}