import {IClubMember} from "@interfaces/clubMember.interface"
import MemberModel from "@models/clubMember.model"
import { IClubMemberAchievement } from "srcinterfaces/clubMemberAchievement.interface"
import { checkMemberAchievements } from "srcutils/achievementChecker"


const updateOne = async (member: IClubMember) => {
    const response = await MemberModel.updateOne({playerName: member.playerName}, member, {upsert: true})
    return response
}

const updateOneProcessingAchievements = async (member: IClubMember) => {
    const actualMember = await MemberModel.findOne({playerName: member.playerName})

    if (!actualMember){
        return await MemberModel.updateOne({playerName: member.playerName}, member, {upsert: true})
    }
    

    const newAchievements:IClubMemberAchievement[] = await checkMemberAchievements(actualMember)

    const { achievements, ...rest } = member;
    for (const key in rest) {
        (actualMember as any)[key] = (rest as any)[key];
    }

    //Save new achievements
    if(newAchievements.length>0){
        actualMember.achievements.push(...newAchievements)
    }

    return await actualMember.save()
    
}


export {updateOne, updateOneProcessingAchievements}