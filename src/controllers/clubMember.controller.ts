import ClubMemberDTO from "@dtos/clubMember.dto"
import {updateOneProcessingAchievements} from "@services/clubMember.service"
import { IClubMember } from "srcinterfaces/clubMember.interface"


async function updateMember(rawdata: any|IClubMember){
    try{
        const response = isClubMember(rawdata) ? await updateOneProcessingAchievements(rawdata) : await updateOneProcessingAchievements(new ClubMemberDTO(rawdata))
        return response
    }catch(err){
        console.error(err)
        throw new Error("ERROR_UPDATING_MEMBER")
    }
}

const isClubMember = (value: IClubMember): value is IClubMember => {
    if (value.playerName)
      return true
    else
      return false;
  }

export {updateMember}