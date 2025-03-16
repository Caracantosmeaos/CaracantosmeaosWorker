import { IClubMember } from "@interfaces/clubMember.interface";
import { ClubMemberAchievement } from "srctypes/clubMemberAchievement.type";
import { emitMemberAchievement } from "./WeebhookEmitter";

export const checkMemberAchievement = async (member: IClubMember) => {
    let achievement:ClubMemberAchievement = {
        player: member,
        type: "played",
        reached: 0
    }
    if(member.gamesPlayed%50==0){
        achievement.type = "played"
        achievement.reached = member.gamesPlayed
    }
    if(member.goals%25==0){
        achievement.type = "goals"
        achievement.reached = member.goals
    }
    if(member.assists%25==0){
        achievement.type = "assists"
        achievement.reached = member.assists
    }
    if(member.redCards%10==0){
        achievement.type = "redcards"
        achievement.reached = member.redCards
    }
    if(member.passesMade%50==0){
        achievement.type = "passes"
        achievement.reached = member.passesMade
    }
    if(member.manOfTheMatch%10==0){
        achievement.type = "motm"
        achievement.reached = member.manOfTheMatch
    }

    if(achievement.reached>0){
        await emitMemberAchievement(achievement)
    }
}